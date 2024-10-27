import { User } from '../../persistencia/models/User'
import { UserRepository } from "../../persistencia/repositorios/UserRepository";

export class UserService {
  
    constructor(readonly userRepositorio: UserRepository) {}

    async getAllUsers(): Promise<User[] | null> {
        return this.userRepositorio.getAllUsers()
    }
    async authenticateUser(username: string, password: string): Promise<User | null> {
        return this.userRepositorio.authenticateUser(username, password);
    }

    async getId(id:number):Promise<User | null> {
        return this.userRepositorio.getId(id);
    }

    async createNewUser(data:any): Promise<User | null> {
        return this.userRepositorio.createNewUser(data);
    }

    async updateUser(id:number, data:any): Promise<User | null> {
        return this.userRepositorio.updateUser(id,data);
    }

    async updateUserPartial(id:number,data:any): Promise<User | null> {
        return this.userRepositorio.updateUserPartial(id,data);    
    }
    async deleteUser(id:number): Promise<{ status: boolean } | null> {
       return this.userRepositorio.deleteUser(id);
    }
}