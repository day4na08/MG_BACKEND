const nodemailer = require('nodemailer');

// Configuración del transporte de correo (puedes usar tu propio servicio de correo)
const transporter = nodemailer.createTransport({
    service: 'gmail', // O el servicio que estés utilizando
    auth: {
        user: 'tucorreo@gmail.com', // Reemplaza con tu correo
        pass: 'tucontraseña' // Reemplaza con tu contraseña de correo o token de aplicación
    }
});

// Función para enviar el correo de confirmación
const sendPurchaseConfirmationEmail = (userEmail, userName, purchaseDetails) => {
    const mailOptions = {
        from: 'tucorreo@gmail.com', // Dirección de correo del remitente
        to: userEmail, // Correo del destinatario (usuario)
        subject: 'Confirmación de Compra',
        html: `
            <h1>¡Gracias por tu compra, ${userName}!</h1>
            <p>Hemos recibido tu pedido y lo estamos procesando. Aquí están los detalles de tu compra:</p>
            <ul>
                <li><strong>Producto:</strong> ${purchaseDetails.nameProduct}</li>
                <li><strong>Categoría:</strong> ${purchaseDetails.categoriaProduct}</li>
                <li><strong>Cantidad:</strong> ${purchaseDetails.cantComprada}</li>
                <li><strong>Precio total:</strong> $${purchaseDetails.precio * purchaseDetails.cantComprada}</li>
            </ul>
            <p>Nos aseguraremos de enviarte una actualización sobre el estado de tu compra pronto.</p>
            <p>¡Gracias por confiar en nosotros!</p>
        `
    };

    return transporter.sendMail(mailOptions);
};