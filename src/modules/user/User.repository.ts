import { Injectable } from "@nestjs/common";
import { UserEntity } from "./User.entity";

@Injectable()
export class UserRepository {
    private users: UserEntity[] = [];
    
    async add(user: UserEntity){
        this.users.push(user);
    }

    async get(){
        return this.users;
    }

    async getByEmail(email: string){
        const user = this.users.find(user => user.email == email);
        return user != undefined;

    }

    async update(id: string, data: Partial<UserEntity>){
        
        const possibleUser = this.getUserById(id);

        Object.entries(data).forEach(
            ([key, value]) => {
                if(key == 'id') return
                possibleUser[key] = value;
            }
        )
        return possibleUser;
    }

    async delete(id: string){
        const possibleUser = this.getUserById(id);
        this.users = this.users.filter(user => user.id != id)
    }

    private getUserById(id:string) {
        const possibleUser = this.users.find(
            user => user.id === id
        );
    
        if(!possibleUser) {
            throw new Error('Usuário não existe');
        }
    }
}