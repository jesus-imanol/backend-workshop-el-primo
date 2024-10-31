import express from 'express';
import morgan from 'morgan';
import signale from 'signale';
import cors from 'cors';

import { userRoutes } from './presentacion/routes/userRoute';
import { appointmentRoutes } from './presentacion/routes/appointmentRoute';
import { messageRoutes } from './presentacion/routes/messageRoutes';

const app = express();

// Middleware para el uso de JSON en el payload
app.use(express.json());

// Middleware para tener un log personalizado
app.use(morgan('dev'));

// Configuración de CORS para permitir todos los orígenes
const corsOptions = {
    origin: '*', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};
app.use(cors(corsOptions));

// Rutas de la aplicación
app.use("/api/users", userRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/message", messageRoutes);

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {   
    signale.success('Server open in port 3000');
});
