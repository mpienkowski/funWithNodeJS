var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++)
    {
        cluster.fork();
    }

    console.log("created " + numCPUs + " workers");

    cluster.on('death', function(worker)
    {
        console.log('worker ' + worker.pid + ' died');
        cluster.fork(); //respawn
    });
} else {
    // Worker processes have a http server.
    http.Server(function(request, response)
    {
        response.writeHead(200);

        console.log("request received by worker " + cluster.worker.process.pid);

        var now = new Date().getTime();
        while(new Date().getTime() < now + 10000)
        {
            //do nothing
        }

        response.end("hello world from " + cluster.worker.process.pid);
    }).listen(8887);
}