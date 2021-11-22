import type { CreateOrUpdateTeamMember } from './dto/create-team-member.dto';
import type { CreateTeamDto } from './dto/create-team.dto';
import type { GetTeamWithMembersDto } from './dto/get-team-with-members.dto';
import type { GetTeamDto } from './dto/get-team.dto';
import type { UpdateTeamDto } from './dto/update-team.dto';

export interface TeamService {
    createTeam(dto: CreateTeamDto, currentUserId: string): Promise<GetTeamDto>;
    getTeam(teamId: string, currentUserId: string): Promise<GetTeamWithMembersDto>;
//     UpdateTeam(teamId: string, currentUserId: string, team: UpdateTeamDto): Promise<GetTeamDto>;
//     deleteTeam(teamId: string, currentUserId: string): Promise<void>;
//
//     addMember(teamId: string, currentUserId: string, member: CreateOrUpdateTeamMember): Promise<void>;
//     updateRole(teamId: string, currentUserId: string, member: CreateOrUpdateTeamMember): Promise<void>;
//     delete(teamId: string, userId: string, currentUserId: string): Promise<void>;
}
