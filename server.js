import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from './config/db.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Chave secreta para o JWT
const JWT_SECRET = 'secreta';  // Use uma chave secreta mais segura no ambiente de produção

// Rota para registrar um novo usuário
app.post('/api/usuarios', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificar se o email já está registrado
        const [existingUser] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Este email já está registrado' });
        }

        // Hash da senha antes de salvar no banco
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserir o usuário no banco de dados
        await pool.query('INSERT INTO usuarios (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        res.status(201).json({ message: 'Usuário registrado com sucesso. Faça login.' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro ao registrar usuário. Tente novamente mais tarde.' });
    }
});

// Rota para fazer login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar se o usuário existe
        const [user] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (!user || user.length === 0) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        // Comparar a senha fornecida com a senha armazenada
        const isPasswordValid = await bcrypt.compare(password, user[0].password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        // Gerar o token JWT
        const token = jwt.sign(
            { userId: user[0].id, email: user[0].email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro ao fazer login. Tente novamente mais tarde.' });
    }
});

// Rota protegida para testes (exemplo de página inicial que requer JWT)
app.get('/home', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        res.json({ message: 'Bem-vindo à página inicial!' });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
