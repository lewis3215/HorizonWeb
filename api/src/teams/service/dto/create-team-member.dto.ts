import type { TeamRole } from '../../domain/team-member';

export class CreateOrUpdateTeamMember {
    userId!: string;
    teamRole!: TeamRole;
}
