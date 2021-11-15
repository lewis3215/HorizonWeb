import type { TeamMember } from './team-member';
import { TeamRole } from './team-member';

export class Team {
    public isValidated!: boolean;
    public members!: TeamMember[];
    public isOfficial!: boolean;

    private teamName!: string;

    public get name(): string {
        return this.teamName;
    }

    public set name(value: string) {
        if (value.length === 0)
            throw new Error("Team name can't be empty");

        this.teamName = value;
    }

    constructor(teamName: string, isValidated: boolean, isOfficial: boolean) {
        this.name = teamName;
        this.isValidated = isValidated;
        this.isOfficial = isOfficial;
    }

    public canEdit(userId: string): boolean {
        return this.userHasRole(userId, [TeamRole.Leader, TeamRole.CoLeader]);
    }

    public canDelete(userId: string): boolean {
        return !this.isOfficial && this.userHasRole(userId, [TeamRole.Leader]);
    }

    private userHasRole(userId: string, roles: TeamRole[]): boolean {
        return this.members
            .filter(member => roles.includes(member.role))
            .map(member => member.user.userId)
            .includes(userId);
    }
}
