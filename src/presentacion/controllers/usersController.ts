import { Request, Response } from "express";
import { UserService } from "../../negocio/services/usersService";

export class UserController {
    constructor(readonly userService: UserService) {}

    async getAll(req: Request, res: Response) {
        const users = await this.userService.getAllUsers();
        // users puede ser null o un arreglo de objetos
        //Este headers permite que el frontend pueda lear la cabecera Authorization
        res.header("Access-Control-Expose-Headers","Authorization")
       
        res.status(200).send({ status: true, data: users });
    }

    async getId(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        const user = await this.userService.getId(id);
        res.status(200).send({ status: "OK", data: user });
    }

    async createNewUser(req: Request, res: Response) {
        const data = req.body;
        const newUSer = await this.userService.createNewUser(data);
        res.status(200).send({ status: "OK", data: newUSer });
    }

    async updateUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const data = req.body;
        const updateUser = await this.userService.updateUser(id, data);
        res.status(200).send({ status: "OK", data: updateUser });
    }

    async updateUserPartial(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const data = req.body;
        const updateUser = await this.userService.updateUserPartial(id, data);
        res.status(200).send({ status: "OK", data: updateUser });
    }
    async deleteUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const deleteUser = await this.userService.deleteUser(id);
        res.status(200).send({ status: "OK", data: deleteUser });
    }
}
