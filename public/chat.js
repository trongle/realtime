window.onload = () => {

  // var defaultPort = process.env.PORT || 6969;
  // var domain = process.env.DOMAIN || '';

  var messages = [];
  var socket = io.connect('http://localhost:6969');
  var field = document.getElementById('field');
  var sendButton = document.getElementById('send');
  var content = document.getElementById('content');
  var name = document.getElementById('name');

  socket.on('message', (data) =>{

    if(data.message) {
      messages.push(data);
      var html = '';
      for(var i = 0; i < messages.length; i++){
        html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
        html += messages[i].message + '<br>';
      }
      content.innerHTML = html;
      // content.scrollTop = content.scrollHeight;
    }
    else{
      console.log('There is a problem:', data);
    }
  });


  sendButton.onclick =  handleMessage = () => {
    var text = field.value;
    var username = name.value;

    if(username == ''){
      alert('Please type your name !');
    }
    else{
      socket.emit('send', {message: text, username: username});
      field.value = '';
      field.focus();
    }
  }

  document.addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
      handleMessage();
    }
  })

}
