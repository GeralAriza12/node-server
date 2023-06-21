#¿Qué es mi producto y para que sirve?

    Es un servidor web que su funcion es responder a solicitudes con recursos web, este producto funciona por medio de instancias de express que es una libreria que crea un servidor por el cual nosotros enviamos nuestro producto para ser usado por el cliente.
    En esta version del producto entregamos dos rutas más las cuales nos muestran las tareas que estan completas y las que aun el cliente no completa, esto para filtrar e identificar mas rapido que ya se hizo y que falta hacer ayudando al cliente a tener un mayor control en su dia.

#¿Cuáles son las funcionalidades más importantes y porque los usuarios las usarían?

    Funciona por medio de rutas en el servidor con pathparam, header y body haciendo que el cliente envie una solicitud al servidor (nuestro progtrama) el servidor consulta lo pedido y devuelve una respuesta sea positiva o negativa de acuerdo a lo solicitado por el cliente.
    Los tipos de solicitudes que el cliente puede hacer son:
        - GET    --->   LEER
        - POST   --->   CREAR - ENVIAR
        - PUT    --->   ACTUALIZAR
        - DELETE --->   ELIMINAR
    Este producto tambien usa middelwares ya que es un mediador que brinda funciones que pueden realizar varias tareas, esto le da una mayor eficiencia al producto y funcionalidad para el lado del cliente.