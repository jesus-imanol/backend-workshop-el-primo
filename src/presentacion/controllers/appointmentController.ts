import { Request, Response } from "express";
import { AppointmentService } from "../../negocio/services/appointmentService";

export class AppointmentController {
    constructor(readonly appointmentService: AppointmentService) {}

    async getAll(req: Request, res: Response) {
        const appointments = await this.appointmentService.getAllAppointments();
        res.header("Access-Control-Expose-Headers", "Authorization");
        res.status(200).send({ status: true, data: appointments });
    }

    async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const appointment = await this.appointmentService.getAppointmentById(id);
        if (appointment) {
            res.status(200).send({ status: "OK", data: appointment });
        } else {
            res.status(404).send({ status: "Error", message: "Appointment not found" });
        }
    }

    async createNewAppointment(req: Request, res: Response) {
        const data = req.body;
        console.log("Datos recibidos:", data); 
        const newAppointment = await this.appointmentService.createNewAppointment(data);
        res.status(201).send({ status: "OK", data: newAppointment });
    }
    async updateAppointmentStatus(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const { status } = req.body;
    
        if (status === undefined) {
            return res.status(400).send({ status: "Error", message: "Status is required" });
        }
    
        const updatedAppointment = await this.appointmentService.updateAppointmentStatus(id, status);
        if (updatedAppointment) {
            res.status(200).send({ status: "OK", data: updatedAppointment });
        } else {
            res.status(404).send({ status: "Error", message: "Appointment not found" });
        }
    }
    

    async updateAppointment(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const data = req.body;
        const updatedAppointment = await this.appointmentService.updateAppointment(id, data);
        if (updatedAppointment) {
            res.status(200).send({ status: "OK", data: updatedAppointment });
        } else {
            res.status(404).send({ status: "Error", message: "Appointment not found" });
        }
    }
    async getAppointmentByClientId(req: Request, res:Response) {
        const clientId = parseInt(req.params.id);
        const appointment = await this.appointmentService.getAppointmentsByClientId(clientId);
        if (appointment) {
            res.status(200).send({ status: "OK", data: appointment });
        } else {
            res.status(404).send({ status: "Error", message: "Appointment not found" });
        }
    }
    async updateAppointmentPartial(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const data = req.body;
        const updatedAppointment = await this.appointmentService.updateAppointmentPartial(id, data);
        if (updatedAppointment) {
            res.status(200).send({ status: "OK", data: updatedAppointment });
        } else {
            res.status(404).send({ status: "Error", message: "Appointment not found" });
        }
    }

    async deleteAppointment(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const result = await this.appointmentService.deleteAppointment(id);
        if (result?.status) {
            res.status(200).send({ status: "OK", message: "Appointment deleted successfully" });
        } else {
            res.status(404).send({ status: "Error", message: "Appointment not found" });
        }
    }
}
