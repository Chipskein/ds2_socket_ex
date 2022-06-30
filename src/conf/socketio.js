const { Server }=require("socket.io");
module.exports={
    socketIoServer:Server,
    socketIoConfig:(io)=>{
        let users=[];
        let messages=[];
        io.on("connection",(socket)=>{
            users.push({id:socket.id})
            console.log(socket.id+" connected");
            io.emit('update users',users);
            io.emit('update message',messages);
            socket.on('chat message', (msg) => {
                messages.push({userid:socket.id,msg});
                io.emit('update message',messages);
            });

            socket.on('user typing', () => {
                io.emit('update is typing',{id:socket.id});
            });
            
            socket.on('update typing', () => {
                io.emit('update typing');
            });



            socket.on('disconnect', () => {
                console.log(socket.id+" Disconnected");
                io.emit('user out',{id:socket.id});
                users = users.filter( user => user.id != socket.id);
                io.emit('update users',users);
            });    
            io.emit('user in',{id:socket.id});
        });
        
    }
}