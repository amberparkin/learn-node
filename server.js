var http = require('http');
var fs = require('fs');

// set the port for the server
var port = process.env.PORT || 8000;

fs.readFile(__dirname + '/index.html', function (error, index) {

  function handler(request, response) {
    var url = request.url;

    if (url.length === 1) {

      response.writeHead(200, {"Content-Type": "text/html"});
      response.end(index);

    } else if (url.indexOf('/cat') > -1) {

      response.writeHead(200, {"Content-Type": "text/html"});
      response.end('<img src="http://charts.stocktwits.com/production/original_24310845.jpg?1404265667"/>');

    } else {

      fs.readFile(__dirname + url, function(error, file){

        if (error){

          console.log(error);
          response.end();

        } else {

          var ext = url.split('.')[1];
          response.writeHead(200, {'Content-Type' : 'text/' + ext});
          response.end(file);

        }
      });
    }
  }

  http.createServer(handler).listen(port);
});

console.log('node http server listening on http://localhost:' + port);