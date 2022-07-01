let users=[];
let messages=[];
let usersTyping=[];

module.exports={
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
    socketIoSetup:(io)=>{
        io.on("connection",(socket)=>{
            module.exports.newUser(socket,io)   
            socket.on('chat message', (msg) => module.exports.newMessage(msg,socket,io));
            


            socket.on('user start typing', () => {
                usersTyping.push({id:socket.id});
                io.emit('update typing',usersTyping);
            });
            socket.on('user typing interrupted', () => {
                usersTyping = usersTyping.filter( user => user.id != socket.id);
                io.emit('update typing',usersTyping)
            });
    

            socket.on('disconnect',()=>module.exports.onDisconnect(socket,io));            
            io.emit('user in',{id:socket.id});
        });
    }
}