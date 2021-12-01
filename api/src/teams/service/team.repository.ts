import type { Team } from '../domain/team';

export interface TeamRepository {
    saveTeam(team: Team): Promise<Team>;
    findTeamById(userId: string): Promise<Team>;
}
