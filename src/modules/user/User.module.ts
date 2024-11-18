import { Module } from "@nestjs/common";
import { userController } from "./User.controller";
import { UserRepository } from "./User.repository";
import { EmailIsUniqueValidate } from "./validation/EmailIsUnique.validate";

@Module({
    controllers: [userController],
    providers: [UserRepository, EmailIsUniqueValidate]
})
export class UserModule{

}