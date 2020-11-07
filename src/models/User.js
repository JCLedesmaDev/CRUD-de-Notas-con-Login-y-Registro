const { Schema, model } =  require("mongoose")
const bcrypt = require("bcryptjs")

//Definimos el esquema de datos que tendran nuestros usuarios para registrarse
const UserSchema = new Schema({
  name:{ type: String , required: true, unique: false },
  email: { type: String , required: true, unique: true},
  password: { type: String, required: true},
}, {

  //Añade por defecto el tiempo que transcurrio desde su creacion y cuando fue editado por ultima vez
  timestamps: true
});

/* Debido a que es inseguro guardar las contraseñas en las base de datos. Lo que haremos a continuacion sera utilizar un metodo de Mongoose llamado "encrypPassword" que nos permite cifrar y encriptar las contraseñas (hacerlas mas seguras)
*/

UserSchema.methods.encryptPassword = async (password) =>{

 /* Para poder hacer esto, vamos a tener que utilizar un modulo que instalamos anteriormente, llamado "bcryptjs" 

 Dentro de "Bcrypt, vamos a utilizar un metodo llamado "Hash" el cual nos permitira criptar las contraseñas. El incoveniente de esto, es que nos pide 2 parametros:
 1) El string a criptar (el password)
 2) El Salt es el parametro que va a ejecutar un algmoritmo para que nuestra contraseña sea mas o menos segura.
 Para generar un Salt, tenemos que utilizar anteriormente un metodo llamado "genSalt" para indicarle la cantidad de veces que queremos que el algoritmo se ejecute y luego darle dicho Salt como parametro al metodo "Hash"
 */

  const salt = await bcrypt.genSalt(15)
  return  await bcrypt.hash(password, salt)

  /* Esto nos devuelve en si, la misma contraseña pero ya esta cifrada con unas series de caracteres que es imposible de entender sin que sepamos que algoritmo fue utilizado */
};


/* Cuaando el usuario quiera loguearse, vamos a tener que comparar las contraseñas, es decir: La contraseña que tenemos en la BD con la que el esta ingresando.
Para ello, vamos a tener que cifrar la contraseña que el usuario ingreso y compararla con la contraseña cifrada que tenemos en la BD
*/

UserSchema.methods.matchPassword = async function(password){
  //PD: Utilizamos una funcion anonima, debido a su uso con el this.

  return await bcrypt.compare(password, this.password)

  //Este metodo tomara una contraseña y comparara el cifrado con la contraseña de la BD. En caso de ser verdadero, nos devolvera "true", caso contrario un "false"
};



module.exports = model("User", UserSchema)