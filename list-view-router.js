const express = require ('express');
const router = express.Router();

const tasks = require('./tasks.json');

const tiposTareas = ['completed', 'incomplete']

function validarParametros (req, res, next) {
    const filter = req.params.filter;

    if(!tiposTareas.includes(filter)) {
        return res.status(401).send("Faltan parametros")
    }
    console.log( "Entro aquí");
    next();
}

router.get('/:filter', validarParametros, (req, res) => {
    const filter = req.params.filter;
    const completedTask = tasks.filter((task) => task.completed === true);
    const incompleteTask = tasks.filter((task) => task.completed === false);

    if (filter === 'completed') {   
        res.status(200).send(completedTask)
    } else if (filter === 'incomplete') {
        res.status(200).send(incompleteTask)
    } else {
        res.status(400).send("No valid")
    }
});

module.exports = router;