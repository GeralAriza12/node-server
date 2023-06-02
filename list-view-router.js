const express = require ('express');
const router = express.Router();

const tasks = require('./tasks.json');

router.get('/completed', (req, res) => {
    const completedTask = tasks.filter((task) => task.completed === true)
    
    if (completedTask) {
        res.send(completedTask)
    }else {
        res.send("No has completado nunguna tarea")
    }
});

router.get('/incomplete', (req, res) => {
    const incompleteTask = tasks.filter((task) => task.completed === false)
    res.send(incompleteTask)
})

module.exports = router;