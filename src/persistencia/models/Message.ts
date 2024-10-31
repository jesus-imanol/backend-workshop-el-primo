export class Message {
    private messageId: number;
    private appointmentId: number;
    private content: string;
    fecha: string;
    constructor(
        messageId: number,
        appointmentId: number,
        content: string,
        fecha: string

    ) {
        this.messageId = messageId;
        this.appointmentId = appointmentId;
        this.content = content;
        this.fecha = fecha;
    }
}
