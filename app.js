// app.js
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
app.use(cors());

const app = express();

// Configura o middleware para parsear JSON no corpo da requisição
app.use(bodyParser.json());

// Roteamento de autenticação
app.use('/api/usuarios', authRoutes);

// Inicia o servidor
export default app;