import { User } from '../../users/user.entity';
import type { Team } from '../domain/team';

export interface TeamRepository {
    insertTeam(team: Team): Team;
    findTeamById(userId: string): Promise<Team>;
}
