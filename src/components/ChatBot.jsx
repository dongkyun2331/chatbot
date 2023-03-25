import React, { useState } from "react";
import $ from "jquery";

function ChatBot() {
  const [messages, setMessages] = useState([]);

  const sendMessage = (message) => {
    setMessages([...messages, message]);
  };

  $(".input").on("keydown", function (event) {
    if (event.key === "Enter") {
      $(".send-button").trigger("click");
    }
  });

  return (
    <div className="chatbot-container">
      <div className="header">
        <div className="header-box">
          <img src="images/profile.png" className="img" />
        </div>
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div class="input-container">
        <div className="input-box">
          <input className="input" type="text" />
          <div className="button">
            <button class="send-button">전송</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
