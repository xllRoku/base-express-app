import { IsString } from 'class-validator';

export class UserRegisterDto {
    @IsString()
    id!: string;
    @IsString()
    name!: string;
    @IsString()
    email!: string;
    @IsString()
    password!: string;
}
