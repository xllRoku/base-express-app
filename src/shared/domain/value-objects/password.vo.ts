import { compare, hash } from 'bcrypt';
import { ValueObject } from './value.objects';
import { PlainPasswordVO } from './plain.password.vo';

const HASH_SALT = 10;

export class PasswordVO extends ValueObject<string> {
    public equals(valueObject: PasswordVO) {
        return this.value === valueObject.value;
    }

    protected assertIsValid(_: string) {
        return true;
    }

    public static async create(plainPassword: string) {
        if (
            plainPassword.length < 8 ||
            plainPassword.length > 30 ||
            plainPassword.includes(' ')
        ) {
            throw new Error(PasswordVO.name);
        }

        const hashedPassword = await hash(plainPassword, HASH_SALT);

        return new PasswordVO(hashedPassword);
    }

    public compare(plainPasswordVO: PlainPasswordVO) {
        return compare(plainPasswordVO.value, this.value);
    }
}
