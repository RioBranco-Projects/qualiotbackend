// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Rota de registro de usuário
router.post('/register', registerUser);

// Rota de login de usuário
router.post('/login', loginUser);

export default router;
