import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { User } from '../models/User';

dotenv.config();

export class UserRepository {
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

    async getAllUsers(): Promise<User[] | null> {
        const [rows] = await this.connection.execute('SELECT * FROM Usuario');
        return rows as User[];
    }

    async getId(id: number): Promise<User | null> {
        try {
            const [rows]: any = await this.connection.execute('SELECT * FROM Usuario WHERE ID_Usuario = ?', [id]);
            if (rows.length === 0) return null;
            return new User(
                rows[0].ID_Usuario,
                rows[0].Username,
                rows[0].FullName,
                rows[0].Password,
                rows[0].Rol,
            );
        } catch (error) {
            return null;
        }
    }

    async createNewUser(data: any): Promise<User | null> {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const [result]: any = await this.connection.execute(
                'INSERT INTO Usuario (Username, FullName, Password, Rol) VALUES (?, ?, ?, ?)',
                [data.username, data.fullName, hashedPassword, data.role]
            );
            return new User(result.insertId, data.username, data.fullName, hashedPassword, data.role);
        } catch (error) {
            return null;
        }
    }

    async updateUser(id: number, data: any): Promise<User | null> {
        try {
            const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : null;
            await this.connection.execute(
                'UPDATE Usuario SET Username = ?, FullName = ?, Password = ?, Rol = ? WHERE ID_Usuario = ?',
                [data.username, data.fullName, hashedPassword || data.password, data.role, id]
            );
            return new User(id, data.username, data.fullName, hashedPassword || data.password, data.role);
        } catch (error) {
            return null;
        }
    }

    async updateUserPartial(id: number, data: any): Promise<User | null> {
        const updates = [];
        const values = [];

        if (data.username) {
            updates.push('Username = ?');
            values.push(data.username);
        }
        if (data.fullName) {
            updates.push('FullName = ?');
            values.push(data.fullName);
        }
        if (data.password) {
            updates.push('Password = ?');
            values.push(await bcrypt.hash(data.password, 10)); // Encriptar la nueva contraseña
        }
        if (data.role) {
            updates.push('Rol = ?');
            values.push(data.role);
        }
        if (updates.length === 0) {
            return null;
        }

        const query = `UPDATE Usuario SET ${updates.join(', ')} WHERE ID_Usuario = ?`;
        values.push(id);

        try {
            await this.connection.execute(query, values);
            return await this.getId(id);
        } catch (error) {
            return null;
        }
    }

    async deleteUser(id: number): Promise<{ status: boolean } | null> {
        try {
            await this.connection.execute('DELETE FROM Usuario WHERE ID_Usuario = ?', [id]);
            return { status: true };
        } catch (error) {
            return null;
        }
    }

    // Método para autenticar al usuario
    async authenticateUser(username: string, password: string): Promise<User | null> {
        try {
            const [rows]: any = await this.connection.execute('SELECT * FROM Usuario WHERE Username = ?', [username]);
            if (rows.length === 0) return null; // Usuario no encontrado

            const user = rows[0];
            const isPasswordMatch = await bcrypt.compare(password, user.Password); // Comparar contraseñas

            if (isPasswordMatch) {
                // Retornar usuario si la autenticación es exitosa
                return new User(user.ID_Usuario, user.Username, user.FullName, user.Password, user.Rol);
            } else {
                return null; // Contraseña incorrecta
            }
        } catch (error) {
            return null;
        }
    }
}
