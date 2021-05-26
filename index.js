const express = require("express"); //importando o express
const app = express(); //iniciando o express

//Dizendo para o Express utilizar o EJS como view engine
app.set('view engine','ejs');
app.use(express.static('public'));


app.get("/",(req,res) => {
    res.render("index");
});




app.listen(3010,() => {console.log("Landing page do WebGENTE rodando na porta 3010");});




