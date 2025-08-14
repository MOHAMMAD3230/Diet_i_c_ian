async function sendMessage() {
  const inputField = document.getElementById("user-input");
  const userText = inputField.value;
  if (!userText.trim()) return;

  appendMessage("You", userText, "user");
  inputField.value = "";

  appendMessage("Bot", "Thinking...", "bot");

  const response = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText })
  });

  const data = await response.json();
  const botReply = data.reply;
  
  document.querySelector("#chat-box").lastChild.textContent = `Bot: ${botReply}`;

  if (document.getElementById("voice-toggle").checked) {
    speakText(botReply);
  }
}

function appendMessage(sender, text, className) {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.classList.add(className);
  msg.textContent = `${sender}: ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function speakText(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
  synth.speak(utterance);
}

function startListening() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Sorry, your browser doesn't support Speech Recognition.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onstart = () => {
    appendMessage("System", "Listening...", "bot");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("user-input").value = transcript;
    sendMessage();
  };

  recognition.onerror = (event) => {
    appendMessage("System", `Error: ${event.error}`, "bot");
  };
}
