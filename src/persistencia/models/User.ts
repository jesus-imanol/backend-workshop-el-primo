export class User {
    private id: number;
    private username: string;
    private fullName: string;
    private password: string;
    private role: 'Cliente' | 'Mecanico';

    constructor(
        id: number,
        username: string,
        fullName: string,
        password: string,
        role: 'Cliente' | 'Mecanico'
    ) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.password = password; 
        this.role = role;
    }
}
