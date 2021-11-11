import {
    Collection, Entity, OneToMany, PrimaryKey, Property,
} from '@mikro-orm/core';
import { nanoid } from 'nanoid';
import { TeamMemberEntity } from './team-member.entity';

@Entity({ tableName: 'team' })
export class TeamEntity {
    @PrimaryKey()
    teamId: string = nanoid(10);

    @Property({ type: 'text' })
    name!: string;

    @Property()
    validated!: boolean;

    @OneToMany({
        entity: () => TeamMemberEntity,
        mappedBy: member => member.team,
        orphanRemoval: true,
    })
    members = new Collection<TeamMemberEntity>(this);

    constructor(name: string) {
        this.name = name;
        this.validated = false;
    }
}
