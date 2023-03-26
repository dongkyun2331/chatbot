import React, { useState, useRef, useEffect } from "react";

function ChatBot() {
  //채팅창에 나타날 메시지들을 저장할 상태
  const [messages, setMessages] = useState([]);
  //입력창의 내용을 저장할 상태
  const [inputText, setInputText] = useState("");
  // textarea와 button 요소를 참조할 useRef
  const textareaRef = useRef(null);
  const buttonRef = useRef(null);
  // 채팅창 스크롤을 자동으로 아래로 내려주기 위한 useRef
  const messagesEndRef = useRef(null);
  //handleSubmit 함수는 전송 버튼이나 엔터키를 눌렀을 때 호출되는 함수입니다.
  const handleSubmit = (event) => {
    event.preventDefault();
    setMessages([...messages, { text: inputText, isSent: true }]); // 사용자가 입력한 말 추가
    handleMessage(inputText);
    setInputText("");
  };
  // 입력된 메시지를 분석하고 답변을 출력하는 함수
  const handleMessage = (inputText) => {
    // 사용자가 입력한 메시지
    const Message = { text: inputText, isSent: true };
    // 챗봇이 응답할 메시지
    let chatbotMessage = null;
    if (inputText.includes("안녕")) {
      chatbotMessage = { text: "안녕하세요", isSent: false };
    }

    // 메시지 배열에 사용자의 메시지와 챗봇의 응답을 추가
    setMessages((messages) => [...messages, chatbotMessage].filter(Boolean)); // filters out null values from array
  };

  // 채팅창 스크롤을 자동으로 아래로 내려주는 기능
  useEffect(() => {
    const messagesEnd = messagesEndRef.current;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = messagesEnd;
      if (scrollHeight - scrollTop === clientHeight) {
        messagesEnd.scrollTop = messagesEnd.scrollHeight;
      }
    };

    messagesEnd.addEventListener("scroll", handleScroll);

    return () => {
      messagesEnd.removeEventListener("scroll", handleScroll);
    };
  }, [messagesEndRef]);
  // 채팅창 높이를 동적으로 조절해주는 기능
  useEffect(() => {
    const container = document.querySelector(".messages-container");
    const header = document.querySelector(".header");
    const inputContainer = document.querySelector(".input-container");

    const resizeHandler = () => {
      const windowHeight = window.innerHeight;
      const headerHeight = header.offsetHeight;
      const inputContainerHeight = inputContainer.offsetHeight;
      container.style.height = `${
        windowHeight - headerHeight - inputContainerHeight
      }px`;
    };

    resizeHandler();

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  //handleInputChange 함수는 textarea에 입력된 값을 inputText 상태에 업데이트하는 역할을 합니다.
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  // 입력창의 값이 변경될 때마다 버튼 스타일을 변경해주는 기능
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
      const button = buttonRef.current;
      button.style.backgroundColor = "#f2f2f2";
      button.style.color = "#b4b4b4";
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
      <div className="messages-container" ref={messagesEndRef}>
        {messages
          .slice(0)
          .reverse()
          .map((message, index) => (
            <div
              key={index}
              className={`message ${message.isSent ? "sent" : "received"}`}
            >
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
