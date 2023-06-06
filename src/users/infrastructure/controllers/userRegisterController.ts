import { Body, Controller, Post, Route, SuccessResponse } from 'tsoa';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { UserRegisterUseCase } from '../../application/use-cases/user-register.usecase';
import { UuidVO } from '@shared/domain/value-objects/uuid.vo';
import { NameVO } from '@shared/domain/value-objects/name.vo';
import { EmailVO } from '@shared/domain/value-objects/email.vo';
import { PasswordVO } from '@shared/domain/value-objects/password.vo';

@Route('users')
export class UserRegisterController extends Controller {
    @SuccessResponse('201', 'Created')
    @Post()
    public async execute(
        @Body() userRegisterDto: UserRegisterDto
    ): Promise<void> {
        const { id, email, name, password } = userRegisterDto;

        await new UserRegisterUseCase().execute(
            new UuidVO(id),
            new NameVO(name),
            new EmailVO(email),
            await PasswordVO.create(password)
        );

        this.setStatus(201);
        return;
    }
}
