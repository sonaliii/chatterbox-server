var getMessages = function() {
  $.ajax({
    url: 'http://127.0.0.1:8080/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to receive messages');
    }
  });
};

var postMessage = function(message) {
  $.ajax({
    // always use this url
    url: 'http://127.0.0.1:8080/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.log(arguments);
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

$(document).ready(function(){
  getMessages();
});