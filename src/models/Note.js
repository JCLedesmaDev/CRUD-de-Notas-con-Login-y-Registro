const { Schema, model } =  require("mongoose")

//Definimos el esquema de datos que tendran nuestras Notas
const NoteSchema = new Schema({
  title: {
    type: String, 
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  }
}, {

  //Añade por defecto el tiempo que transcurrio desde su creacion y cuando fue editado por ultima vez
  timestamps: true
})

module.exports = model("Note", NoteSchema)