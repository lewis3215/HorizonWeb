import {
 Entity, Enum, ManyToOne, PrimaryKey,
} from '@mikro-orm/core';
import { nanoid } from 'nanoid';
import { User } from '../../users/user.entity';
import { TeamRole } from '../domain/team-member';
import { TeamEntity } from './team.entity';

@Entity({ tableName: 'team_member' })
export class TeamMemberEntity {
    @PrimaryKey()
    teamMemberId: string = nanoid(10);

    @ManyToOne()
    team!: TeamEntity;

    @ManyToOne()
    user!: User;

    @Enum()
    role!: TeamRole;


    constructor(user: User, role: TeamRole) {
        this.user = user;
        this.role = role;
    }
}
