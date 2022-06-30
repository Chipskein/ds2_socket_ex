const { Server }=require("socket.io");
let users=[];
let messages=[];
module.exports={
    socketIoServer:Server,
    onDisconnect:(socket,io)=>{
        console.log(socket.id+" Disconnected");
        io.emit('user out',{id:socket.id});
        users = users.filter( user => user.id != socket.id);
        io.emit('update users',users);
    },
    newMessage:(msg,socket,io)=>{
        messages.push({userid:socket.id,msg});
        io.emit('update message',messages);
    },
    newUser:(socket,io)=>{
        users.push({id:socket.id})
        console.log(socket.id+" connected");
        io.emit('update users',users);
        io.emit('update message',messages);
    },
    socketIoConfig:(io)=>{
        io.on("connection",(socket)=>{
            
            module.exports.newUser(socket,io)
                       
            socket.on('chat message', (msg) => module.exports.newMessage(msg,socket,io));
            socket.on('user typing', () => io.emit('update is typing',{id:socket.id}));
            socket.on('update typing', () => io.emit('update typing'));
            socket.on('disconnect',()=>module.exports.onDisconnect(socket,io));    
    

            io.emit('user in',{id:socket.id});
        });
    }
}