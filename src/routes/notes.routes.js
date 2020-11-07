const {Router} = require("express");
const router = Router();

const NotesCtrl = require("../controllers/notes.controllers");
const validateAuth = require("../helpers/validateAuth")

//Form para crear nota
router.get("/notes/add", validateAuth.isAuthenticated, NotesCtrl.renderNoteForm)
 
//Nueva Nota
router.post("/notes/new-note", validateAuth.isAuthenticated, NotesCtrl.createNewNotes)

//Obtener todas las notas
router.get("/notes", validateAuth.isAuthenticated, NotesCtrl.renderNotes)

//Obtener nota en especifica
router.get("/notes/edit/:id", validateAuth.isAuthenticated, NotesCtrl.renderEditForm)

//Actualziar nota en especifica obtenida
router.put("/notes/edit/:id", validateAuth.isAuthenticated, NotesCtrl.updateNote)

//Eliminar notas
router.delete("/notes/delete/:id", validateAuth.isAuthenticated, NotesCtrl.deleteNotes)



module.exports = router;