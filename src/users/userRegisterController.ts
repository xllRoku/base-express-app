import { Body, Controller, Post, Route, SuccessResponse } from 'tsoa';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserRegisterUseCase } from './user-register.usecase';
import { UuidVO } from './value-objects/uuid.vo';
import { NameVO } from './value-objects/name.vo';
import { EmailVO } from './value-objects/email.vo';
import { PasswordVO } from './value-objects/password.vo';

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
