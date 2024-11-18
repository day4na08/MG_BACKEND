const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendResetEmail } = require('./testEmail');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

const SECRET_KEY = 'tu_clave_secreta_para_JWT'; // Cambia esto por una clave más segura en producción

// Función para cargar la base de datos (db.json)
function loadDB() {
    const data = fs.readFileSync('db.json', 'utf-8');
    return JSON.parse(data);
}

// Función para guardar en la base de datos (db.json)
function saveDB(db) {
    fs.writeFileSync('db.json', JSON.stringify(db, null, 2), 'utf-8');
}

// Ruta para registrar un nuevo usuario
app.post('/register', async (req, res) => {
    const { username, apellido, email, password, role } = req.body;
    const db = loadDB();

    const existingUser = db.users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: db.users.length + 1,
        username,
        apellido,
        email,
        password: hashedPassword,
        role: role || 'user',
    };

    db.users.push(newUser);
    saveDB(db);
    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
});

// Ruta para iniciar sesión
app.post('/users/login', async (req, res) => { // Cambié aquí
    const { email, password } = req.body;
    const db = loadDB();
    const user = db.users.find(u => u.email === email);

    if (!user) {
        return res.status(404).send('Usuario no encontrado.');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).send('Contraseña incorrecta.');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ usuario: user, token });
});

// Rutas para recuperar la contraseña (restablecer)
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    // Verificar si el correo electrónico existe
    const checkUserQuery = 'SELECT * FROM Usuarios WHERE email = ?';
    conexion.query(checkUserQuery, [email], async (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos');
        if (results.length === 0) {
            return res.status(404).send('Correo electrónico no encontrado');
        }

        // Generar un token JWT para el enlace de restablecimiento
        const userId = results[0].id;
        const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
        const resetLink = `http://localhost:3000/restablecer/${token}`;

        try {
            // Enviar correo de restablecimiento
            await sendResetEmail(email, resetLink);
            res.json({ message: `Se ha enviado un enlace de recuperación a ${email}` });
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            return res.status(500).json({ message: 'Error al enviar el correo.' });
        }
    });
});
// Ruta para verificar el token (GET)
app.get('/restablecer/:token', (req, res) => {
    const token = req.params.token;

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send('Token inválido o expirado.');
        }
        res.status(200).json({ message: 'Token válido', userId: decoded.id });
    });
});

// Ruta para actualizar la contraseña (POST)
app.post('/restablecer/:token', async (req, res) => {
    const token = req.params.token;
    const { nuevaContraseña } = req.body;

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).send('Token inválido o expirado.');
        }

        const db = loadDB();
        const user = db.users.find(u => u.id === decoded.id);

        if (!user) {
            return res.status(404).send('Usuario no encontrado.');
        }

        const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);
        user.password = hashedPassword;

        saveDB(db);
        res.send('Contraseña actualizada exitosamente.');
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
