export class Message {
    private messageId: number;
    private appointmentId: number;
    private content: string;

    constructor(
        messageId: number,
        appointmentId: number,
        content: string,

    ) {
        this.messageId = messageId;
        this.appointmentId = appointmentId;
        this.content = content;
    }
}
