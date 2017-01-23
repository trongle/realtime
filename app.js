const express = require('express');

const app = express();
const defaultPort = process.env.PORT || 6969;
//set view engine
app.set('views',__dirname + '/views');
app.set('view engine', 'jade');

//middleware
app.use(express.static(__dirname + '/public'));

app.get('/',(req, res) => {
  res.render('page');
});

//set io for realtime
var io = require('socket.io').listen(app.listen(defaultPort));
console.log('App run on port:' + defaultPort);


//Make connection handler
io.sockets.on('connection', (socket) => {
  socket.emit('message', {message: 'Welcome to the chat'});

  socket.on('send', (data) => {
    io.sockets.emit('message', data);
  })
})
