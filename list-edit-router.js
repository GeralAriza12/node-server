const express = require('express');
const router = express.Router();

router.use(express.json())

const tasks = require('./tasks.json');

function validacion (req, res, next) {
    const { task, description, completed } = req.body;
    if (!task) {
        return res.status(400).send("El cuerpo de la tarea esta vacio");
    } else if (!description) {
        return res.status(400).send("El cuerpo de la descripción esta vacio");
    } else if (req.method === 'PUT' && !completed) {
        return res.status(400).send("El cuerpo contiene información no valida, atributos faltantes para crear las tareas")
    }
    next()
}

router.post('/crear', validacion, (req, res) => {
    const { task, description } = req.body;
    tasks.push({
        id: tasks.length + 1,
        task,
        description,
        completed: false,
    });
    res.json({ message: 'Tarea creada satisfactoriamente' });
})

router.get('/list/:id', (req, res) => {
    const id = req.params.id
    const tarea = tasks.find( tarea => tarea.id == id)

    if (tarea) {
        res.status(200).send(tarea)
    } else {
        res.status(404).json({ message: "No tienes tareas"})
    }
})

router.get('/list', (req, res) => {
    if(tasks.length === 0){
        res.status(400).json({ message: "Aún no tienes tareas"})
    } else {
        res.send(tasks)
    }
})

router.delete('/eliminar/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      res.json({ message: 'Tarea eliminada satisfactoriamente' });
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
})

router.put('/actualiza/:id', validacion, (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
        const { task, description, completed } = req.body;
        tasks[taskIndex] = {
        id: taskId,
        task: task || tasks[taskIndex].task,
        description: description || tasks[taskIndex].description,
        completed: completed || tasks[taskIndex].completed,
        };
        res.json({ message: 'Tarea actualizada con exito' });
    } else {
        res.status(404).send("Tarea no encontrada");
    }
})

module.exports = router;