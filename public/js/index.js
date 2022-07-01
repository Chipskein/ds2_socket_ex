const form = document.getElementById('form');
const input = document.getElementById('input');
const inputSend = document.getElementById('send');
const messages = document.getElementById('messages');
const users = document.getElementById('users');
const isTyping = document.getElementById('isTyping');

const socket = io();
inputSend.onclick=(e)=>submitMessage(e);
input.addEventListener("focusin",()=>socket.emit("user start typing"));
input.addEventListener("focusout",()=>socket.emit('user typing interrupted'));


socket.on('update typing',(usersTyping)=>updateTyping(usersTyping));
socket.on('update message',(messagesArray)=>updateMessage(messagesArray));
socket.on('update users',(usersArray)=>updateUsers(usersArray));
socket.on('user in',(userObj)=>userIn(userObj));        
socket.on('user out',(userObj)=>userOut(userObj))
