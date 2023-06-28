const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

const tasks = require('./tasks.json');

app.get('/', (req, res) => {
    res.status(201).send({
        menssage: "Bienvenido a tu lista de tareas",
        tasks: tasks 
    });
})

app.post('/crear', (req, res) => {
    const { task, description } = req.body;
    if (!task || !description) {
        res.status(401).send({
            menssage: "Campos requeridos no completados",
            tasks: null
        });
    } else {
        tasks.push({
            id: tasks.length +1,
            task,
            description,
            completed: false
        });
        res.status(201).send({
            menssage: "Tarea creada satisfactoriamente",
            tasks: tasks 
        });
    }
})

app.put('/actualizar/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
        const { task, description, completed } = req.body;
        tasks[taskIndex] = {
            id: taskId,
            task: task || tasks[taskIndex].task,
            description: description || tasks[taskIndex].description,
            completed: completed || tasks[taskIndex].completed
        };
        res.status(200).send({
            menssage: "Tarea actualizada satisfactoriamente",
            tasks: tasks
        });
    } else {
        res.status(404).send({
            menssage: "Tarea no encontrada",
            tasks: null
        });
    }
})

app.delete('/eliminar/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(201).send({
            menssage: "Tarea eliminada, te quedan estas tareas",
            tasks: tasks
        });
    } else {
        res.status(404).send({
            menssage: "Tarea no encontrada",
            tasks: null
        });
    }
})

app.get('/list', (req, res) => {
    if (tasks.length == 0) {
        res.status(401).send({
            menssage: "Aún no tienes tareas",
            tasks: null
        });
    } else {
        res.status(200).send({
            menssage: "Tienes estas tareas",
            tasks: tasks
        });
    }
})

app.get('/:filter', (req, res) => {
    const filter = req.params.filter;
    const completed = tasks.filter((task) => task.completed === true);
    const incomplete = tasks.filter((task) => task.completed === false);
    if (tasks.length === 0){
        res.status(404).send({
            menssage: "Aún no tienes tareas para mostrar o aún no completas tareas",
            tasks: null
        });
    }
    if (filter === 'completed') {
        res.status(200).send({
            menssage: "Estas son la tareas que has completado",
            tasks: completed
        }); 
    } else if (filter === 'incomplete') {
        res.status(200).send({
            menssage: "Estas son las tareas que aún no completas",
            tasks: incomplete
        });
    } else {
        res.status(404).send({
            menssage: "Error interno, intente nuevamente",
            tasks: null
        });
    }
})

app.get('/list/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.find((task) => task.id === taskId);
    if (taskIndex) {
        res.status(200).send({
            menssage: "Está es la tarea solicitada",
            tasks: taskIndex
        });
    } else {
        res.status(404).send({
            menssage: "Tarea no encontrada, intente nuevamente",
            tasks: null
        });
    }
})

app.listen(port, () => {
    console.log(`Servidor en el puerto: ${port}`);
})