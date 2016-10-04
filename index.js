
const http = require('http'),
      fs   = require('fs'),
      path = require('path');

const port = process.env.PORT || 8080;
const indexFilePath = path.join(__dirname, 'public', 'index.html');

const server = http.createServer( (req, res) => {

    var url = req.url.toLowerCase();

    if (url == "/") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end( fs.readFileSync(indexFilePath, 'utf8') );
    } else if (url == "/readfile") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile(indexFilePath, 'utf8', function(err, body) {
          res.end(body);
        })
    } else if (url == "/fsopen") {
        fs.stat(indexFilePath, function(err, stats) {
            if (!err && stats.isFile()) {
                console.log(stats.size);
                var buff = new Buffer (stats.size);
                fs.open(indexFilePath, 'r', function(err, fd) {
                    fs.read(fd, buff, 0, stats.size, null, function(err, read, buffer) {
                        if (!err) {
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.end(buff.toString());
                        } else {
                            res.writeHead(500, {'Content-Type': 'text/html'});
                            res.end(err);
                        }
                    });
                });
            } else {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.end(err);
            }
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(`<h1>404 error.</h1>`);
    }

} );

server.listen(port, () => {
    console.log(`Server running on ${port}`);
});
