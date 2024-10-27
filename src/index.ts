import express from 'express'
import morgan from 'morgan';
import signale from 'signale';
import cors from 'cors'

import { userRoutes } from './presentacion/routes/userRoute';
import {appointmentRoutes} from './presentacion/routes/appointmentRoute';
import { messageRoutes } from './presentacion/routes/messageRoutes';
const app = express()

//Middleware para uso del payload
app.use(express.json()) 
//Middleware para tener un log personalizado
app.use(morgan('dev'))
//Middleware para el uso de cors
app.use(cors())

//Recurso users
app.use("/api/users",userRoutes);
app.use("/api/appointment",appointmentRoutes);
app.use("/api/message",messageRoutes);
app.listen(3000, ()=> {   
    signale.success('Server open in port 3000')
})