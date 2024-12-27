const transporter = require("./nodemailer.config")

const welcomeTemplateMail = async (username, userEmail) => {
    try {
        const info = await transporter.sendMail({
            from: '"RollingPaws" <admin@rollingpaws.com>',
            to: userEmail,
            subject: "Bienvenido a RollingPaws",
            html: `
            <div
        style="max-width: 500px; filter: drop-shadow(0,0,4px,#eaeaea); margin: 0 auto; border: 1px solid #eaeaea; border-radius: 14px;">
        <header
            style="width: 100%; height: 140px; background-color: #F6DA90; border-radius: 14px 14px 0 0;">
            <div style="width: 100%; display: flex; justify-content: center; align-items: center; padding-top: 16px;"><img src="https://res.cloudinary.com/dqpq2d0es/image/upload/v1734960538/simple-logo-nobg_kk50aq.png"
                alt="RollingPaws Logo" style="width: 15%; margin: 0 auto;"></div>
            <p style="font-size: 24px; margin-top: 8px; font-weight: bold; margin-bottom: 0; text-align: center;">RollingPaws</p>
        </header>
        <main style="padding: 16px; background-color: #FFFBF5;">
            <p style="padding: 0 8px">Querido/a ${username},</p>
            <p style="text-align: justify; padding: 0 16px">Bienvenido a la comunidad RollingPaws,</p>
            <p style="text-align: justify; padding: 0 16px">¡Bienvenido/a a RollingPaws! Nos alegra mucho que hayas confiado en nosotros
                para el cuidado y bienestar
                de tus amados compañeros peludos. En nuestra veterinaria, nos dedicamos a ofrecer servicios de
                diagnóstico por imágenes y atención veterinaria de la más alta calidad.</p>

            <p style="text-align: justify; padding: 0 16px">Nos encantaría conocerte a ti y a tu mascota en persona. ¡No dudes en pasar
                por nuestras instalaciones
                para una consulta o simplemente para saludarnos! Además, te invitamos a seguirnos en nuestras redes
                sociales para estar al tanto de las novedades y consejos útiles.</p>

            <p style="text-align: justify; padding: 0 16px">Gracias por elegir RollingPaws. Estamos aquí para ti y tu mascota.</p>

            <p style="text-align: justify; padding: 0 16px">Atentamente, El equipo de RollingPaws</p>
            <div style="width: 100%; display: flex; justify-content: center; align-items: center; margin-bottom: 16px;">
                <a style="margin: 0 auto; background-color: #F37E3B; border: 0; border-radius: 7px; padding: 10px 16px; height: 24px; font-size: 16px; font-weight: 600; text-decoration: none; cursor: pointer; color: #000;"
                    href="http://localhost:5173/">Ir
                    a
                    RollingPaws</a>
            </div>
        </main>
        <footer
            style="display: flex; justify-content: space-between; align-items: center; background-color: #F6DA90; padding: 16px; border-radius: 0 0 14px 14px;">
            <div>
                <p style="margin: 0; font-size: 12px">Clínica veterinaria Rolling Paws</p>
                <p style="margin: 0; font-size: 12px">Calle Falsa 123</p>
                <p style="margin: 0; font-size: 12px">San Miguel de Tucumán, Tucumán, Ar</p>
            </div>
            <div style="margin-left: auto">
                <p style="margin: 0; font-size: 12px">+54 381 4123456</p>
                <p style="margin: 0; font-size: 12px">+54 381 4123456</p>
            </div>
        </footer>
    </div>
            `
        });
    } catch (error) {
        console.log(error)
    }
}

