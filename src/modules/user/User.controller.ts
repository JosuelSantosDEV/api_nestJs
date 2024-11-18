import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserRepository } from './User.repository';
import { UserDTO } from './dto/User.dto';
import { UserEntity } from './User.entity';
import { v4 } from 'uuid';
import { ListUserData } from './dto/ListUserData.dto';
import { UpdateUserData } from './dto/UpdateUserData.dto';

@Controller('/users')
export class userController {

    constructor(private repository: UserRepository){}

    @Post()
    async createUser(@Body() userData: UserDTO) {

        const userEntity = new UserEntity();
        userEntity.email = userData.email;
        userEntity.name = userData.name;
        userEntity.password = userData.password;
        userEntity.id = v4()

        await this.repository.add(userEntity);
        return { 
            id: userEntity.id,
            msg: "User created with successfull"
        };
    }

    @Get()
    async getUser() {
        
        const users = await this.repository.get();
        return users.map(user => new ListUserData(user.id, user.name, user.email));  
    }

    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() updateData: UpdateUserData) {

        const updatedUser = await this.repository.update(id, updateData);

        return {
            user: updatedUser,
            msg: "User updated with successfull"
        }
        
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {

        const updatedUser = await this.repository.delete(id);

        return {
            msg: "User deleted with successfull"
        }
        
    }
}
