const express = require('express');
const app = express();
const port = 3000;

const listViewRouter = require('./list-view-router');
app.use('/tasks', listViewRouter);

const listEditRouter = require('./list-edit-router');
app.use('/tasks', listEditRouter);

const validarMetodosHTTP = require('./validarMetodosHTTP');
app.use(validarMetodosHTTP);

const autenticacion = require('./autenticacionJWT');
app.use('/autentic', autenticacion);

app.use(express.json());

app.listen(port,() => {
  console.log(`el servidor esta escuchando en el puerto ${port}`)
})