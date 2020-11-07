//Requerimos modulo de MongoDB
const mongoose = require("mongoose");

//Requeriremos las variables de entorno del archivo ".env"
const { MONGODB_URI} = process.env;

//Almacenamos en una constante las variable de entorno de nuestra BD que trajimos arriba  
const URI = `${MONGODB_URI}`;


//Configuracion de la BD.
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

//Utilizamos un metodo del modulo mongoose y le damos como parametros la URL y su Configuracion
mongoose.connect(URI, options)
  .then((db) => console.log("El servidor se ha conectado a la base de datos "))
  .catch((err) => console.error(err));

module.exports = mongoose;

