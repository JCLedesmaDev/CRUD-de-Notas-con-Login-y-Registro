const { Router} = require("express")
const router = Router()
const usersCtrl = require("../controllers/user.controllers")

//Formulario para registrar sesion/usuario
router.get("/users/signUp", usersCtrl.renderSignUpForm)

//Registrar sesion/usuario
router.post("/users/signUp", usersCtrl.signup)

//Formulario para iniciar sesion
router.get("/users/signIn", usersCtrl.renderSignInForm)

//Iniciar Sesion
router.post("/users/signIn", usersCtrl.signin)

//Cerrar sesion
router.get("/users/logOut", usersCtrl.logOut)


module.exports = router;