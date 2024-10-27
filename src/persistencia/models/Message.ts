export class Message {
    private messageId: number;
    private appointmentId: number;
    private content: string;
    private date: string;

    constructor(
        messageId: number,
        appointmentId: number,
        content: string,
        date: string
    ) {
        this.messageId = messageId;
        this.appointmentId = appointmentId;
        this.content = content;
        this.date = date;
    }
}
