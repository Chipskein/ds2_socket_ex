const express=require('express');
const app=express();
const port=process.env.PORT || 8080;
const http=require('http');
const routes=require('./routes/routes')
const httpServer=http.createServer(app);
const { socketIoServer,socketIoConfig }=require("./conf/socketio.js");
const io=new socketIoServer(httpServer);
socketIoConfig(io);
app.use(routes);
httpServer.listen(port,()=>console.log(`Started Server on ${port}`));