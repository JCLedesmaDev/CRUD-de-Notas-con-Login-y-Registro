//Dentro de este archivo, guardaremos toda la logica de validazacion para ingresar un Usuario. 

//Requerimos los modulos que vamos a utilizar y el modelo de datos que componer a un Usuario
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User")


passport.use( new LocalStrategy({

  /* DEFINIMOS QUE ES LO QUE VAMOS A RECIBIR COMO NOMBRE Y CONTRASEÑA (Para iniciar sesion)
  En este caso, para autenticar sesion, vamos a recibir los campos q tienen el atributo name="email" y name="password" q tenemos en el archivo "signIn" */
 
 usernameField: "email",
 passwordField: "password"

},

  /*
  Luego de haber recibido los datos de arriba. Vamos a utlizar una "Arrows Function" para comparar los datos recibidos con los datos que tenemos almacenados en la BD de nuestro servidor (Cuyos datos almacenamos con el metodo "signup" que se encuentra en "user.controllers.js")
  */

  async (email, password, done ) => {
    
    /* 
    Vamos a buscar si dentro de nuestra Base de Datos (por medio del modelo de datos User que requerimos arriba), existe el email que recibimos como parametro en valor en el formulario de "iniciar sesion". 
    Para luego utilizar una condicional en la que si nos devuelve un "true" o "false", se ejecute alguna secuencia de codigo en especifico.
    */ 
   
    /* ************* VERIFICACION DEL EMAIL: ************* */
    const user = await User.findOne({email})
    if (!user) {
      
      return done(null, false, { message: "No existe este usuario"})

    }else{

      /* Como la verificacion del EMAIL no dio ningun error, continuamos con la verificacion de la contraseña.
      En donde utilizaremos un metodo llamado "matchPassword" que tenemos dentro del archivo "User.js" para comparar las contraseñas*/

      const match = await user.matchPassword(password)
      if (match) {

        //En caso de coincidir, nos retornara el usuario.
        return done(null, user)

      }else{ 
        //Caso contrario, nos retornara un mensaje de error
        return done(null, false, { message: "Contraseña incorrecta"})

      }
    }
  }
))

//Para guardar el Usuario que "passport" nos retorno, debemos utilziar un metodo llamado  "serializeUser" con el objetivo de que "Passport" nos guarde dicho usuario en la "session" del modulo que instalamos anteriormente (npm i express-session). 

//Este metodo recibe el usuario o una callback´s "done" 
passport.serializeUser((user, done)=>{
  done(null,user.id)
})

//Para cuando queramos navegar por nuestra pagina, vamos a tener que utilizar un metodo llamado "desarializeUser". El cual, por medio de una consulta a la BD, nos mantiene nuestra sesion iniciada a partir del ID que hemos guardado arriba. 
passport.deserializeUser((id, done) =>{

  User.findById(id, (err,user) =>{
    done(err,user)
  })

})


/*
PD: A "passport.use( new LocalStrategy({", le podriamos dar un nombre en especifico si escribieramos por ejemplo: "passport.use("login", new LocalStrategy({"
Por lo que luego dentro de "usersCtrl.signin = passport.authenticate("local",{", escribimos:
"usersCtrl.signin = passport.authenticate("login",{"
*/


//Debemos integrar este archivo con el servidor "server.js"