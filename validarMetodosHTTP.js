const metodosPermitidos = [ "GET", "POST", "DELETE", "PUT" ]

module.exports = function methodHTTP (req, res, next) {
    const metodo = req.method.toUpperCase();
    if (metodosPermitidos.includes(metodo)) {
        next();
    } else {
        res.status(400).send("Método HTTP no válido");
    }
}