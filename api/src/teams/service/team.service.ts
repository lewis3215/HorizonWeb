import type { CreateTeamDto } from './dto/create-team.dto';
import type { GetTeamDto } from './dto/get-team.dto';

export interface TeamService {
    createTeam(dto: CreateTeamDto): GetTeamDto;
}
