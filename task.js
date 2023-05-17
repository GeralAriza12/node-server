const readline = require('readline');

const crear = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const express = require('express');
const app = express();
const port = 3000;

const tasks = [];

async function addTask() {
  return new Promise((resolve) => {
    crear.question('Enter task name: ', (task) => {
      crear.question('Enter task description: ', (description) => {
        console.log(`Tarea añadida: ${task}, descripción añadida: ${description}`);
        tasks.push({
          id: tasks.length + 1, 
          task, 
          description, 
          completed: false});
        resolve();
      });
    });
  });
}

async function deleteTask(index) {
  await new Promise(resolve => {
    const task = tasks.splice(index, 1)[0];
    resolve();
  });
  console.log(`Se elimino: ${tasks}`);
}

async function completeTask(index) {
  await new Promise(resolve => {
    const task = tasks[index];
    task.completed = true;
    resolve();
  });
  console.log(`Se completo la tarea: ${index + 1}`);
}

function printTasks() {
  console.log('Lista de tareas:');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.task}, ${task.description} [${task.completed ? 'Completado' : 'Pendiente'}] `);
  });
}

async function handleInput(input) {
  try {
    const [command, ...args] = input.split(' ');
    switch (command) {
      case 'add':
        await addTask({
          task: args.join(' ')
        });
        break;
      case 'delete':
        await deleteTask(parseInt(args[0]) - 1);
        break;
      case 'complete':
        await completeTask(parseInt(args[0]) - 1);
        break;
      case 'list':
        printTasks();
        break;
      default:
        console.log(`Comando no encontrado: ${command}`);
    }
  } catch (error) {
    console.error(error);
  }
  crear.prompt();
}

crear.on('line', handleInput);

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

console.log('Bienvenido a la lista de tareas');
console.log('Comandos disponibles:');
console.log('- add [enter]: Añade una tarea');
console.log('- delete [número]: Elimina una tarea');
console.log('- complete [número]: Marca una tarea como completada');
console.log('- list: Muestra la lista de tareas');
console.log('- exit: Sale de la aplicación');
crear.prompt();
