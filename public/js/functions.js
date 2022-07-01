function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function submitMessage(e){
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
        input.blur();
    }
}
function updateTyping(usersTyping){
    removeAllChildNodes(isTyping);
    let ids=[]
    usersTyping.map(obj=>ids.push(obj.id));
    let text="";
    text+=ids.join(',');
    text+= ids.length>1 ? " are":" is"
    isTyping.textContent = usersTyping.length>0  ? `${text} typing ...`:"";
}
function updateMessage(messagesArray){
    removeAllChildNodes(messages);
    messagesArray.map(message=>{
        const item = document.createElement('li');
        item.textContent = `[${message.date}] ${message.userid} says: ${message.msg}`;
        messages.appendChild(item);
    })
}
function updateUsers(usersArray){
    removeAllChildNodes(users);
    usersArray.map(user=>{
        const item = document.createElement('li');
        item.textContent = `${user.id}`;
        item.id=user.id;
        users.appendChild(item);
    })
}
function userIn(user){
    const item = document.createElement('li');
    item.textContent = `${user.id} Entrou`;
    messages.appendChild(item);
}
function userOut(user){
    const item = document.createElement('li');
    item.textContent = `${user.id} Saiu`;
    messages.appendChild(item);
}