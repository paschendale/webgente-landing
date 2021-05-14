const express = require("express"); //importando o express
const app = express(); //iniciando o express

//Dizendo para o Express utilizar o EJS como view engine
app.set('view engine','ejs');
app.use(express.static('public'));


app.get("/",(req,res) => {
    res.render("index");
});

app.get("/teste",(req,res) => {
    res.render("teste");
});

app.get("/teste2",(req,res) => {
    res.render("teste2");
});


app.listen(3000,() => {console.log("Landing page do WebGENTE rodando na porta 3000");});




