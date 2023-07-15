const http = require('http');
const app = require('./App');



const server = http.createServer(app);


app.set('port', 4000 || process.env.PORT);

server.listen(4000 || process.env.PORT)