import { Message } from '../../persistencia/models/Message';
import { MessageRepository } from '../../persistencia/repositorios/MessageRepository';

export class MessageService {
    constructor(private readonly messageRepository: MessageRepository) {}

    async getAllMessages(): Promise<Message[] | null> {
        return this.messageRepository.getAllMessages();
    }

    async getMessageById(id: number): Promise<Message | null> {
        return this.messageRepository.getMessageById(id);
    }

    async createMessage(data: any): Promise<Message | null> {
        return this.messageRepository.createMessage(data);
    }

    async updateMessage(id: number, data: any): Promise<Message | null> {
        return this.messageRepository.updateMessage(id, data);
    }

    async deleteMessage(id: number): Promise<boolean> {
        return this.messageRepository.deleteMessage(id);
    }
}
