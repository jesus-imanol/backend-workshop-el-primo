export class Appointment {
    private id: number;
    private clientId: number;
    private mechanicId?: number;
    private modelVersion: string;
    private details: string;
    private date: string;
    private time: string;
    private fast: boolean;
    private status?: number;

    constructor(
        id: number,
        clientId: number,
        modelVersion: string,
        details: string,
        date: string,
        time: string,
        fast: boolean,
        mechanicId?: number,
        status?: number
    ) {
        this.id = id;
        this.clientId = clientId;
        this.modelVersion = modelVersion;
        this.details = details;
        this.date = date;
        this.time = time;
        this.fast = fast;
        this.mechanicId = mechanicId;
        this.status = status;
    }
}
