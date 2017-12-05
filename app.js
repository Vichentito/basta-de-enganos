const express = require('express');
const bodyParser = require('body-parser');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var id,username,score;
var clientes = [];
var Scores = [];
var respuestas = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
server.listen(8080, () => console.log('Servidor iniciado en 8080'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/chat/:username', function (req, res) {
  res.sendFile(__dirname + '/public/game.html');
});
app.get('/results/:username', function (req, res) {
  res.sendFile(__dirname + '/public/scores.html');

});

app.post('/login', function (req, res) {
  username = req.body.username;
  id = req.body.id;
  clientes.push({id: id, username: username});
  io.emit('socket_conectado', {id: id, username: username});
  return res.json(clientes);
});

app.post('/send', function (req, res) {
  username = req.body.username;
  id = req.body.id;
  let nom = req.body.nom;
  let ap = req.body.ap;
  let cos = req.body.cos;
  let am = req.body.am;
  let flor = req.body.flor;
  let col = req.body.col;
  let lug = req.body.lug;
  let pel = req.body.pel;
  let marc = req.body.marc;
  respuestas.push({nom:nom,ap:ap,cos:cos,am:am,flor:flor,col:col,lug:lug,pel:pel,marc:marc});
  console.log(respuestas)
  io.emit('scores', {id: id, username: username});
});

app.post('/cargar',(req,res)=>{
  score = Math.floor((Math.random() * 700) + 50);
  username = req.body.username;
  id = req.body.id;
  Scores.push({id: id, username: username, score: score});
  console.log(Scores)
  return res.json(Scores);
})

io.on('connection', socket => {
  console.log('Socket conectado', socket.id);
  socket.on('disconnect', () => {
    clientes = clientes.filter(cliente => cliente.id != socket.id);
  });
});

function calcular(){
	let puntuacion=0;
	//Respuestas jugador 1
	var primer = respuestas[0];
	console.log(primer)
	//Respuestas jugador 2
	var segundo = respuestas[1];


	//Los 3 son iguales
	if(primer.nom == segundo.nom ){
		puntuacion+=50;
	}else if(primer.nom != segundo.nom ){
		puntuacion+=100
	}
	//Para ap

	//Los 3 son iguales
	if(primer.ap == segundo.ap ){
		puntuacion+=50;
	}
	//Los 3 son diferentes
	else if(primer.ap != segundo.ap ){
		puntuacion+=100
	}
	//Para am

	//Los 3 son iguales
	if(primer.am == segundo.am ){
		puntuacion+=50;
	}
	//Los 3 son diferentes
	else if(primer.am != segundo.am ){
		puntuacion+=100
	}
	//Para las cosas

	//Los 3 son iguales
	if(primer.cos == segundo.cos ){
		puntuacion+=50;
	}
	//Los 3 son diferentes
	else if(primer.cos != segundo.cos ){
		puntuacion+=100
	}

	//Para los lugares

	//Los 3 son iguales
	if(primer.lug == segundo.lug ){
		puntuacion+=50;
	}
	//Los 3 son diferentes
	else if(primer.lug != segundo.lug ){
		puntuacion+=100
	}
	//Para flor o fruto

	//Los 3 son iguales
	if(primer.flor == segundo.flor ){
		puntuacion+=50;
	}
	//Los 3 son diferentes
	else if(primer.flor != segundo.flor ){
		puntuacion+=100
	}
	//Para los colores

	//Los 3 son iguales
	if(primer.col == segundo.col ){
		puntuacion+=50;
	}
	//Los 3 son diferentes
	else if(primer.col != segundo.col ){
		puntuacion+=100
	}

	return puntuacion;

}
