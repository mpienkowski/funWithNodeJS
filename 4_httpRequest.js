var http = require("http");

http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    console.log("new request");
    makeARequest();
    response.end();

}).listen(8887);

var makeARequest = function () {

    var callback = function(response) {
        var responseData = '';

        response.on('data', function (chunk) {
            responseData += chunk;
        });

        response.on('end', function () {
            console.log("Got it all: ", responseData.length);
        });
    }

    http.get("http://norvig.com/big.txt", callback).end();
};
