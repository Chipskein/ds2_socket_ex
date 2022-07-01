const form = document.getElementById('form');
const input = document.getElementById('input');
const inputSend = document.getElementById('send');
const messages = document.getElementById('messages');
const users = document.getElementById('users');
const isTyping = document.getElementById('isTyping');
inputSend.onclick=(e)=>{
    e.preventDefault();
    if (input.value) {
        socket.emit('update typing')
        socket.emit('chat message', input.value);
        input.value = '';
        input.blur();
    }
}
input.addEventListener("focusin",()=>socket.emit("user typing"));
input.addEventListener("focusout",()=>socket.emit('update typing'));

const socket = io();
socket.on('update is typing', function(body) {
    isTyping.textContent = `${body.id} is typing ...`;
});
socket.on('update typing', function(body) {
    isTyping.textContent = ``;
});

socket.on('update message', function(body) {
    removeAllChildNodes(document.getElementById('messages'));
    isTyping.textContent="";
    body.map(message=>{
        const item = document.createElement('li');
        item.textContent = `[${new Date().toISOString()}] ${message.userid} says: ${message.msg}`;
        messages.appendChild(item);
    })

});
socket.on('update users', function(body) {
    removeAllChildNodes(document.getElementById("users"));
    body.map(user=>{
        const item = document.createElement('li');
        item.textContent = `${user.id}`;
        item.id=body.id;
        users.appendChild(item);
    })
});


socket.on('user in', function(body) {
    const item = document.createElement('li');
    item.textContent = `${body.id} Entrou`;
    messages.appendChild(item);
});        


socket.on('user out',function(body) {
    const item = document.createElement('li');
    item.textContent = `${body.id} Saiu`;
    messages.appendChild(item);
})


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}