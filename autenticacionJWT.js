const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const aut = express();

const users = require('./users.json');

aut.use(express.json());

aut.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        res.status(401).send("El nombre o la contraseña son incorrectas");
    } else {
        const token = jwt.sign(user, process.env.SECRET_KEY);
        res.json({ token: token });
    }
})

function JWTValidation (req, res, next) {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        res.status(401).json({ error: "NO AUTORIZADO"});
    } 
    
    const dataToken = token.split(' ')[1]; 
    try {
        const decodedToken = jwt.verify( dataToken, process.env.SECRET_KEY );
        if (decodedToken.rol === "admin") {
            req.headers = { ...req.headers, rol: "admin"};
        } else if (decodedToken.rol === "user") {
            req.headers = { ...req.headers, rol: "user"};
        }
        next();
    } catch (error) {
        res.status(401).send("Token no valido");
    }
}

aut.get('/premium-clients', JWTValidation, (req, res) => {
    if (req.headers.rol === "admin") {
        res.send("Bienvenido admin");
    } else {
        res.status(401).send("Necesitas un rol admin para ingresar");
    }
})

aut.get('/medium-clients', JWTValidation, (req, res) => {
    const valid = req.headers.rol;

    if (valid === "admin" || valid === "user") {
        res.send("Bienvenido a tu lista de tareas")
    } else {
        res.status(401).send("Acceso no autorizado")
    }
})

module.exports = aut;