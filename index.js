var express = require('express')
var app = express()


app.set('port', (process.env.PORT || 8080))
//app.use(express.static(__dirname + '/public'))

//__dirname returns the directory that the currently executing script is in.

app.get('/', function(request, response) {
    response.sendFile('public/index.html',{root:__dirname})

/* sends an entire HTTP response to the client,                                                                                                                                     
 including headers and content,                                                                                                                                                     
 which is why you can only call once*/


})

app.listen(app.get('port'), function() {
  console.log("Node app is running at :" + app.get('port'))
})
