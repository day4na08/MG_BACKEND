require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql');
const md5 = require('md5');
const cors = require('cors');
const { sendResetEmail } = require('./testEmail'); // Importa la función
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const conexion = mysql.createConnection({
    host: process.env.DB_HOST || "bophiqaqn7njcq914abj-mysql.services.clever-cloud.com",
    port: process.env.DB_PORT || "3306", 
    database: process.env.DB_NAME || "bophiqaqn7njcq914abj",
    user: process.env.DB_USER || "ut5fkytyx472ncxy",
    password: process.env.DB_PASSWORD || "oOzIqyORHac6JjwuQjdI"
});

conexion.connect(err => {
    if (err) {
        console.error("Error de conexión: ", err);
        return;
    }
    console.log("Conexión a la base de datos exitosa");
});


// Ruta de registro
app.post('/register', (req, res) => {
    const { username, apellido, email, password, role } = req.body;

    // Verificar si el email ya existe
    const checkUserQuery = 'SELECT * FROM usuarios WHERE email = ?';
    conexion.query(checkUserQuery, [email], (err, results) => {
        if (err) return res.status(500).send('Error en la base de datos');
        if (results.length > 0) {
            return res.status(400).send('El correo electrónico ya está en uso');
        }

        // Si no existe, insertar el nuevo usuario
        const hashedPassword = md5(password);
        const insertUserQuery = 'INSERT INTO usuarios (username, apellido, email, contrasena, role) VALUES (?, ?, ?, ?, ?)';
        conexion.query(insertUserQuery, [username, apellido, email, hashedPassword, role], (err) => {
            if (err) return res.status(500).send('Error al registrar usuario');
            res.status(201).send('Usuario registrado con éxito');
        });
    });
});

// Ruta de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = md5(password);

    const query = 'SELECT * FROM usuarios WHERE email = ? AND contrasena = ?';
    conexion.query(query, [email, hashedPassword], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const user = results[0];
            res.json({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            });
        } else {
            res.status(401).send('Correo electrónico o contraseña incorrectos');
        }
    });
});

// Ruta para obtener los datos del usuario por ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    const query = 'SELECT * FROM usuarios WHERE id = ?';
    conexion.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).send('Error al obtener los datos del usuario');
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    });
});

//CRUD usuarios
app.post("/createUser",(req,res)=>{


    const username = req.body.username;
    const apellido = req.body.apellido;
    const email = req.body.email;
    const contrasena = req.body.contrasena;
    const role = req.body.role;


    conexion.query('INSERT INTO usuarios(username,apellido,email,contrasena,role) VALUES(?,?,?,?,?)',[username,apellido,email,contrasena,role],
        (err,result)=>{
        if(err){
        console.log(err);
        }else{
        res.send("Usuario registrado con éxito!!");
    }
    }
    )
});


//actualizar
app.put("/updateUser",(req,res)=>{


    const username = req.body.username;
    const id = req.body.id;
    const apellido = req.body.apellido;
    const email = req.body.email;
    const contrasena = req.body.contrasena;
    const role = req.body.role;


    conexion.query('UPDATE usuarios SET username=?, apellido=?,email=?,contrasena=?,role=? WHERE id=? ',
        [username,apellido,email,contrasena,role,id],
        (err,result)=>{
        if(err){
        console.log(err);
        }else{
        res.send("Usuario registrado con éxito!!");
    }
    }
    )
});

//CRUD usuarios
app.delete('/deleteUser/:id',(req,res)=>{

    const id  = req.params.id 

    conexion.query('DELETE FROM usuarios WHERE id=? ',[id],

    (err,result)=>{
        if(err){
            console.log(err);

        }else{
            res.send(result);
        }
    }
    );
});




app.get("/registrados",(req,res)=>{

    conexion.query('SELECT * FROM usuarios',
        (err,result)=>{
        if(err){
        console.log(err);
        }else{
        res.send(result);
    }
    }
    )
});








