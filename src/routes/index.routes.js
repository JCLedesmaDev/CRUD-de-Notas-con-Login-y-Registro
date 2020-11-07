const {Router} = require("express")
const router = Router();

//Requerimos el archivo con las respuestas
const indexCtrl = require("../controllers/index.controllers")

//Especificamos a cada RUTA, una respuesta.
router.get("/",indexCtrl.renderIndex)

router.get("/about", indexCtrl.renderAbout)












module.exports = router;