const User = require("../models/User")
const passport = require("passport")

const usersCtrl = {}

usersCtrl.renderSignUpForm = (req, res) =>{

  /*
  Dentro de la carpeta "Views"/"Users", crearemos un archivo llamado "signUp". 
  Para que cuando el usuario mande una peticion a una URL en especifica, le podamos mostrar el contenido que tendra el archivo "signUp", que en este caso sera un Formulario para registrar sesion 
 */
  res.render("users/signUp")

}

//Aca guardaremos toda la logica de registrar un Usuario
usersCtrl.signup = async (req, res) =>{

  //Extraemos todos los valores que tiene el formulario
  const{ name, email, password, confirm_password } = req.body

  //Aqui almacenaremos todos los posibles mensajes que nos dara el navegador a la hora de validar 
  const errors = [];
  //PD: Vamos a crear un archivo "errors" dentro de la carpeta "partials"

  /***************** COMENZAMOS VALIDACIONES *****************/

  //Validamos si el EMAIL del usuario existe
  const emailUser = await User.findOne({email : email})

  if (emailUser) {
    req.flash("error_msg", "El correo ya esta en uso")
    res.redirect("/users/signUp")
  }

  //Generamos las validaciones para que la contraseña sea correcta
  if (password !== confirm_password ) {
    
    //En caso de que las contraseñas no coincidan, vamos a enviarle un error al cliente por pantalla
    errors.push({text: "La contraseña no coincide. / Password do not match."})
  }

  if (password.length < 7 ) {
    errors.push({text: "La contraseña debe estar compuesta al menos por 7 caracteres. / Passwords must be at least 7 characters."})
  }

  if (errors.length > 0) {
    
    //En caso de que exista un error, vamos a ir de nuevo a la pagina "signUp" para poder mostrar los errores generados
    res.render("users/signUp", {errors, name, email, password})
  
  }else{

    //En caso de que  no exista ningun error, vamos a guardar el usuario en la BD, para ello requerimos su modulo

    const newUser = new User({name: name, email: email, password: password})

    //De esta manera, encriptamos  la contraseña q nos dio el usuario
    newUser.password = await newUser.encryptPassword(password)

    //Y guardamos el nuevo usuario con la contraseña ya encriptada en la BD
    await newUser.save()

    req.flash("success_msg", "Registrado Correctamente")
    res.redirect("/users/signIn")
    
  }

}




usersCtrl.renderSignInForm = (req, res) =>{

  /*
  Dentro de la carpeta "Views"/"Users", crearemos un archivo llamado "signIn". 
  Para que cuando el usuario mande una peticion a una URL en especifica, le podamos mostrar el contenido que tendra el archivo "signIn", que en este caso sera un Formulario para iniciar sesion 
 */
  res.render("users/signIn") 
}



//Aca utilizaremos lo que hemos hecho en el archivo "passport.js"
usersCtrl.signin = passport.authenticate("local",{

  //Cuando exista un error, vamos a utilizar "flash" para notificar el error
  failureFlash: true,
  
  //Cuando la autentificacion de un error, nos va a redireccionar a:
  failureRedirect: "/users/signIn",

  //Cuando salga todo bien, nos va a redireccionar a:
  successRedirect: "/notes"

})

usersCtrl.logOut = (req, res) =>{
  //Con esta funcion, podremos cerrar la sesion

  req.logout();
  req.flash("success_msg", "Has cerrado sesion correctamente")
  res.redirect("/users/signIn")

}


module.exports = usersCtrl
