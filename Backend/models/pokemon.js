const mongoose = require("mongoose");
const PokemonSchema = mongoose.Schema({
    number: { type: Number, default:null },
    name: { type: String, default:null },
    species: { type: String, default:null },
    types: { type: Array, default:[] },
    image: { type: String, default: null },
    abilities: {
        normal: { type: Array, default:[] },
        hidden: { type: Array, default:[] }
    },
    height: { type: String, default:null },
    weight: { type: String, default:null },
    family: {
        id: { type: Number, default:null },
        evolutionStage: { type: Number, default:null },
        evolutionLine: { type: Array, default:[] }
      },
    starter: { type: Boolean, default:false },
    legendary: { type: Boolean, default:false },
    mythical: { type: Boolean, default:false },
    ultraBeast: { type: Boolean, default:false },
    mega: { type: Boolean, default:false },
    description: { type: String, default:null }
});

module.exports = mongoose.model("Pokemon", PokemonSchema)