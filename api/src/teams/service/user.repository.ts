import type { User } from '../../users/user.entity';

export interface UserRepository {
    findUserById(userId: string): Promise<User>;
}
