const express = require('express');
const ejs = require('ejs'); // source : https://ejs.co/
const mysql = require('mysql2');
const app = express();

const PORT = 8080;

//manipulation des donnees des formulaires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.static("public/css"));
//app.use(express.static("public/js"));
app.use(express.static("views"));

//Connexion à la bese données
const conn = mysql.createConnection({
 host: "localhost",
 user: "root",
password: "", //votre passe root
 database: "monsiteweb", //votre base des donnees
});
conn.connect((err) =>{
  if(err) throw err;
  console.log('connexion à la base de données reusi');
});
module.exports = conn;

//Enregistrement à la base de donnée de la table REGISTER
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  //const utilisateur = { nom, email, password};

 var sql1 = `INSERT INTO contact (name, email, message) VALUES ("${name}", "${email}", "${message}")`;
 conn.query(sql1, function (err, result) {
   if (err) throw err;
   console.log('le client est enregitrer avec succèes');
   });
});

//template
app.set("view engine", "ejs"); // voir explication sur : http://www.progsys.yj.fr/NodeJS_chap4 

//creation des routes 
app.get('/', (req, resp) => {
  resp.sendFile(__dirname + "/views/login.html");
});

app.get('/home', (req, resp) => {
  resp.sendFile(__dirname + "/views/home.html");
});

app.get('/', (req, resp) => {
  resp.sendFile(__dirname + "/views/login/register.html");
});

app.get('/register', (req, resp) => {
  resp.sendFile(__dirname + "/views/login/register.html");
});

app.get('/', (req, resp) => {
  resp.sendFile(__dirname + "/views/register/login.html");
});

app.get('/login', (req, resp) => {
  resp.sendFile(__dirname + "/views/register/login.html");
});

app.listen(PORT, () => {
  console.log("Serveur en marche", PORT ) ;
});