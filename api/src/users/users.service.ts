import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../shared/lib/repositories/base.repository';
import type { UserCreationOptions } from '../shared/lib/types/user-creation-options.interface';
import type { PaginationOptions } from '../shared/modules/pagination/pagination-option.interface';
import type { PaginatedResult } from '../shared/modules/pagination/pagination.interface';
import type { UpdateUserDto } from './dto/update-user.dto';
import { UserSearchService } from './user-search.service';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: BaseRepository<User>,
    private readonly userSearchService: UserSearchService,
  ) {}

  public async findOneById(userId: string): Promise<User> {
    return await this.userRepository.findOneOrFail({ userId });
  }

  public async create(options: UserCreationOptions): Promise<User> {
    const user = new User(options);
    if (options?.password)
      await user.setPassword(options.password);
    await this.userRepository.persistAndFlush(user);
    await this.userSearchService.add(user);
    return user;
  }

  public async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneOrFail({ userId }, { populate: ['badges'] });

    wrap(user).assign(updateUserDto);
    await this.userRepository.flush();

    return user;
  }

  public async findAll(paginationOptions?: PaginationOptions): Promise<PaginatedResult<User>> {
    return await this.userRepository.findWithPagination(paginationOptions);
  }
}
