import type { User } from '../../users/user.entity';

export enum TeamRole {
    Member,
    Leader,
    CoLeader,
}

export class TeamMember {
    public user!: User;
    public role!: TeamRole;

    constructor(user: User, role: TeamRole) {
        this.user = user;
        this.role = role;
    }
}
