import { UserModel } from '../../domain/models/user.model';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { EmailVO } from '@shared/domain/value-objects/email.vo';
import { NameVO } from '@shared/domain/value-objects/name.vo';
import { PasswordVO } from '@shared/domain/value-objects/password.vo';
import { UuidVO } from '@shared/domain/value-objects/uuid.vo';

export class UserRegisterUseCase {
    private readonly userRepository = new UserRepository();
    constructor() {}

    async execute(
        id: UuidVO,
        name: NameVO,
        email: EmailVO,
        password: PasswordVO
    ): Promise<void> {
        const newUser = UserModel.createUser(id, name, email, password);

        const existingUserById = await this.userRepository.findById(id);
        if (existingUserById) throw new Error('UserIdAlreadyInUseException');

        const existingUserByEmail = await this.userRepository.findByEmail(
            email
        );
        if (existingUserByEmail)
            throw new Error('UserEmailAlreadyInUseException');

        await this.userRepository.create(newUser);
    }
}
