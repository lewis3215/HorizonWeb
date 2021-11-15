import { Injectable } from '@nestjs/common';
import type { CreateTeamDto } from './dto/create-team.dto';
import type { GetTeamDto } from './dto/get-team.dto';
import { TeamRepository } from './team.repository';
import type { TeamService } from './team.service';

@Injectable()
export class DefaultTeamService implements TeamService {
    private readonly repository: TeamRepository;

    constructor(repository: TeamRepository) {
        this.repository = repository;
    }

    public createTeam(dto: CreateTeamDto): GetTeamDto {
        return undefined;
    }
}
