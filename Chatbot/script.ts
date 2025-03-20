const form = document.getElementById('chat-form') as HTMLFormElement;
const input = document.getElementById('user-input') as HTMLInputElement;
const chatBox = document.getElementById('chat-box') as HTMLDivElement;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('You', userMessage);
  respondToMessage(userMessage);

  input.value = '';
});

function appendMessage(sender: string, message: string) {
  const messageElement = document.createElement('div');
  messageElement.className = 'text-sm';
  messageElement.textContent = `${sender}: ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function respondToMessage(message: string) {
  let botResponse = "I'm not sure how to respond to that.";
  if (message.toLowerCase().includes('hello')) {
    botResponse = 'Hello there! 😊 How can I assist you?';
  }
  appendMessage('Bot', botResponse);
}