const contactTemplateMail = async (username, userEmail) => {
    try {
        const info = await transporter.sendMail({
            from: '"RollingPaws" <admin@rollingpaws.com>',
            to: userEmail,
            subject: "Gracias por tu mensaje",
            html: `
            <div
        style="max-width: 500px; filter: drop-shadow(0,0,4px,#eaeaea); margin: 0 auto; border: 1px solid #eaeaea; border-radius: 14px;">
        <header
            style="width: 100%; height: 140px; background-color: #F6DA90; border-radius: 14px 14px 0 0;">
            <div style="width: 100%; display: flex; justify-content: center; align-items: center; padding-top: 16px;"><img src="https://res.cloudinary.com/dqpq2d0es/image/upload/v1734960538/simple-logo-nobg_kk50aq.png"
                alt="RollingPaws Logo" style="width: 15%; margin: 0 auto;"></div>
            <p style="font-size: 24px; margin-top: 8px; font-weight: bold; margin-bottom: 0; text-align: center;">RollingPaws</p>
        </header>
        <main style="padding: 16px; background-color: #FFFBF5;">
            <p style="padding: 0 8px">Estimado/a ${username},</p>
            <p style="text-align: justify; padding: 0 16px">¡Gracias por contactarnos! Hemos recibido tu mensaje y nuestro equipo de RollingPaws lo está revisando. Te responderemos a la brevedad.</p>

            <p style="text-align: justify; padding: 0 16px">Atentamente, El equipo de RollingPaws</p>

            <div style="width: 100%; display: flex; justify-content: center; align-items: center; margin-bottom: 16px;">
                <a style="margin: 0 auto; background-color: #F37E3B; border: 0; border-radius: 7px; padding: 10px 16px; height: 24px; font-size: 16px; font-weight: 600; text-decoration: none; cursor: pointer; color: #000;"
                    href="http://localhost:5173/">Ir
                    a
                    RollingPaws</a>
            </div>
        </main>
        <footer
            style="display: flex; justify-content: space-between; align-items: center; background-color: #F6DA90; padding: 16px; border-radius: 0 0 14px 14px;">
            <div>
                <p style="margin: 0; font-size: 12px">Clínica veterinaria Rolling Paws</p>
                <p style="margin: 0; font-size: 12px">Calle Falsa 123</p>
                <p style="margin: 0; font-size: 12px">San Miguel de Tucumán, Tucumán, Ar</p>
            </div>
            <div style="margin-left: auto">
                <p style="margin: 0; font-size: 12px">+54 381 4123456</p>
                <p style="margin: 0; font-size: 12px">+54 381 4123456</p>
            </div>
        </footer>
    </div>
            `
        });
    } catch (error) {
        console.log(error)
    }
}

const PlansTemplateMail = async (username, userEmail) => {
    try {
        const info = await transporter.sendMail({
            from: '"RollingPaws" <admin@rollingpaws.com>',
            to: userEmail,
            subject: "Planes de salud RollingPaws",
            html: `
            <div
        style="max-width: 500px; filter: drop-shadow(0,0,4px,#eaeaea); margin: 0 auto; border: 1px solid #eaeaea; border-radius: 14px;">
        <header
            style="width: 100%; height: 140px; background-color: #F6DA90; border-radius: 14px 14px 0 0;">
            <div style="width: 100%; display: flex; justify-content: center; align-items: center; padding-top: 16px;"><img src="https://res.cloudinary.com/dqpq2d0es/image/upload/v1734960538/simple-logo-nobg_kk50aq.png"
                alt="RollingPaws Logo" style="width: 15%; margin: 0 auto;"></div>
            <p style="font-size: 24px; margin-top: 8px; font-weight: bold; margin-bottom: 0; text-align: center;">RollingPaws</p>
        </header>
        <main style="padding: 16px; background-color: #FFFBF5;">
            <p style="padding: 0 8px">Estimado/a ${username},</p>
            <p style="text-align: justify; padding: 0 16px">¡Gracias por contactarnos! En breve nos estaremos comunicando contigo para darte información acerca de los planes de salud que disponemos y determinar cual es el que mejor se adapta a tí y a tu amigo peludo.</p>

            <p style="text-align: justify; padding: 0 16px">Atentamente, El equipo de RollingPaws</p>

            <div style="width: 100%; display: flex; justify-content: center; align-items: center; margin-bottom: 16px;">
                <a style="margin: 0 auto; background-color: #F37E3B; border: 0; border-radius: 7px; padding: 10px 16px; height: 24px; font-size: 16px; font-weight: 600; text-decoration: none; cursor: pointer; color: #000;"
                    href="http://localhost:5173/">Ir
                    a
                    RollingPaws</a>
            </div>
        </main>
        <footer
            style="display: flex; justify-content: space-between; align-items: center; background-color: #F6DA90; padding: 16px; border-radius: 0 0 14px 14px;">
            <div>
                <p style="margin: 0; font-size: 12px">Clínica veterinaria Rolling Paws</p>
                <p style="margin: 0; font-size: 12px">Calle Falsa 123</p>
                <p style="margin: 0; font-size: 12px">San Miguel de Tucumán, Tucumán, Ar</p>
            </div>
            <div style="margin-left: auto">
                <p style="margin: 0; font-size: 12px">+54 381 4123456</p>
                <p style="margin: 0; font-size: 12px">+54 381 4123456</p>
            </div>
        </footer>
    </div>
            `
        });
    } catch (error) {
        console.log(error)
    }
}

