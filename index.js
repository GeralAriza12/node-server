const express = require('express');
const app = express();

const tasks = [
    {
        "id": "1",
        "isCompleted": false,
        "description": "Walk the dog"
    },
    {
        "id": "2",
        "isCompleted": true,
        "description": "Buy groceries"
    },
    {
        "id": "3",
        "isCompleted": false,
        "description": "bathe the dog"
    },
    {
        "id": "4",
        "isCompleted": false,
        "description": "bathe the dog"
    }
];


app.get("/", (req, res) => {
    res.json(tasks);
});

app.listen(3000, () => {
    console.log("El servidor está escuchando en el puerto 3000");
});