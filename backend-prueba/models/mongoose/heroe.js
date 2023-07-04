const mongoose = require("mongoose");

// Definir el esquema del héroe
const SuperheroSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  casa_editorial: {
    type: String,
    required: true,
  },
  creador_alter_ego: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
  },
});

// Crear y exportar el modelo basado en el esquema
const Superhero = mongoose.model("Superhero", SuperheroSchema);
module.exports = Superhero;
