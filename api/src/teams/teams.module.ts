import { Module } from '@nestjs/common';
import { DefaultTeamsService } from './service/team.service.default';

@Module({
  providers: [DefaultTeamsService],
})
export class TeamsModule {}
