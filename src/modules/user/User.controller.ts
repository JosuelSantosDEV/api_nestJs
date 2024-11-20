import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserRepository } from './User.repository';
import { UserDTO } from './dto/User.dto';
import { UserEntity } from './User.entity';
import { v4 } from 'uuid';
import { ListUserData } from './dto/ListUserData.dto';
import { UpdateUserData } from './dto/UpdateUserData.dto';
import { UserService } from './User.service';

@Controller('/users')
export class userController {

    constructor(
        private readonly repository: UserRepository,
        private readonly userService: UserService
    ){}

    @Post()
    async createUser(@Body() userData: UserDTO) {

        const userEntity = new UserEntity();
        userEntity.email = userData.email;
        userEntity.name = userData.name;
        userEntity.password = userData.password;
        userEntity.id = v4()

        await this.userService.createUser(userEntity);
        return { 
            id: userEntity.id,
            msg: "User created with successfull"
        };
    }

    @Get()
    async getUsers() {
        
        const users = await this.userService.listUsers();
        return users;
    }

    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() updateData: UpdateUserData) {

        await this.userService.updateUser(id, updateData);

        return {
            msg: "User updated with successfull"
        }
        
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {

        await this.userService.deleteUser(id);

        return {
            msg: "User deleted with successfull"
        }
        
    }
}
