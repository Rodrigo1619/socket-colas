# Aplicación de socket-colas
Aplicacion que simula el flujo de atender tickets mediante colas, por ejemplo las que se ven en los bancos

# Que es el nodemon.json?
Archivo para que no se nos reinicie el servidor cada vez que se genere un ticket, debido a que cada vez que se genera un ticket nuevo
y se guarda en el json que tenemos como un db, nodemon lo detecta y reinicia el servidor, entonces por eso se ha puesto que 
ignore todo el .json que este en la carpeta de db