import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { Message } from '../models/Message';
dotenv.config();

export class MessageRepository {
    private connection: mysql.Pool;

    constructor() {
        this.connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            waitForConnections: true,
            connectionLimit: 10,
        });
    }

    async getAllMessages(): Promise<Message[] | null> {
        const [rows] = await this.connection.execute('SELECT * FROM Mensaje');
        return rows as Message[];
    }

    async getMessageById(id: number): Promise<Message | null> {
        const [rows]: any = await this.connection.execute('SELECT * FROM Mensaje WHERE ID_Mensaje = ?', [id]);
        if (rows.length) {
            const row = rows[0];
            return new Message(row.ID_Mensaje, row.ID_Cita, row.Contenido,row.Fecha);
        }
        return null;
    }
    async getMessagesByAppointmentId(appointmentId: number): Promise<Message[] | null> {
        const [rows]: any = await this.connection.execute('SELECT * FROM Mensaje WHERE ID_Cita = ?', [appointmentId]);
        return rows as Message[];
    }

    async createMessage(data: any): Promise<Message | null> {
        const [result]: any = await this.connection.execute(
            'INSERT INTO Mensaje (ID_Cita, Contenido, Fecha) VALUES (?, ?, ?)',
            [data.appointmentId, data.content, data.date]
        );
        return new Message(result.insertId, data.appointmentId, data.content, data.fecha);
    }
    

    async updateMessage(id: number, data: any): Promise<Message | null> {
        await this.connection.execute(
            'UPDATE Mensaje SET ID_Cita = ?, Contenido = ?, Fecha = ? WHERE ID_Mensaje = ?',
            [data.appointmentId, data.content, data.date, id]
        );
        return this.getMessageById(id);
    }

    async deleteMessage(id: number): Promise<boolean> {
        const [result]: any = await this.connection.execute('DELETE FROM Mensaje WHERE ID_Mensaje = ?', [id]);
        return result.affectedRows > 0;
    }
}
