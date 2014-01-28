var chatLog = [];

chatLog.push({
  createdAt: new Date().toJSON(),
  updatedAt: new Date().toJSON(),
  objectId: '00001',
  roomname: 'Winterfell',
  text: 'Winter is coming!',
  username: 'Eddard Stark'
});
chatLog.push({
  createdAt: new Date().toJSON(),
  updatedAt: new Date().toJSON(),
  objectId: '00002',
  roomname: 'Winterfell',
  text: 'Fear cuts deeper than swords!',
  username: 'Arya Stark'
});

/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var url = require("url");
exports.handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;
  var headers = defaultCorsHeaders;

  if (request.url !== '/1/classes/chatterbox') {
    statusCode = 418;
    headers['Content-Type'] = "text/plain";
    response.writeHead(statusCode, headers);
    response.end("I'm a teapot!");
  }

  if(request.method === 'OPTIONS') {
    headers['Content-Type'] = "text/plain";
    response.writeHead(statusCode, headers);
    response.end();
  }

  if (request.method === 'GET') {
    headers['Content-Type'] = "application/json";
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(chatLog));
  }

  if (request.method === 'POST') {
    headers['Content-Type'] = "application/json";
    response.writeHead(statusCode, headers);
    request.on('data', function(data){
      chatLog.push(JSON.parse(data));
      console.log(chatLog);
      response.end(JSON.stringify(chatLog[chatLog.length - 1]));
    });
  }

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */

  /* .writeHead() tells our server what HTTP status code to send back */


  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
