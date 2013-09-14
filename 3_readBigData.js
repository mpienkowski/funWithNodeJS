var http = require("http");
var fs = require('fs');

http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});

    console.log("new request");

    fs.readFile('assets/bigData.txt',
        {encoding: "utf8"},
        function(error, data) {
            if (error)
            {
                throw error;
            }

            console.log("read ", data.length, " bytes");
        });

    response.end();
}).listen(8887);

