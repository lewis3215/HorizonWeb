import { nanoid } from 'nanoid';
import { User } from '../../users/user.entity';
import { Team } from './team';
import { TeamMember, TeamRole } from './team-member';

describe('Team unit tests', () => {
    it('Setting empty name value throw error', () => {
        // When & Then
        expect(() => new Team(nanoid(10), '', true, false))
            .toThrow(Error);
    });

    it('canEdit returns true when given user is a leader', () => {
        // Given
        const team = new Team(nanoid(10), 'Test Team', true, false);
        const user = new User('Test User', 'test@test.fr');
        const member = new TeamMember(user, TeamRole.Leader);
        team.members = [member];

        // When
        const result = team.canEdit(user.userId);

        // Then
        expect(result).toBe(true);
    });

    it('canEdit returns true when given user is a co-leader', () => {
        // Given
        const team = new Team(nanoid(10), 'Test Team', true, false);
        const user = new User('Test User', 'test@test.fr');
        const member = new TeamMember(user, TeamRole.CoLeader);
        team.members = [member];

        // When
        const result = team.canEdit(user.userId);

        // Then
        expect(result).toBe(true);
    });

    it('canDelete returns true when given user is a leader', () => {
        // Given
        const team = new Team(nanoid(10), 'Test Team', true, false);
        const user = new User('Test User', 'test@test.fr');
        const member = new TeamMember(user, TeamRole.Leader);
        team.members = [member];

        // When
        const result = team.canDelete(user.userId);

        // Then
        expect(result).toBe(true);
    });

    it('canDelete returns false when given user is a leader but team is official', () => {
        // Given
        const team = new Team(nanoid(10), 'Test Team', true, true);
        const user = new User('Test User', 'test@test.fr');
        const member = new TeamMember(user, TeamRole.Leader);
        team.members = [member];

        // When
        const result = team.canDelete(user.userId);

        // Then
        expect(result).toBe(false);
    });

    it('canDelete returns false when given user is a co-leader', () => {
        // Given
        const team = new Team(nanoid(10), 'Test Team', true, false);
        const user = new User('Test User', 'test@test.fr');
        const member = new TeamMember(user, TeamRole.CoLeader);
        team.members = [member];

        // When
        const result = team.canDelete(user.userId);

        // Then
        expect(result).toBe(false);
    });
});
