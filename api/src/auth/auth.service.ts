import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import type { JwtSignOptions } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { config } from '../config';
import { BaseRepository } from '../shared/lib/repositories/base.repository';
import { User } from '../users/user.entity';
import type { Token } from './jwt-auth.guard';

export interface TokenResponse {
  accessToken: string;
  refreshToken: string | null;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: BaseRepository<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async validatePassword(userQuery: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      $or: [
        { userId: { $ilike: userQuery } },
        { email: userQuery.toLowerCase() },
      ],
    });
    if (user && !user.password)
      throw new BadRequestException('Password is not set');
    if (!user || !(await user.validatePassword(password)))
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  public async login(user: User): Promise<TokenResponse> {
    const payload: Token = { sub: user.userId };

    return {
      accessToken: await this.jwtService.signAsync(payload, this.getTokenOptions('access')),
      refreshToken: config.get('accessTokenExpiration')
        ? await this.jwtService.signAsync(payload, this.getTokenOptions('refresh'))
        : null,
      accessTokenExpiresAt: Date.now() + config.get('accessTokenExpirationSeconds') * 1000,
      refreshTokenExpiresAt: Date.now() + config.get('refreshTokenExpirationSeconds') * 1000,
    };
  }

  public async loginWithRefreshToken(refreshToken: string): Promise<TokenResponse> {
    const decoded = this.jwtService.decode(refreshToken) as Token;
    if (!decoded)
      throw new BadRequestException('Failed to decode JWT');

    try {
      await this.jwtService.verifyAsync<Token>(refreshToken, this.getTokenOptions('refresh'));
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.userRepository.findOneOrFail({ userId: decoded.sub });
    return this.login(user);
  }

  public getTokenOptions(type: 'access' | 'refresh'): JwtSignOptions {
    const options: JwtSignOptions = {
      secret: config.get(`${type}TokenSecret`),
    };

    const expiration = config.get(`${type}TokenExpiration`);
    if (expiration)
      options.expiresIn = expiration;

    return options;
  }
}
