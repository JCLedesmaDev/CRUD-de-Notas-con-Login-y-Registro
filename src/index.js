//Nos permite utilizar las variables de entorno
// require("dotenv").config()
require("dotenv").config({path: ".env"})

//Importamos la carpeta que contiene el server
const app = require("./server")

//Conectamos la base de datos con el servidor
const mongoose = require("./database")

/*                Inicializacion de servidor                 */
app.listen(app.get("port"), () => {
  console.log(`El servidor se ha iniciado en el puerto ${app.get("port")}`);
});
