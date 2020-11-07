const indexCtrl = {}

//Especificamos las respuestas que pueden darle el Servidor al Navegador

indexCtrl.renderIndex = (req, res)=>{
  res.render("index.hbs")
}

indexCtrl.renderAbout = (req, res)=>{
  res.render("about.hbs")
}

//Exportamos dichas respuestas
module.exports = indexCtrl;