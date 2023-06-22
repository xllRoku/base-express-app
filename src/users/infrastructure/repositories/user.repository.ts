import { UserModel } from '../../domain/models/user.model';
import { IUserRepository } from '../../domain/respository/user-repository.interface';
import { UserSchema } from '../schemas/user.schema';
import { EmailVO } from '../../../shared/domain/value-objects/email.vo';
import { NameVO } from '../../../shared/domain/value-objects/name.vo';
import { PasswordVO } from '../../../shared/domain/value-objects/password.vo';
import { UuidVO } from '../../../shared/domain/value-objects/uuid.vo';

export interface User {
    _id: string;
    email: string;
    name: string;
    password: string;
}

/**
 * User MongoDB repository implementation
 */
export class UserRepository implements IUserRepository {
    /**
     * Transforms a database user into a domain user
     * @param persistanceUser Database user
     * @returns Domain user
     */
    private toDomain(persistanceUser: User) {
        const { _id, email, name, password } = persistanceUser;

        return new UserModel(
            new UuidVO(_id),
            new NameVO(name),
            new EmailVO(email),
            new PasswordVO(password)
        );
    }

    /**
     * Transforms a domain user into a database user
     * @param domainUser Domain user
     * @returns Database user
     */
    private toPersistance(domainUser: UserModel) {
        const { id, name, email, password } = domainUser;

        return {
            _id: id.value,
            name: name.value,
            email: email.value,
            password: password.value,
        };
    }

    /**
     * Finds a user by id
     * @param id User id
     * @returns Domain user
     */
    async findById(id: UuidVO): Promise<UserModel | null> {
        const userFound = await UserSchema.findById(id.value).exec();

        if (!userFound) return null;

        return this.toDomain(userFound);
    }

    /**
     * Finds a user by email
     * @param email User email
     * @returns Domain user
     */
    async findByEmail(email: EmailVO): Promise<UserModel | null> {
        const userFound = await UserSchema.findOne({
            email: email.value,
        }).exec();

        if (!userFound) return null;

        return this.toDomain(userFound);
    }

    /**
     * Persists a new user
     * @param domainUser Domain user
     */
    async create(domainUser: UserModel): Promise<void> {
        const persistanceUser = this.toPersistance(domainUser);

        const user = new UserSchema(persistanceUser);

        await user.save();
    }

    /**
     * Updates a user
     * @param domainUser Domain user
     */
    async update(domainUser: UserModel): Promise<void> {
        const persistanceUser = this.toPersistance(domainUser);

        const { _id, ...rest } = persistanceUser;

        await UserSchema.findByIdAndUpdate(_id, rest).exec();
    }
}
