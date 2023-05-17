const express = require('express');
const app = express();

const tasks = [
    {
        "id": "123456",
        "isCompleted": false,
        "description": "Walk the dog"
    },
    {
        "id": "789012",
        "isCompleted": true,
        "description": "Buy groceries"
    },
    {
        "id": "345678",
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

