const express=require('express');
const app=express();
const port=process.env.PORT || 8080;
const http=require('http');
const httpServer=http.createServer(app);
const { Server }=require("socket.io");
const io=new Server(httpServer);

app.get('/',(req,res)=>{
    return res.sendFile(__dirname+'/index.html')
});
io.on("connection",(socket)=>{
    
    console.log("Socket Connected:",socket.id)
    
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
    
    socket.on('chat message', (msg) => {
        console.log(`Message from client(${socket.id}) message: ` + msg);
    });

    io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

});
httpServer.listen(port,()=>console.log(`Started Server on ${port}`));