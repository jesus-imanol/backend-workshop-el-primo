import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { Appointment } from '../models/Appointment';

dotenv.config();

export class AppointmentRepository {
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
    async getAllAppointments(): Promise<Appointment[] | null> {
        const [rows] = await this.connection.execute('SELECT * FROM Cita');
        return rows as Appointment[];
    }

    async getAppointmentById(id: number): Promise<Appointment | null> {
        try {
            const [rows]: any = await this.connection.execute('SELECT * FROM Cita WHERE ID_Cita = ?', [id]);
            if (rows.length === 0) return null;

            const row = rows[0];
            return new Appointment(
                row.ID_Cita,
                row.ID_Cliente,
                row.Modelo_Version,
                row.Detalles,
                row.Fecha,
                row.Hora,
                row.Rapido,
                row.ID_Mecanico,
                row.Estatus
            );
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createAppointment(data: any): Promise<Appointment | null> {
        try {
            const [result]: any = await this.connection.execute(
                'INSERT INTO Cita (ID_Cliente, ID_Mecanico, Modelo_Version, Detalles, Fecha, Hora, Rapido, Estatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [data.clientId, data.mechanicId, data.modelVersion, data.details, data.date, data.time, data.fast, data.status]
            );
            return new Appointment(
                result.insertId,
                data.clientId,
                data.modelVersion,
                data.details,
                data.date,
                data.time,
                data.fast,
                data.mechanicId,
                data.status
            );
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateAppointment(id: number, data: any): Promise<Appointment | null> {
        try {
            await this.connection.execute(
                'UPDATE Cita SET ID_Cliente = ?, ID_Mecanico = ?, Modelo_Version = ?, Detalles = ?, Fecha = ?, Hora = ?, Rapido = ?, Estatus = ? WHERE ID_Cita = ?',
                [data.clientId, data.mechanicId, data.modelVersion, data.details, data.date, data.time, data.fast, data.status, id]
            );
            return await this.getAppointmentById(id); // Return the updated appointment
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateAppointmentPartial(id: number, data: any): Promise<Appointment | null> {
        const updates = [];
        const values = [];

        if (data.clientId) {
            updates.push('ID_Cliente = ?');
            values.push(data.clientId);
        }
        if (data.mechanicId) {
            updates.push('ID_Mecanico = ?');
            values.push(data.mechanicId);
        }
        if (data.modelVersion) {
            updates.push('Modelo_Version = ?');
            values.push(data.modelVersion);
        }
        if (data.details) {
            updates.push('Detalles = ?');
            values.push(data.details);
        }
        if (data.date) {
            updates.push('Fecha = ?');
            values.push(data.date);
        }
        if (data.time) {
            updates.push('Hora = ?');
            values.push(data.time);
        }
        if (data.fast !== undefined) {
            updates.push('Rapido = ?');
            values.push(data.fast);
        }
        if (data.status) {
            updates.push('Estatus = ?');
            values.push(data.status);
        }

        if (updates.length === 0) {
            return null; 
        }

        const query = `UPDATE Cita SET ${updates.join(', ')} WHERE ID_Cita = ?`;
        values.push(id);

        try {
            await this.connection.execute(query, values);
            return await this.getAppointmentById(id); // Return the updated appointment
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteAppointment(id: number): Promise<{ status: boolean } | null> {
        try {
            await this.connection.execute('DELETE FROM Cita WHERE ID_Cita = ?', [id]);
            return { status: true };
        } catch (error) {
            console.error(error);
            return null;
        }  
    }
    async getAppointmentsByClientId(userId: number): Promise<Appointment[] | null> {
        try {
            console.log(userId);
            
            const [rows] = await this.connection.execute(
                `SELECT * FROM Cita WHERE ID_Cliente = ? OR ID_Mecanico = ?`,[userId, userId]
            );
            return rows as Appointment[];
        } catch (error) {
            return null;
        }
    }
    async updateAppointmentStatus(id: number, status: number): Promise<Appointment | null> {
        try {
            await this.connection.execute(
                'UPDATE Cita SET Estatus = ? WHERE ID_Cita = ?',
                [status, id]
            );
            return await this.getAppointmentById(id); 
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
}
