var socket = io.connect('http://localhost:8080');
var list = document.querySelector('#lista-users');
var scoreslist = document.querySelector('#scorelist');
var username = window.location.pathname.replace('/chat/', '');
var username2 = window.location.pathname.replace('/results/', '');
var clientes = [];
var Scores = [];

function conectarChat() {
  var id = socket.id;
  console.log('id:', socket.id, 'useranme:', username);
  $.post('/login', {username: username, id: id}, function (data) {
    console.log(data);
    clientes = data;
    list.innerHTML += 'Cargando...';
    var html = '';
    clientes.forEach(function (cliente) {
      html += '<tr><td>' + cliente.username + '</td></tr>';
    });
    list.innerHTML = html;
    $('.loader').hide();
  });
}

function enviarMensaje() {
  var nom = document.querySelector('#nom').value;
  var ap = document.querySelector('#ap').value;
  var cos = document.querySelector('#cos').value;
  var am = document.querySelector('#am').value;
  var flor = document.querySelector('#flor').value;
  var col = document.querySelector('#col').value;
  var lug = document.querySelector('#lug').value;
  var pel = document.querySelector('#pel').value;
  var marc = document.querySelector('#marc').value;


  $.post('/send', {
    username: username,
    id:socket.id,
    nom: nom,
    ap: ap,
    cos: cos,
    am: am,
    flor: flor,
    col: col,
    lug: lug,
    pel: pel,
    marc: marc,
  });
}

var nombre,puntos;

function cargar(){
  $.post('/cargar',{username: username2,id:socket.id}, function (data) {
    Scores = data;
    var htmlScores = '';
    Scores.forEach(function (scores) {
      htmlScores += '<tr><td>1st</td><td>'+scores.score+'</td><td>'+scores.username+'</td></tr>';
    });
    scoreslist.innerHTML = htmlScores;
  });
}

socket.on('scores', function (data) {
  data.username = data.username.replace('</', '')

  nombre = data.username;
  puntos = data.score;

  if (data.id == socket.id) {
    window.location = '/results/' + username;
  }else{
  
  }
})


socket.on('socket_conectado', function (data) {
  console.log(data);
  clientes.push(data);
  var html = '';
  clientes.forEach(function (cliente) {
    html += '<li>' + cliente.username + '</li>';
  });
  list.innerHTML = html;
});
