import type { TeamRole } from '../../domain/team-member';

export class GetTeamMemberDto {
    public userId!: string;
    public userName!: string;
    public role!: TeamRole;
}
