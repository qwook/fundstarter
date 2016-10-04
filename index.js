var express = require('express')
var app = express()
var fs = require('fs');


app.set('port', (process.env.PORT || 8080))
//app.use(express.static(__dirname + '/public'))

//__dirname returns the directory that the currently executing script is in.

app.get('/', function(request, response) {
    response.sendFile('public/index.html',{root:__dirname})

/* sends an entire HTTP response to the client,                                                                                                                                     
 including headers and content,                                                                                                                                                     
 which is why you can only call once*/

})

// Part 1

app.get('/readFileSync', function(request, response) {
    response.send(fs.readFileSync('public/index.html', 'utf8'));
});

app.get('/readFile', function(request, response) {
    fs.readFile('public/index.html', 'utf8', function(err, body) {
      response.send(body);
    })
});

app.get('/fsOpen', function(request, response) {
    fs.stat('public/index.html', function(err, stats) {
        if (!err && stats.isFile()) {
            console.log(stats.size);
            var buff = new Buffer (stats.size);
            fs.open('public/index.html', 'r', function(err, fd) {
                fs.read(fd, buff, 0, stats.size, null, function(err, read, buffer) {
                    if (!err)
                        response.send(buff.toString());
                    else
                        response.send(err);
                });
            });
        } else
            response.send(err);
    });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at :" + app.get('port'))
})
