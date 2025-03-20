var form = document.getElementById('chat-form');
var input = document.getElementById('user-input');
var chatBox = document.getElementById('chat-box');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var userMessage = input.value.trim();
    if (!userMessage)
        return;
    appendMessage('You', userMessage);
    respondToMessage(userMessage);
    input.value = '';
});
function appendMessage(sender, message) {
    var messageElement = document.createElement('div');
    messageElement.className = 'text-sm';
    messageElement.textContent = "".concat(sender, ": ").concat(message);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
function respondToMessage(message) {
    var botResponse = "I'm not sure how to respond to that.";
    if (message.toLowerCase().includes('hello')) {
        botResponse = 'Hello there! 😊 How can I assist you?';
    }
    appendMessage('Bot', botResponse);
}
