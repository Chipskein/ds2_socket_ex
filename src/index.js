const http=require('http');
const express=require('express');
const { Server }=require("socket.io");
const { socketIoSetup }=require("./conf/socketio.js");
const routes=require('./routes/routes')
const port=process.env.PORT || 8080;
const app=express();
const httpServer=http.createServer(app);

app.use(express.static('public'));

app.use(routes);

socketIoSetup(new Server(httpServer));

app.use("*",(req,res)=>{return res.redirect('/room')})

httpServer.listen(port,()=>console.log(`Started Server on ${port}`));