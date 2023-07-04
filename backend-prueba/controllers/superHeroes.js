const Hero = require("../models/mongoose/heroe");

const createHero = async (req, res) => {
  try {
    const { nombre, casa_editorial, creador_alter_ego, descripcion, imagen } = req.body;
    const existingSuperhero = await Hero.findOne({ nombre });
    if (existingSuperhero) {
      return res.status(201).json({
        success: false,
        message: "Este SuperHéroe ya existe",
      });
    }
    const superhero = await Hero.create({
      nombre,
      casa_editorial,
      creador_alter_ego,
      descripcion,
      imagen,
    });
    res.status(201).json({
      success: true,
      message: "Creado correctamente",
      data: superhero,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Hubo un error con la creación del superHéroe",
      error: error.message,
    });
  }
};

const getHeroes = async (req, res) => {
  try {
    const superheroes = await Hero.find();
    res.status(200).json({ superheroes });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error al obtener los superHeroes",
      error,
    });
  }
};

const deleteHero = async (req, res) => {
  try {
    const superheroId = req.params.id;
    const superhero = await Hero.findByIdAndDelete(superheroId);
    if (!superhero) {
      return res.status(404).json({
        success: false,
        message: "Superhéroe no encontrado",
      });
    }
    res.status(200).json({
      success: true,
      message: "Superhéroe borrado exitosamente",
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Hubo un error al eliminar el Heroe",
      error,
    });
  }
};

const updateHero = async (req, res) => {
  try {
    const superheroId = req.params.id;
    const { nombre, casa_editorial, creador_alter_ego, descripcion, imagen } = req.body;
    const existingHero = await Hero.findOne({ nombre });
    if (existingHero && existingHero._id != superheroId) {
      return res.status(201).json({
        success: false,
        message: "El nombre del héroe ya existe. Por favor, elija otro nombre.",
      });
    }

    const superhero = await Hero.findByIdAndUpdate(
      superheroId,
      { nombre, casa_editorial, creador_alter_ego, descripcion, imagen },
      { new: true }
    );
    if (!superhero) {
      return res.status(500).json({
        success: false,
        message: "Hubo un error al encontrar el héroe.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Actualizado correctamente",
      superhero,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error al actualizar el héroe.",
      error,
    });
  }
};

const getHeroById = async (req, res) => {
  try {
    const id = req.params.id;
    const superhero = await Hero.findById(id);
    if (!superhero) {
      return res.status(404).json({ error: "Superhéroe no encontrado" });
    }
    res.status(200).json({ superhero });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error al encontrar el heroe",
      error,
    });
  }
};

const searchHero = async (req, res) => {
  try {
    const searchQuery = req.query.search;
    if (!searchQuery) {
      return res.status(400).json({ error: "Debes proporcionar un término de búsqueda" });
    }
    const filteredHeroes = await Hero.find({
      $or: [
        { nombre: { $regex: searchQuery, $options: "i" } },
        { casa_editorial: { $regex: searchQuery, $options: "i" } },
        { creador_alter_ego: { $regex: searchQuery, $options: "i" } },
      ],
    });
    res.status(201).json(filteredHeroes);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Hubo un error al encontrar el heroe",
      error,
    });
  }
};

module.exports = {
  createHero,
  getHeroes,
  deleteHero,
  updateHero,
  getHeroById,
  searchHero,
};
