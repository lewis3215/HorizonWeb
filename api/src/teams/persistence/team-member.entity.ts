import {
 Entity, Enum, ManyToOne, PrimaryKey,
} from '@mikro-orm/core';
import { nanoid } from 'nanoid';
import { User } from '../users/user.entity';
import { Team } from './team.entity';

export enum TeamRole {
    Leader,
    CoLeader,
    Member,
}

@Entity()
export class TeamMember {
    @PrimaryKey()
    teamMemberId: string = nanoid(10);

    @ManyToOne()
    team!: Team;

    @ManyToOne()
    user!: User;

    @Enum()
    role!: TeamRole;


    constructor(user: User, role: TeamRole) {
        this.user = user;
        this.role = role;
    }
}
