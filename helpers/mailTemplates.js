const transporter = require("./nodemailer.config.js");
const jwt = require("jsonwebtoken");

export const mailBienvenida = async (email, username) => {
  const info = await transporter.sendMail({
    from: '"RollingPuppies Team" <noreply@rollingPuppies.com>',
    to: email,
    subject: "Bienvenido a la comunidad Rolling Puppies",
    html: "" /* MAIL TEMPLATE HERE */,
  });
};
