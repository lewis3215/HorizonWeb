import { It, Mock, Times } from 'moq.ts';
import { nanoid } from 'nanoid';
import { User } from '../../users/user.entity';
import { Team } from '../domain/team';
import { TeamMember, TeamRole } from '../domain/team-member';
import { CreateOrUpdateTeamMember } from './dto/create-team-member.dto';
import { CreateTeamDto } from './dto/create-team.dto';
import type { TeamRepository } from './team.repository';
import { DefaultTeamService } from './team.service.default';
import type { UserRepository } from './user.repository';

describe('Team Service', () => {
    it('createTeam should insert an unvalidated team in the repository', async () => {
        // Given
        const dto: CreateTeamDto = new CreateTeamDto();
        dto.name = 'Test Team';

        const userId: string = nanoid(10);

        let insertedTeam: Team | null = null;

        const teamRepositoryMock = new Mock<TeamRepository>()
            .setup(async mock => mock.saveTeam(It.IsAny()))
            .callback(({ args: [team] }) => {
                insertedTeam = team;
                return team;
            });

        const user = new User('test user', 'test@test.fr');
        user.userId = userId;
        const userRepositoryMock = new Mock<UserRepository>()
            .setup(async mock => mock.findUserById(userId))
            .returns(Promise.resolve(user));

        const service = new DefaultTeamService(teamRepositoryMock.object(), userRepositoryMock.object());

        // When
        const result = await service.createTeam(dto, userId);

        // Then
        expect(result.name).toBe('Test Team');
        expect(result.validated).toBe(false);
        teamRepositoryMock.verify(mock => mock.saveTeam, Times.Exactly(1));
        userRepositoryMock.verify(mock => mock.findUserById, Times.Exactly(1));
        expect(insertedTeam!.teamId).toBeTruthy();
        expect(insertedTeam!.name).toBe('Test Team');
        expect(insertedTeam!.isOfficial).toBe(false);
        expect(insertedTeam!.isValidated).toBe(false);
        expect(insertedTeam!.members.length).toBe(1);
        expect(insertedTeam!.members[0].user.userId).toBe(userId);
        expect(insertedTeam!.members[0].role).toBe(TeamRole.Leader);
    });

    it('getTeam should retrieve a team from the repository', async () => {
        // Given
        const teamId: string = nanoid(10);
        const userId: string = nanoid(10);

        const team = new Team(teamId, 'test Team', false, false);
        const user = new User('test user', 'test@test.fr');
        user.userId = userId;
        team.members = [new TeamMember(user, TeamRole.Leader)];
        const teamRepositoryMock = new Mock<TeamRepository>()
            .setup(async mock => mock.findTeamById(It.IsAny<string>()))
            .returns(Promise.resolve(team));

        const userRepositoryMock = new Mock<UserRepository>();

        const service = new DefaultTeamService(teamRepositoryMock.object(), userRepositoryMock.object());

        // When
        const result = await service.getTeam(teamId, userId);

        // Then
        expect(result.name).toBe('test Team');
        expect(result.validated).toBe(false);
        expect(result.members.length).toBe(1);
        expect(result.members[0].userId).toBe(userId);
        expect(result.members[0].userName).toBe('test user');
        expect(result.members[0].role).toBe(TeamRole.Leader);
    });

    it('addMember should insert a member in the team when current user is team leader', async () => {
        // Given
        const teamId: string = nanoid(10);
        const leaderUserId: string = nanoid(10);
        const team = new Team(teamId, 'test Team', false, false);
        const leader = new User('test team leader', 'test.leader@test.fr');
        leader.userId = leaderUserId;
        team.members = [new TeamMember(leader, TeamRole.Leader)];

        const teamRepositoryMock = new Mock<TeamRepository>()
            .setup(async mock => mock.findTeamById(teamId))
            .returns(Promise.resolve(team))
            .setup(async mock => mock.saveTeam(team))
            .returns(Promise.resolve(team));

        const memberUserId: string = nanoid(10);
        const member = new User('test team member', 'test.member@test.fr');
        member.userId = memberUserId;

        const userRepositoryMock = new Mock<UserRepository>()
            .setup(async mock => mock.findUserById(memberUserId))
            .returns(Promise.resolve(member));

        const service = new DefaultTeamService(teamRepositoryMock.object(), userRepositoryMock.object());

        const dto: CreateOrUpdateTeamMember = new CreateOrUpdateTeamMember();
        dto.userId = memberUserId;
        dto.teamRole = TeamRole.Member;

        // When
        await service.addMember(teamId, leaderUserId, dto);

        // Then
        teamRepositoryMock.verify(mock => mock.saveTeam, Times.Exactly(1));
        teamRepositoryMock.verify(mock => mock.findTeamById, Times.Exactly(1));
        userRepositoryMock.verify(mock => mock.findUserById, Times.Exactly(1));

        expect(team.members.length).toBe(2);
        expect(team.members[1].user.userId).toBe(memberUserId);
        expect(team.members[1].role).toBe(TeamRole.Member);
    });
});
