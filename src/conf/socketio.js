let users=[];
let messages=[];
let usersTyping=[];

module.exports={
    onDisconnect:(socket,io)=>{
        console.log(socket.id+" Disconnected");
        io.emit('user out',{id:socket.id});
        
        module.exports.rmUser(socket,io);
        module.exports.rmUsersTyping(socket,io);
    },
    newMessage:(msg,socket,io)=>{
        let date=new Date();
        date=`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        messages.push({
            msg,
            userid:socket.id,
            date
        });
        io.emit('update message',messages);
    },
    newUser:(socket,io)=>{
        users.push({id:socket.id})
        console.log(socket.id+" connected");
        io.emit('update users',users);
        io.emit('update message',messages);
    },
    rmUser:(socket,io)=>{
        users = users.filter( user => user.id != socket.id);
        io.emit('update users',users);
    },
    addUsersTyping:(socket,io)=>{
        usersTyping.push({id:socket.id});
        io.emit('update typing',usersTyping);
    },
    rmUsersTyping:(socket,io)=>{
        usersTyping = usersTyping.filter( user => user.id != socket.id);
        io.emit('update typing',usersTyping)
    },
    socketIoSetup:(io)=>{
        io.on("connection",(socket)=>{
            module.exports.newUser(socket,io)   
            socket.on('chat message', (msg) => module.exports.newMessage(msg,socket,io));
            socket.on('user start typing', () => module.exports.addUsersTyping(socket,io));
            socket.on('user typing interrupted', () => module.exports.rmUsersTyping(socket,io));
            socket.on('disconnect',()=>module.exports.onDisconnect(socket,io));            
            io.emit('user in',{id:socket.id});
        });
    }
}