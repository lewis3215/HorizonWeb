import { Injectable } from '@nestjs/common';
import {CreateOrUpdateTeamMember} from "./dto/create-team-member.dto";
import type { CreateTeamDto } from './dto/create-team.dto';
import {GetTeamWithMembersDto} from "./dto/get-team-with-members.dto";
import type { GetTeamDto } from './dto/get-team.dto';
import {UpdateTeamDto} from "./dto/update-team.dto";
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

    public addMember(teamId: string, currentUserId: string, member: CreateOrUpdateTeamMember): void {
    }

    public delete(teamId: string, userId: string, currentUserId: string): void {
    }

    public deleteTeam(teamId: string, currentUserId: string): void {
    }

    public getTeam(teamId: string, currentUserId: string): GetTeamWithMembersDto {
        return undefined;
    }

    public updateRole(teamId: string, currentUserId: string, member: CreateOrUpdateTeamMember): void {
    }

    public updateTeam(teamId: string, currentUserId: string, team: UpdateTeamDto): GetTeamDto {
        return undefined;
    }
}
