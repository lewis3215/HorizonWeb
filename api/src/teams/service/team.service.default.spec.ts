import {CreateTeamDto} from "./dto/create-team.dto";
import {DefaultTeamService} from "./team.service.default";

describe('Team Service', () => {
  it('createTeam should insert an unvalidated team in the repository', () => {
    // Given
    const dto = new CreateTeamDto();
    dto.name = 'Test Team';

    const service = new DefaultTeamService({

    });

    // When

  });
});