// Ruta para agregar un nuevo producto
app.post('/productos', (req, res) => {
    const name  = req.body.name 
    const material = req.body.material
    const estilo = req.body.estilo
    const tela = req.body.tela
    const acabado = req.body.acabado
    const color = req.body.color
    const tapizMaterial = req.body.tapizMaterial
    const materialInterno = req.body.materialInterno
    const precio = req.body.precio
    const descripcion = req.body.descripcion
    const requiereArmado = req.body.requiereArmado
    const alto = req.body.alto
    const ancho = req.body.ancho
    const profundidad = req.body.profundidad
    const pesoNeto = req.body.pesoNeto
    const cantidad = req.body.cantidad
    const autor = req.body.autor
    const imagen1 = req.body.imagen1
    const imagen2 = req.body.imagen2
    const imagen3 = req.body.imagen3
    const imagen4 = req.body.imagen4
    const imagen3D = req.body.imagen3D

    conexion.query('INSERT INTO productos (name, material, estilo, tela, acabado, color, tapizMaterial, materialInterno, precio, descripcion, requiereArmado, alto, ancho, profundidad, pesoNeto, cantidad, autor, imagen1, imagen2, imagen3, imagen4, imagen3D) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [name, material, estilo, tela, acabado, color, tapizMaterial, materialInterno, precio, descripcion, requiereArmado, alto, ancho, profundidad, pesoNeto, cantidad, autor, imagen1, imagen2, imagen3, imagen4, imagen3D],
    (err,result)=>{
        if(err){
            console.log(err);

        }else{
            res.send("Mueble agregado satisfactoriamente :))");
        }
    }
    );
});

//leer productos :)
app.get("/llamarProductos",(req,res)=>{

    conexion.query('SELECT * FROM productos',
        (err,result)=>{
            if(err){
                console.log(err);

            }else{
                res.send(result)
            }
        }
    )    
})


app.get("/llamarProducto/:id", (req, res) => {
    const id = req.params.id;

    conexion.query('SELECT * FROM productos WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error("Error al obtener los datos del producto:", err);
            return res.status(500).send('Error al obtener los datos del producto');
        }
        if (result.length === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        res.json(result[0]); // Enviar el primer producto encontrado
    });
});


app.delete('/deleteproductos/:id', (req, res) => {
    const id  = req.params.id 

    conexion.query('DELETE FROM productos WHERE id=? ',[id],

    (err,result)=>{
        if(err){
            console.log(err);

        }else{
            res.send(result);
        }
    }
    );
});
//actualizar productos :)
app.put('/updateproductos', (req, res) => {
    const name  = req.body.name 
    const id  = req.body.id 
    const material = req.body.material
    const estilo = req.body.estilo
    const tela = req.body.tela
    const acabado = req.body.acabado
    const color = req.body.color
    const tapizMaterial = req.body.tapizMaterial
    const materialInterno = req.body.materialInterno
    const precio = req.body.precio
    const descripcion = req.body.descripcion
    const requiereArmado = req.body.requiereArmado
    const alto = req.body.alto
    const ancho = req.body.ancho
    const profundidad = req.body.profundidad
    const pesoNeto = req.body.pesoNeto
    const cantidad = req.body.cantidad
    const autor = req.body.autor
    const imagen1 = req.body.imagen1
    const imagen2 = req.body.imagen2
    const imagen3 = req.body.imagen3
    const imagen4 = req.body.imagen4
    const imagen3D = req.body.imagen3D


    conexion.query('UPDATE productos SET name=?, material=?, estilo=?, tela=?, acabado=?, color=?, tapizMaterial=?, materialInterno=?, precio=?, descripcion=?, requiereArmado=?, alto=?, ancho=?, profundidad=?, pesoNeto=?, cantidad=?, autor=?, imagen1=?, imagen2=?, imagen3=?, imagen4=?, imagen3D=? WHERE id=? ',
        [name, material, estilo, tela, acabado, color, tapizMaterial, materialInterno, precio, descripcion, requiereArmado, alto, ancho, profundidad, pesoNeto, cantidad, autor, imagen1, imagen2, imagen3, imagen4, imagen3D, id],

    (err,result)=>{
        if(err){
            console.log(err);

        }else{
            res.send("Mueble actualizado satisfactoriamente :))");
        }
    }
    );
});
// Ruta para agregar un nuevo producto2
app.post('/productos2', (req, res) => {
    const { name, material, color, precio, descripcion, imagen3D } = req.body;

    conexion.query(
        'INSERT INTO productos2 (name, material, color, precio, descripcion, imagen3D) VALUES (?, ?, ?, ?, ?, ?)',
        [name, material, color, precio, descripcion, imagen3D],
        (err, result) => {
            if (err) {
                console.log("Error al agregar el mueble:", err);
                res.status(500).send("Error en el servidor");
            } else {
                res.send("Mueble agregado satisfactoriamente :))");
            }
        }
    );
});

