import { Request, Response } from 'express';
import { MessageService } from '../../negocio/services/messageService';

export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    async getAllMessages(req: Request, res: Response) {
        const messages = await this.messageService.getAllMessages();
        res.status(200).send({ status: 'OK', data: messages });
    }

    async getMessageById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const message = await this.messageService.getMessageById(id);
        res.status(200).send({ status: 'OK', data: message });
    }

    async createMessage(req: Request, res: Response) {
        const data = req.body;
        const newMessage = await this.messageService.createMessage(data);
        res.status(200).send({ status: 'OK', data: newMessage });
    }

    async updateMessage(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const data = req.body;
        const updatedMessage = await this.messageService.updateMessage(id, data);
        res.status(200).send({ status: 'OK', data: updatedMessage });
    }

    async deleteMessage(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const success = await this.messageService.deleteMessage(id);
        res.status(200).send({ status: success ? 'OK' : 'FAILED' });
    }
}
