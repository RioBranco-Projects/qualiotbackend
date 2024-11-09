// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Função de registro de usuário
export const registerUser = (req, res) => {
    const { email, password } = req.body;

    // Verifica se o usuário já existe
    User.findByEmail(email, (err, user) => {
        if (user) {
            return res.status(400).json({ erro: 'Usuário já existe' });
        }

        // Criptografa a senha
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ erro: 'Erro ao criptografar senha' });
            }

            // Cria o novo usuário
            User.createUser(email, hashedPassword, (err, result) => {
                if (err) {
                    return res.status(500).json({ erro: 'Erro ao criar usuário' });
                }

                // Cria o token de autenticação
                const token = jwt.sign({ email }, 'segredo-do-token', { expiresIn: '1h' });

                return res.status(201).json({ mensagem: 'Usuário registrado com sucesso!', token });
            });
        });
    });
};

// Função de login de usuário
export const loginUser = (req, res) => {
    const { email, password } = req.body;

    // Verifica se o usuário existe
    User.findByEmail(email, (err, user) => {
        if (!user) {
            return res.status(400).json({ erro: 'Usuário ou senha inválidos' });
        }

        // Verifica a senha
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (!isMatch) {
                return res.status(400).json({ erro: 'Usuário ou senha inválidos' });
            }

            // Cria o token de autenticação
            const token = jwt.sign({ email }, 'segredo-do-token', { expiresIn: '1h' });

            return res.status(200).json({ mensagem: 'Login bem-sucedido!', token });
        });
    });
};
