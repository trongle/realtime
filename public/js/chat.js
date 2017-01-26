window.onload = () => {

  // var defaultPort = process.env.PORT || 6969;
  // var domain = process.env.DOMAIN || '';

  var messages = [];
  var socket = io.connect('http://localhost:6969');
  var field = document.getElementById('field');
  var sendButton = document.getElementById('send');
  var messageBox = document.getElementById('message_box');
  var name = document.getElementById('name');

  //event gửi cho mình mình
  socket.on('message', (data) =>{
    if(data.message) {
      // messages.push(data);

      //xử lý tin nhắn
      messageBox.innerHTML = messageBox.innerHTML + showMessageOnlyMe(data);

      //luôn luôn cuộn xuống bottom
      messageBox.scrollTop = messageBox.scrollHeight;
    }
    else{
      console.log('There is a problem:', data);
    }
  });

  //event gửi cho những người khác trừ mình
  socket.on('user_connected',(data) => {
    if(data.message) {
      // messages.push(data);

      //xử lý tin nhắn
      messageBox.innerHTML = messageBox.innerHTML + showMessageExceptMe(data);

      //luôn luôn cuộn xuống bottom
      messageBox.scrollTop = messageBox.scrollHeight;
    }
    else{
      console.log('There is a problem:', data);
    }
  })

  //event gửi cho chính mình
  socket.on('connect', () => {
    console.log('123123');
  })

  document.addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
      handleMessage();
    }
  })

  sendButton.onclick = handleMessage = () => {
    var text = field.value;
    var username = name.value;

    if(username == ''){
      alert('Please type your name !');
      name.focus();
    }
    else{
      socket.emit('send', {message: text, username: username});
      field.value = '';
      field.focus();
    }
  }

  var showMessageExceptMe = (data) => {
    var html = '<div class="message">' +
                  '<p class="username">' + (data.username ? data.username : 'Server') + ' <i>nói</i> : </p>' +
                  '<div class="box-message-except-me"><p>' + data.message + '</p></div>' +
                  '<span class="clr"></span>' +
              '</div>';

    return html;
  }

  var showMessageOnlyMe = (data) => {
    var html = '<div class="message">' +
                  '<div class="box-message-only-me"><p>' + data.message + '</p></div>' +
                  '<span class="clr"></span>'
              '</div>';

    return html;
  }

}
