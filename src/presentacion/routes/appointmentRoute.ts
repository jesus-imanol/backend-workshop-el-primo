import express, { Router } from 'express'
import { AppointmentController } from '../controllers/appointmentController'
import { AppointmentRepository } from '../../persistencia/repositorios/AppointmentRepository'
import { AppointmentService } from '../../negocio/services/appointmentService'

export const appointmentRoutes: Router = express.Router();
 const appointmentRepository = new AppointmentRepository();
 const appointmentService = new AppointmentService(appointmentRepository);
 const appointmentController = new AppointmentController(appointmentService);

//Endpoints del recurso appointments
appointmentRoutes.get("/", appointmentController.getAll.bind(appointmentController));
appointmentRoutes.get("/:id", appointmentController.getById.bind(appointmentController));
appointmentRoutes.post("/", appointmentController.createNewAppointment.bind(appointmentController));
appointmentRoutes.put("/:id", appointmentController.updateAppointment.bind(appointmentController));
appointmentRoutes.patch("/:id", appointmentController.updateAppointmentPartial.bind(appointmentController));
appointmentRoutes.delete("/:id", appointmentController.deleteAppointment.bind(appointmentController));
appointmentRoutes.get('/:clientId', appointmentController.getAppointmentByClientId.bind(appointmentController))
appointmentRoutes.patch("/:id/status", appointmentController.updateAppointmentStatus.bind(appointmentController));

