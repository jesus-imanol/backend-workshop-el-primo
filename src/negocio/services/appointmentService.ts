import { Appointment } from "../../persistencia/models/Appointment";
import { AppointmentRepository } from '../../persistencia/repositorios/AppointmentRepository';
export class AppointmentService {
  
    constructor(readonly appointmentRepository: AppointmentRepository) {}

    async getAllAppointments(): Promise<Appointment[] | null> {
        return this.appointmentRepository.getAllAppointments();
    }
    async updateAppointmentStatus(id: number, status: number): Promise<Appointment | null> {
        return this.appointmentRepository.updateAppointmentStatus(id, status);
    }
    

    async getAppointmentById(id: number): Promise<Appointment | null> {
        return this.appointmentRepository.getAppointmentById(id);
    }
    async getAppointmentsByClientId(clientId: number): Promise<Appointment[] | null> {
        return this.appointmentRepository.getAppointmentsByClientId(clientId);
    }
    
    async createNewAppointment(data: any): Promise<Appointment | null> {
        return this.appointmentRepository.createAppointment(data);
    }

    async updateAppointment(id: number, data: any): Promise<Appointment | null> {
        return this.appointmentRepository.updateAppointment(id, data);
    }

    async updateAppointmentPartial(id: number, data: any): Promise<Appointment | null> {
        return this.appointmentRepository.updateAppointmentPartial(id, data);
    }

    async deleteAppointment(id: number): Promise<{ status: boolean } | null> {
        return this.appointmentRepository.deleteAppointment(id);
    }
}
