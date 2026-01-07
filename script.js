const socket = io();


function sendMessage() {
const input = document.getElementById("msg");
if (input.value.trim() !== "") {
socket.emit("chatMessage", input.value);
input.value = "";
}
}


socket.on("chatMessage", (msg) => {
const messages = document.getElementById("messages");
const div = document.createElement("div");
div.textContent = msg;
messages.appendChild(div);
});