const forgotPasswordTemplateMail = async (username, userEmail, token) => {
    try {
        const info = await transporter.sendMail({
            from: '"RollingPaws" <admin@rollingpaws.com>',
            to: userEmail,
            subject: "Recuperar Contraseña",
            html: `
            <div
        style="max-width: 500px; filter: drop-shadow(0,0,4px,#eaeaea); margin: 0 auto; border: 1px solid #eaeaea; border-radius: 14px;">
        <header
            style="width: 100%; height: 140px; background-color: #F6DA90; border-radius: 14px 14px 0 0;">
            <div style="width: 100%; display: flex; justify-content: center; align-items: center; padding-top: 16px;"><img src="https://res.cloudinary.com/dqpq2d0es/image/upload/v1734960538/simple-logo-nobg_kk50aq.png"
                alt="RollingPaws Logo" style="width: 15%; margin: 0 auto;"></div>
            <p style="font-size: 24px; margin-top: 8px; font-weight: bold; margin-bottom: 0; text-align: center;">RollingPaws</p>
        </header>
        <main style="padding: 16px; background-color: #FFFBF5;">
            <p style="padding: 0 8px">Hola <a style="text-decoration: none; color: #000; font-weight: 500;">${username}</a>,</p>
            <p style="text-align: justify; padding: 0 16px">Recibimos una solicitud para recuperar tu contraseña.</p>

            <div style="width: 100%; display: flex; justify-content: center; align-items: center; margin-bottom: 16px;">
                <a style="margin: 0 auto; background-color: #F37E3B; border: 0; border-radius: 7px; padding: 10px 16px; height: 24px; font-size: 16px; font-weight: 600; text-decoration: none; cursor: pointer; color: #000;"
                    href="http://localhost:5173/forgot-password/${token}">Recuperar Contraseña</a>
            </div>

            <p style="text-align: justify; padding: 0 16px">Si ignoras este mensaje, tu contraseña no cambiará. Si tú no solicitaste este cambio de contraseña, envíanos un email a <a href="mailto:support@rollingpaws.com">support@rollingpaws.com</a></p>

            
        </main>
        <footer
            style="display: flex; justify-content: space-between; align-items: center; background-color: #F6DA90; padding: 16px; border-radius: 0 0 14px 14px;">
            <div>
                <p style="margin: 0; font-size: 12px">Clínica veterinaria Rolling Paws</p>
                <p style="margin: 0; font-size: 12px">Calle Falsa 123</p>
                <p style="margin: 0; font-size: 12px">San Miguel de Tucumán, Tucumán, Ar</p>
            </div>
            <div style="margin-left: auto">
                <p style="margin: 0; font-size: 12px">+54 381 4123456</p>
                <p style="margin: 0; font-size: 12px">+54 381 4123456</p>
            </div>
        </footer>
    </div>
            `
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    welcomeTemplateMail,
    contactTemplateMail,
    forgotPasswordTemplateMail,
    PlansTemplateMail,
}