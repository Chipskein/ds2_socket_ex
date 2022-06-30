const express=require('express');
const app=express();

const port=process.env.PORT || 8080;

const http=require('http');
const httpServer=http.createServer(app);

app.use(express.static('public'));

const { socketIoServer,socketIoConfig }=require("./conf/socketio.js");
socketIoConfig(new socketIoServer(httpServer));

const routes=require('./routes/routes')
app.use(routes);
httpServer.listen(port,()=>console.log(`Started Server on ${port}`));