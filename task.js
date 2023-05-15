const readline = require('readline');

const crear = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tasks = [];

function addTask(task) {
  tasks.push(task);
  console.log(`Tarea añadida: ${task}`);
}

function deleteTask(index) {
  const task = tasks.splice(index, 1)[0];
  console.log(`Se elimino: ${task}`);
}

function completeTask(index) {
  const task = tasks[index];
  task.completed = true;
  console.log(`Se completo la tarea: ${task.description}`);
}

function printTasks() {
  console.log('Lista de tareas:');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. [${task.completed ? 'Completada' : 'Aun no está completada'}] ${task.description}`);
  });
}

function handleInput(input) {
  const [command, ...args] = input.split(' ');
  switch (command) {
    case 'add':
      addTask({
        id: tasks.length + 1,
        description: args.join(' '),
        completed: false
      });
      break;
    case 'delete':
      deleteTask(parseInt(args[0]) - 1);
      break;
    case 'complete':
      completeTask(parseInt(args[0]) - 1);
      break;
    case 'list':
      printTasks();
      break;
    default:
      console.log(`Comando no encontrado: ${command}`);
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

