import { Module } from '@nestjs/common';
import { TeamsService } from './domain/teams.service';

@Module({
  providers: [TeamsService],
})
export class TeamsModule {}
