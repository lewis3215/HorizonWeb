import type { GetTeamMemberDto } from './get-team-member.dto';
import { GetTeamDto } from './get-team.dto';

export class GetTeamWithMembersDto extends GetTeamDto {
    members!: GetTeamMemberDto[];
}
