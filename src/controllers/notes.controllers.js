//Importamos el modelo de datos de las notas, para que podamos guardar, editar y eliminar
const Note = require("../models/Note")


const notesCtrl = {}


notesCtrl.renderNoteForm = (req,res) =>{
  //Aqui vamos a renderizar un archivo creado en la carpeta "Views" con el formulario
  res.render("notes/new-note")
  
}

notesCtrl.createNewNotes = async (req, res) =>{

  //Descontruimos el "req.body" y almacenamos cada dato que tenga en una variable
  const { title, description} = req.body

  //Almacenamos en una const "title" el title que obtenemos del "req.body". Por ej: "title: title, description: description"
  //Al poseer el mismo nombre la variable de lo que se almacena, podemos solamente escribir 1 vez el nombre.
  const newNote = new Note({ title, description})

  //Le agregamos el ID del usuario en especifico que escribio esta nota
  newNote.user = req.user.id;

  //De esta manera, guardamos dicho objeto en MongoDB
  await newNote.save();

  //Y nos aparece el mensaje de alerta.
  req.flash("success_msg", "Nota agregada correctamente");

  //Nos mandara de nuevo, a la pagina q contiene todas las notas
  res.redirect("/notes")
}

notesCtrl.renderNotes = async (req,res)=>{
  //Buscamos todas las notas que tenemos en la BD por medio de la ID del usuario que tiene abierta la sesion.
  const notes = await Note.find({
    user: req.user.id
  }).lean().sort({
    //Ordenamos dichas notas de manera descendiente
    createAt: 'desc'
  })

  //Renderizamos una vista y a su vez, le mandamos para que lo muestre en pantalla, todas las notas que almacenamos en la const "notes"
  res.render("notes/all-notes", {notes})
  
}

notesCtrl.renderEditForm = async (req, res) =>{

  //Buscamos en la base de datos, una nota por medio de su ID, la almacenamos y se la damos a la pagina para que la renderice
  const note = await Note.findById(req.params.id).lean()

  //Validacion para que el usuario solamente pueda editar la nota que tenga su mismo "user.id"
  if (note.user !== req.user.id) {

    req.flash("error_msg", "Nota no autorizada")
    return res.redirect("/notes")

  } else{
    
    /*Caso contrario, de que si tenga el mismo "id".  Podra acceder a editar la nota y aqui dentro crearemos un formulario, el cual contendra los datos de la nota en especifico.*/
  
    res.render("notes/edit-notes", {note})
  }

}

notesCtrl.updateNote = async (req, res)=>{

  //Destructuramos el req.body, ya que solo queremos el titulo y su descripcion
  const {title, description} = req.body

  req.flash("success_msg", "Nota actualizada correctamente");

  //Le damos los nuevos datos
  await Note.findByIdAndUpdate(req.params.id, {title, description}).lean()
  res.redirect("/notes")
}

notesCtrl.deleteNotes = async (req, res)=>{ 
  await Note.findByIdAndDelete(req.params.id)

  req.flash("success_msg", "Nota eliminada correctamente");
  
  //De esta manera, cuando eliminamos un usuario, nos redirecciona a la ruta en donde estan todas las notas guardadas.
  res.redirect("/notes")

}

module.exports = notesCtrl;