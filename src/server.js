/*                Requerir los modulos instalados                */
const express = require("express");
const exphbs = require("express-handlebars")
const path = require("path")
const morgan = require("morgan")
const cors = require("cors");
const { extname } = require("path");
const methodOverride = require("method-override")
const flash = require("connect-flash")
const session = require("express-session")
const passport = require("passport")


/*                Inicializaciones                */
const app = express();
require("./config/passport")

/*             Configuraciones del Servidor             */

// Si existe un puerto predefinido por el entorno, pues toma ese; Caso contrario arranca en el 4000
app.set("port", process.env.PORT || 4000)


//Definimos la ubicacion de la carpeta "views", debido a que Nodejs no sabe su ubicacion.
app.set("views", path.join(__dirname, "views") )


//Configuraremos el motor de plantilla "handlebars" y especificaremos que queremos que haga.
app.engine(".hbs", exphbs({
 
  //Especificaremos cual sera el archivo principal/por defecto
  defaultLayout: "main",

 //Especificaremos la direccion de donde estara la carpeta contenedora de "LayOuts"
 layoutsDir: path.join(app.get("views"), "layouts"),

  //Especificaremos la direccion de donde estara la carpeta contenedora de "Partials" 
  partialsDir: path.join(app.get("views"), "partials"),

  //Especificaremos cual sera la extensioon del motor de plantilla "handlebars" 
  extname: ".hbs"
}))

//Utilizaremos el motor de plantilla que hemos configurado arriba.
app.set("view engine", ".hbs")



/*                Middlewares                 */

//Le permite al servidor comprender y enviar objetos JSON
app.use(express.json())

//Le dice al servidor que, cada vez que lleguen datos de un formulario atraves de cualquier tipo de metodo, convierta esos datos en un objeto JSON con el objetivo de poder manipularlo en codigo.
app.use(express.urlencoded({extended: false}))

//Nos permite ver las peticiones que recibe el servidor.
app.use(morgan("dev"))

//Permite conectar el back-end con el front-end
app.use(cors());

//Utilizar el metodo Override
app.use(methodOverride("_method"))

app.use(session({
  secret: "secret",
  resave:true,
  saveUninitialized: true
}))

//Tiene que estar si o si por debajo de "session"
app.use(passport.initialize())
app.use(passport.session())


app.use(flash());


/*                Global Variables                */

//Establecemos esta variable que definimos en "notes.controllers.js" para poder utilizarla en todo el proyecto
app.use((req,res, next) => {

  //Notificaciones al agregar/qutar notas (Ir a partials/messages.hbs)
  res.locals.success_msg = req.flash("success_msg")

  //Notificaciones de error al registrar sesion (Ir a partials/messages.hbs)
  res.locals.error_msg = req.flash("error_msg")

  //Notificaciones de error al iniciar sesion (Ir a partials/errors.hbs)
  res.locals.error = req.flash("error")

  //De esta manera, comprobamos si el usuario ingreso o no sesion (Ir a partials/navegation.hbs)
  res.locals.user = req.user || null;

  next()
})


/*                Routes                */

//Importamos el archivo principal con todas las rutas del servidor
app.use(require("./routes/index.routes"))
app.use(require("./routes/notes.routes"))
app.use(require("./routes/user.routes"))


/*                Archivos Estaticos                */

/*Definimos que carpeta (dentro del back) queremos que sea publica al navegador. 
Aqui irian archivos css,html,js, imagenes, todo lo que el navegador puede acceder para mostrarlo por pantalla y que no cambian.*/
app.use(express.static(path.join(__dirname, "public")));


module.exports = app