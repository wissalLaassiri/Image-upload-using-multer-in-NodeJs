const http = require('http')
const app = require('./app')
const port = require('./config/config').PORT;

const server = http.createServer(app)

server.listen(port, () => {
    console.log(` Yeaah server running on : ${port} `);
});