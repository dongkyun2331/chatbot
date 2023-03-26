import React, { useState, useRef, useEffect } from "react";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const textareaRef = useRef(null);
  const buttonRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessages([...messages, { text: inputText, isSent: true }]);
    setInputText("");
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    const button = buttonRef.current;

    textarea.addEventListener("input", function () {
      if (textarea.value.trim() !== "") {
        button.style.backgroundColor = "#FEE500";
        button.style.color = "#4D3636";
      } else {
        button.style.backgroundColor = "#f2f2f2";
        button.style.color = "#b4b4b4";
      }
    });
  }, [textareaRef, buttonRef]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      buttonRef.current.click();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="header">
        <div className="header-box">
          <img src="images/profile.png" className="img" />
          <h1>챗봇</h1>
        </div>
      </div>
      <div className="messages-container">
        {messages
          .slice(0)
          .reverse()
          .map((message, index) => (
            <div key={index} className="message">
              <div className="message-bubble">{message.text}</div>
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <div className="input-box">
            <textarea
              id="myTextArea"
              className="input"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              ref={textareaRef}
            ></textarea>
            <div className="button">
              <button id="myButton" class="send-button" ref={buttonRef}>
                전송
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChatBot;
