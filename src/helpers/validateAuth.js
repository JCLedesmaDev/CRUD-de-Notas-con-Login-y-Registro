const helpers = {}

helpers.isAuthenticated = (req, res, next) =>{

  //Aqui dentro realizamos toda la validacion en especifica
  if (req.isAuthenticated()) {

    //Si esta autenticado, que continue
    return next()

  }else{

    req.flash("error_msg", "Debes ingresar sesion previamente para acceder aqui")
    //Caso contrario, que inicie sesion para continuar
    res.redirect("/users/signIn")
  }

}

//exportamos dicho archivo
module.exports = helpers;