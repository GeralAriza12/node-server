const readline = require('readline');

const crear = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tasks = [];

async function addTask(task) {
  await new Promise(resolve => {
    tasks.push(task);
    resolve();
  });
  console.log(`Tarea añadida: ${task}`);
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
  console.log(`Se completo la tarea: ${tasks.description}`);
}

function printTasks() {
  console.log('Lista de tareas:');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. [${task.completed ? 'Completada' : 'Aun no está completada'}] ${task.description}`);
  });
}

async function handleInput(input) {
  try {
    const [command, ...args] = input.split(' ');
    switch (command) {
      case 'add':
        await addTask({
          id: tasks.length + 1,
          description: args.join(' '),
          completed: false
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

console.log('Bienvenido a la lista de tareas\n');
console.log('Comandos disponibles:');
console.log('- add [descripción]: Añade una tarea');
console.log('- delete [número]: Elimina una tarea');
console.log('- complete [número]: Marca una tarea como completada');
console.log('- list: Muestra la lista de tareas');
console.log('- exit: Sale de la aplicación\n');
crear.prompt();
