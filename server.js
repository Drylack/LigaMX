const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = {}; // Simulación de base de datos de usuarios en memoria
let comments = []; // Lista de comentarios en memoria

// Registro de usuario
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Usuario y contraseña son requeridos." });
    }

    if (users[username]) {
        return res.status(400).json({ message: "El usuario ya existe." });
    }

    users[username] = { password, comments: [] };
    res.json({ message: "Usuario registrado correctamente." });
});

// Inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!users[username] || users[username].password !== password) {
        return res.status(400).json({ message: "Usuario o contraseña incorrectos." });
    }

    res.json({ message: `Bienvenido, ${username}!` });
});

// Guardar comentario
app.post('/comment', (req, res) => {
    const { username, text } = req.body;

    if (!users[username]) {
        return res.status(400).json({ message: "Usuario no encontrado." });
    }

    comments.push({ user: username, text });
    res.json({ message: "Comentario guardado correctamente." });
});

// Obtener comentarios
app.get('/comments', (req, res) => {
    res.json(comments);
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});