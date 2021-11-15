import type { CreateOrUpdateTeamMember } from './dto/create-team-member.dto';
import type { CreateTeamDto } from './dto/create-team.dto';
import type { GetTeamWithMembersDto } from './dto/get-team-with-members.dto';
import type { GetTeamDto } from './dto/get-team.dto';
import type { UpdateTeamDto } from './dto/update-team.dto';

export interface TeamService {
    createTeam(dto: CreateTeamDto, currentUserId: string): GetTeamDto;
    getTeam(teamId: string, currentUserId: string): GetTeamWithMembersDto;
    updateTeam(teamId: string, currentUserId: string, team: UpdateTeamDto): GetTeamDto;
    deleteTeam(teamId: string, currentUserId: string): void;

    addMember(teamId: string, currentUserId: string, member: CreateOrUpdateTeamMember): void;
    updateRole(teamId: string, currentUserId: string, member: CreateOrUpdateTeamMember): void;
    delete(teamId: string, userId: string, currentUserId: string): void;
}
