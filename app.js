// app.js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const jwt = require('jsonwebtoken');
const schema = require('./schema');
const { events } = require('./data');

const app = express();
const SECRET_KEY = 'seu_segredo_super_secreto'; // apenas para simulação

// Para interpretar JSON no body (útil para POST /login se quiser enviar credenciais)
app.use(express.json());

// Middleware para verificar JWT (simulação)
// OBS: conforme solicitado, não decodificamos; apenas verificamos existência/formato simples.
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        // Checagem simplificada: token existe e tem comprimento > 10
        if (token && token.length > 10) {
            req.user = { id: 1, name: 'Usuário Autenticado' };
            return next();
        }
    }
    return res.status(401).send({ message: 'Acesso negado. Token JWT ausente ou inválido.' });
};

// 1. Endpoint RESTful protegido
app.get('/eventos', authMiddleware, (req, res) => {
    res.json({ data: events, user: req.user });
});

// 2. Endpoint de login (simulado) — retorna JWT fictício
app.post('/login', (req, res) => {
    // Aqui normalmente validaria username/password no body.
    // Para simulação, aceitaremos qualquer requisição POST e retornamos um token.
    const payload = { userId: 1, username: 'teste_user' };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token: token, message: 'Login bem-sucedido (simulado)' });
});

// 3. GraphQL endpoint (pode ficar aberto ou proteger se desejar)
// Vamos deixar aberto para facilitar uso do GraphiQL. Se quiser proteger, aplique authMiddleware aqui.
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
