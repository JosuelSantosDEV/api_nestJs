import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailIsUnique } from "../validation/EmailIsUnique.validate";

export class UserDTO{
    @IsNotEmpty()
    name: string;
    @IsEmail()
    @EmailIsUnique({message: "Email already exists"})
    email: string;
    @MinLength(6)
    password: string
}