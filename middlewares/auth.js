const jwt = require("jsonwebtoken");

module.exports = (rol) => (req, res, next) => {
    try {
        const token = req.headers.authtoken;

        if (!token) {
            return res.status(400).json({ message: "Token incorrecto" });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if (verifyToken.role === "user" && verifyToken.role === "user") {
            next()
        } else if (verifyToken.role === "admin") {
            next();
        } else {
            res.status(401).json({ message: "No autorizado" })
        }
    } catch (error) {
        console.log(error);
        return {
            message: "Algo salio mal durante la autorización del usuario",
            statusCode: 500,
        }
    }
}