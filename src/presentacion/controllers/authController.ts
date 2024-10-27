import { Request, Response } from 'express';
import { UserRepository } from '../../persistencia/repositorios/UserRepository';

export class AuthController {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async login(req: Request, res: Response) {
        const { username, password } = req.body;

        try {
            const user = await this.userRepository.authenticateUser(username, password);
            
            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            return res.status(200).json({
                message: 'Login exitoso',
                user,
            });
        } catch (error) {
            return res.status(500).json({ message: 'Error en la aunteticacion', error });
        }
    }
}
