// Rutas para pokemon
const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemon");
const multipart = require("connect-multiparty");
const md_upload = multipart({ uploadDir: "./upload/pokemon"});

// api/pokemons
router.post("/", pokemonController.createPokemon);
router.get("/:last?", pokemonController.getPokemons);
router.get("/:id", pokemonController.getPokemon);
router.put("/:id", pokemonController.updatePokemon);
router.delete("/:id", pokemonController.deletePokemon);
router.post("/upload/:id", md_upload, pokemonController.uploadPokemon);
router.get("/pokeimg/:poke", pokemonController.getImage);
router.get("/:search", pokemonController.filterPokemon);

module.exports = router;
