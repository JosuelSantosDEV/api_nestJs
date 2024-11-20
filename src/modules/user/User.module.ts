import { Module } from "@nestjs/common";
import { userController } from "./User.controller";
import { UserRepository } from "./User.repository";
import { EmailIsUniqueValidate } from "./validation/EmailIsUnique.validate";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./User.entity";
import { UserService } from "./User.service";

@Module({
    imports: [TypeOrmModule.forFeature([
        UserEntity
    ])],
    controllers: [userController],
    providers: [ UserService, UserRepository, EmailIsUniqueValidate]
})
export class UserModule{

}