import {
    Collection, Entity, OneToMany, PrimaryKey, Property,
} from '@mikro-orm/core';
import { nanoid } from 'nanoid';
import { TeamMember } from './team-member.entity';

@Entity()
export class Team {
    @PrimaryKey()
    teamId: string = nanoid(10);

    @Property({ type: 'text' })
    name!: string;

    @Property()
    validated!: boolean;

    @OneToMany({
        entity: () => TeamMember,
        mappedBy: member => member.team,
        orphanRemoval: true,
    })
    members = new Collection<TeamMember>(this);

    constructor(name: string) {
        this.name = name;
        this.validated = false;
    }

    public canEdit(userId: string): boolean {
        return false;
    }

    public isLeader(userId: string): boolean {
        return false;
    }
}
