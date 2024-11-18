const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'oficialMegamuebles@gmail.com',
    pass: 'fxsw kcfc xzmm rmur', // Asegúrate de que la contraseña sea correcta
  },
});

const sendResetEmail = async (email, resetLink) => {
    const mailOptions = {
      from: 'oficialMegamuebles@gmail.com',
      to: email,
      subject: 'Restablecimiento de Contraseña - Mega Muebles',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: 'Helvetica', sans-serif;
                    background-color: #f4f4f4;
                    padding: 0;
                    margin: 0;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    background: white;
                    border: 1px solid #e1e1e1;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                .header {
                    background: #4a90e2; /* Azul claro */
                    color: white;
                    padding: 20px;
                    text-align: center;
                }
                .content {
                    padding: 20px;
                }
                h1 {
                    margin: 0;
                    font-size: 24px;
                }
                p {
                    line-height: 1.6;
                    color: #333;
                }
                a {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 12px 15px;
                    background: #4a90e2; /* Azul claro */
                    color: white;
                    text-decoration: none;
                    border-radius: 4px;
                    text-align: center;
                    font-weight: bold;
                }
                a:hover {
                    background: #357ab8; /* Un tono más oscuro de azul */
                }
                .footer {
                    text-align: center;
                    padding: 10px;
                    font-size: 12px;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Mega Muebles</h1>
                </div>
                <div class="content">
                    <h2>Estimado Usuario,</h2>
                    <p>Hemos recibido una solicitud para restablecer la contraseña de su cuenta en Mega Muebles.</p>
                    <p>Por favor, haga clic en el siguiente enlace para restablecer su contraseña:</p>
                    <a href="${resetLink}">Restablecer Contraseña</a>
                    <p>Si no solicitó este cambio, puede ignorar este correo. Su cuenta permanece segura.</p>
                </div>
                <div class="footer">
                    <p>© 2024 Mega Muebles. Todos los derechos reservados.</p>
                    <p>Estamos aquí para ayudarlo a encontrar los muebles perfectos para su hogar.</p>
                </div>
            </div>
        </body>
        </html>
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Correo enviado a:', email);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw error;
    }
  };
  

  
  module.exports = { sendResetEmail};