import type { User } from '../../users/user.entity';

export enum TeamRole {
    Member = 'Member',
    Leader = 'Leader',
    CoLeader = 'CoLeader',
}

export class TeamMember {
    public user!: User;
    public role!: TeamRole;

    constructor(user: User, role: TeamRole) {
        this.user = user;
        this.role = role;
    }
}
