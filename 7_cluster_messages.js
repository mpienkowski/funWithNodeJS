var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if(cluster.isMaster)
{
    for(var i=0; i<numCPUs; i++)
    {
        var worker = cluster.fork();
        worker.on('message', function(message)
        {
            console.log('Message from worker ' + message.pid + ": " + message.text)
        });
    }
} else {
    http.Server(function(request, response)
    {
        response.writeHead(200);
        response.end('Response from worker ' + cluster.worker.process.pid);
    }).listen(8887);

    setInterval(function report(){
        process.send({text: "hello!", pid: cluster.worker.process.pid});
    }, 4000);
}