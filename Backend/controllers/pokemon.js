const pokemon = require("../models/pokemon");
const Pokemon = require("../models/pokemon");
const fs = require("fs");
const path = require("path");

exports.createPokemon = async(req, res) =>{
    try {
        let newPokemon = new Pokemon(req.body);

        await newPokemon.save();
        res.status(200).send(newPokemon);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }
}

exports.getPokemons = async(req, res) => {
    let last = req.params.last;

    try {
        let pokemons;

        if(last || last != undefined){
            pokemons = await Pokemon.find().sort("_id").limit(parseInt(last))
        }
        pokemons = await Pokemon.find().sort("_id");
        res.status(200).json(pokemons);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }
}

exports.updatePokemon = async(req, res) => {
    const params = req.body;

    try {
        let pokemonToUpdate = await Pokemon.findById(req.params.id);

        if(!pokemonToUpdate){
            res.status(404).json({msg: "No se ha encontrado informacion sobre este pokemon"});
        }

        pokemonToUpdate.number = params.number != undefined ? params.number : pokemonToUpdate.number;
        pokemonToUpdate.name = params.name != undefined ? params.name : pokemonToUpdate.name;
        pokemonToUpdate.species = params.species != undefined ? params.species : pokemonToUpdate.species;
        pokemonToUpdate.types = params.types != undefined ? JSON.parse(params.types) : pokemonToUpdate.types;
        pokemonToUpdate.image = params.image != undefined ? params.image : pokemonToUpdate.image;
        if(params.abilities != undefined){
            pokemonToUpdate.abilities.normal = JSON.parse(params.abilities.normal) != [] ? JSON.parse(params.abilities.normal) : pokemonToUpdate.abilities.normal;
            pokemonToUpdate.abilities.hidden = JSON.parse(params.abilities.hidden) != [] ? JSON.parse(params.abilities.hidden) : pokemonToUpdate.abilities.hidden;
        }
        pokemonToUpdate.height = params.height != undefined ? params.height : pokemonToUpdate.height;
        pokemonToUpdate.weight = params.weight != undefined ? params.weight : pokemonToUpdate.weight;
        if(params.family != undefined){
            pokemonToUpdate.family.id = params.family.id != undefined ? params.family.id : pokemonToUpdate.family.id;
            pokemonToUpdate.family.evolutionStage = params.family.evolutionStage != [] ? params.evolutionStage : pokemonToUpdate.evolutionStage;
            pokemonToUpdate.family.evolutionLine = JSON.parse(params.family.evolutionLine) != [] ? JSON.parse(params.family.evolutionLine) : pokemonToUpdate.family.evolutionLine;
        }
        pokemonToUpdate.starter = params.starter != undefined ? params.starter : pokemonToUpdate.starter;
        pokemonToUpdate.legendary = params.legendary != undefined ? params.legendary : pokemonToUpdate.legendary;
        pokemonToUpdate.mythical = params.mythical != undefined ? params.mythical : pokemonToUpdate.mythical;
        pokemonToUpdate.ultraBeast = params.ultraBeast != undefined ? params.ultraBeast : pokemonToUpdate.ultraBeast;
        pokemonToUpdate.mega = params.mega != undefined ? params.mega : pokemonToUpdate.mega;
        pokemonToUpdate.description = params.description != undefined ? params.description : pokemonToUpdate.description;

        let upPokemon = await Pokemon.findByIdAndUpdate({ _id: req.params.id}, pokemonToUpdate, {new: true})
        res.status(200).json(upPokemon);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }
}
  
exports.getPokemon = async(req, res) => {
    const { id } = req.params;

    try {
        let selectPokemon = await Pokemon.findById(id);

        if(!selectPokemon){
            res.status(404).json({msg: "No se ha encontrado informacion sobre este pokemon"});
        }

        res.status(200).json(selectPokemon);

    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }
}

exports.deletePokemon = async(req, res) => {
    const { id } = req.params;

    try {
        let pokeDelete = await Pokemon.findById(id);

        if(!pokeDelete){
            res.status(404).json({msg: "No se ha encontrado informacion sobre este pokemon"});
        }

        await Pokemon.findByIdAndRemove({_id:id});
        res.status(200).json({msg: "Este pokemon se ha eliminado de tu lista"});

    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }
}

exports.uploadPokemon = async (req, res) => {
        
    // Path del archivo
    var file_path = req.files.pokeImage.path;
    var file_split = file_path.split("\\");

    // Nombre del archivo
    var file_name = file_split[file_split.length - 1];

    // Extencion del archivo
    var extencion = file_name.split(".");
    var file_ext = extencion[extencion.length -1];

    try {
        if(!req.files){
            res.status(404).json({msg: "No hay una imagen subida"});
        }

        // Validacion de la extencion
        if(file_ext != "png" && file_ext != "jpg" && file_ext != "jpeg" && file_ext != "gif"){
            // Borrar archivo subido
            fs.unlink(file_path);
            res.status(404).json({msg: "El formato de este archivo es incorrecto"});
        } else {

            // Buscar el articulo
            let pokemonImg = await Pokemon.findByIdAndUpdate({_id: req.params.id}, {image: file_name}, {new: true});
            res.status(200).json(pokemonImg);

        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }


},

exports.getImage = async(req, res) => {
    // Nombre del archivo
    var file = req.params.poke;

    // Ruta del archivo
    var path_file = "./upload/pokemon/" + file;
    try {
        // Saber si existe el archivo
        await fs.exists(path_file, (exist) => {
            if(exist){
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(404).json({ msg: "La imagen no existe"})
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }

},

exports.filterPokemon = async(req, res) => {
    // Sacar el sting del parametro
    var search_string = req.params.search
    
    try {
        //Find Or
        let searchPokemon = await Pokemon.find({$or: [
                                    { "name": {"$regex": search_string, "$options": "i" }},
                                    { "content": {"$regex": search_string, "$options": "i" }},
                                    { "type": {"$regex": search_string, "$options": "i" }},
                                    { "abilities.normal": {"$regex": search_string, "$options": "i" }},
                                    { "abilities.hidden": {"$regex": search_string, "$options": "i" }},
                                    { "starter": {$ne: true}},
                                    { "legendary": {$ne: true}},
                                    { "mythical": {$ne: true}},
                                    { "ultraBeast": {$ne: true}},
                                    { "mega": {$ne: true}}
                                ]},
                                {$where: [
                                    { "number": `function() { return this.number.toString().match(/${search_string}/) != null; }`}
                                ]})
                                  .sort([["date", "descending"]]);
        res.status(200).json(searchPokemon);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }
    
}