//restablecer contraseña



// Ruta para restablecer contraseña
app.post('/api/password/reset', async (req, res) => {
    const { email } = req.body;

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    conexion.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error en la base de datos:', err);
            return res.status(500).send('Error en la base de datos');
        }
        if (results.length === 0) {
            return res.status(404).send('Correo electrónico no encontrado');
        }

        const token = md5(email + Date.now());
        const resetLink = `http://localhost:3000/reset-password/${token}`;

        // Guardar el token en la base de datos
        const updateTokenQuery = 'UPDATE usuarios SET reset_token = ? WHERE email = ?';
        conexion.query(updateTokenQuery, [token, email], async (err) => {
            if (err) {
                console.error('Error al guardar el token:', err);
                return res.status(500).send('Error al guardar el token');
            }

            try {
                await sendResetEmail(email, resetLink);
                res.status(200).send('Se ha enviado un enlace para restablecer tu contraseña.');
            } catch (error) {
                console.error('Error al enviar el enlace de restablecimiento:', error);
                res.status(500).send('Error al enviar el enlace de restablecimiento.');
            }
        });
    });
});

// Ruta para verificar si el token es válido
app.post('/api/password/verify-token/:token', (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).send('Token no válido');
    }

    const query = 'SELECT * FROM usuarios WHERE reset_token = ?';
    conexion.query(query, [token], (err, results) => {
        if (err) {
            console.error('Error al verificar el token:', err);
            return res.status(500).send('Error al verificar el token');
        }
        if (results.length === 0) {
            return res.status(404).send('Token no válido o expirado');
        }

        // Si el token es válido, respondemos con un mensaje exitoso
        res.status(200).send('Token válido');
    });
});

// Ruta para restablecer la contraseña
app.post('/api/password/reset/:token', (req, res) => {
    const { token } = req.params;
    const { nuevaContraseña } = req.body;

    if (!token) {
        return res.status(400).send('Token no válido');
    }
    if (!nuevaContraseña) {
        return res.status(400).send('La nueva contraseña es requerida');
    }

    const query = 'SELECT * FROM usuarios WHERE reset_token = ?';
    conexion.query(query, [token], (err, results) => {
        if (err) {
            console.error('Error al verificar el token:', err);
            return res.status(500).send('Error al verificar el token');
        }
        if (results.length === 0) {
            return res.status(404).send('Token no válido o expirado');
        }

        const email = results[0].email;

        if (nuevaContraseña.length < 6) {
            return res.status(400).send('La contraseña debe tener al menos 6 caracteres.');
        }

        const hashedPassword = md5(nuevaContraseña);
        const updatePasswordQuery = 'UPDATE usuarios SET contrasena = ?, reset_token = NULL WHERE email = ?';
        conexion.query(updatePasswordQuery, [hashedPassword, email], (err) => {
            if (err) {
                console.error('Error al actualizar la contraseña:', err);
                return res.status(500).send('Error al actualizar la contraseña');
            }

            res.status(200).send('Contraseña actualizada con éxito');
        });
    });
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});