var http = require("http");

http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    console.log("new request");
    var now = new Date().getTime();
    while(new Date().getTime() < now + 10000)
    {
        //do nothing
    }
    console.log("done with doing nothing");
    response.end();
}).listen(8887);

