import type { Team } from '../domain/team';

export interface TeamRepository {
    insertTeam(team: Team): Team;
}
