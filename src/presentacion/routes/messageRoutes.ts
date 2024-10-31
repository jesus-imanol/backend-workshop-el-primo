import express, { Router } from 'express';
import { MessageController } from '../controllers/messageController';
import { MessageService } from '../../negocio/services/messageService';
import { MessageRepository } from '../../persistencia/repositorios/MessageRepository';

export const messageRoutes: Router = express.Router();
const messageRepository = new MessageRepository();
const messageService = new MessageService(messageRepository);
const messageController = new MessageController(messageService);

messageRoutes.get('/', messageController.getAllMessages.bind(messageController));
messageRoutes.get('/:id', messageController.getMessageById.bind(messageController));
messageRoutes.post('/', messageController.createMessage.bind(messageController));
messageRoutes.put('/:id', messageController.updateMessage.bind(messageController));
messageRoutes.delete('/:id', messageController.deleteMessage.bind(messageController));
messageRoutes.get('/appointment/:id', messageController.getMessagesByAppointmentId.bind(messageController));