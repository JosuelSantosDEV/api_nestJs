import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./User.entity";
import { Repository } from "typeorm";
import { ListUserData } from "./dto/ListUserData.dto";
import { UpdateUserData } from "./dto/UpdateUserData.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}    

    async listUsers(){
        const users = await this.userRepository.find();
        const listUsers = users.map(user => new ListUserData(user.id, user.name, user.email));
        return listUsers;
    }
    async createUser(userData: UserEntity){
        const users = await this.userRepository.save(userData);
    }
    async updateUser(id : string, userData: UpdateUserData){
        await this.userRepository.update(id, userData);
    }
    async deleteUser(id: string){
        await this.userRepository.delete(id)
    }



}