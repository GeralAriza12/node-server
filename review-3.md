#¿Qué es mi producto y para que sirve?

    Mi producto está desarrollado en un API que mediante URLs creo un servidor que se ejecuta a traves de peticiones HTTP proporciona funcionalidades dependiendo la solicitud que realice el cliente por medio de diferentes rutas por ejemplo:

        - Con el metodo POST en la ruta /crear creamos y agregamos una tarea con su descripción a la lista de tareas
        - Con el metodo DELETE en la ruta /eliminar/:id eliminar una tarea usando el id correspondiente que asigno para esa tarea
        - Con GET podemos mostrar y enumerar todas las tareas o una tarea en especifico
        - Con el metodo Put actualizamos la tarea usando el id


#¿Cuáles son las funcionalidades más importantes y porque los usuarios las usarían?

    Las funcionalidades más importantes son: crear tareas, eliminar tareas y actualizar la tarea; esto le permitira al cliente realizar un seguimiento de sus tareas

    Otras funcionalidades que tiene el producto es mostrar toda las tareas que tienes o una tarea en especifica que el cliente este buscando, asimismo permite el filtro de las tareas que estan completas o incompletas dando una mayor eficiencia al dar todas las osibles respuestas que el cliente espera.

#¿Beneficion de mi producto?

    - Utiliza el metodo CRUD que son las operaciónes basicas de administración esto le da confianza al cliente de usarla
    - Al usar rutas dentro del API REST ódemos identificar y mantener independientes los recursos y acceso de los mismos.