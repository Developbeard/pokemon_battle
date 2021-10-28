const express = require("express");
const conectDB = require("./config/db");

//Crear el servidor
const app = express();

//Conectamos a la BD
conectDB();

//Habilita el envio de JSON
app.use(express.urlencoded({extended: false}))
app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Conecta las rutas con el archivo de las APIs
app.use("/api/pokemons", require("./routes/pokemon"));

app.listen(4000, () => {
    console.log("El servidor esta funcionando");
})