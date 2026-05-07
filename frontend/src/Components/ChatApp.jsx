import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./ChatApp.scss";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  
  // Use a Ref to keep track of the socket so it doesn't reset on every render
  const socketRef = useRef(null);

  useEffect(() => {
    // 1. Initialize connection
    socketRef.current = io("https://basic-chatbot-yayu.vercel.app");

    // 2. Setup listeners
    socketRef.current.on("connect", () => {
      console.log("Connected to backend with ID:", socketRef.current.id);
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("Connection Error:", err.message);
    });

    socketRef.current.on("response", (aiResponse) => {
      const aiMessage = { 
        id: Date.now(), 
        text: aiResponse, 
        sender: "ai" 
        
      };
      setMessages((prev) => [...prev, aiMessage]);
    });

    // 3. Cleanup on unmount (prevents double connections in React Strict Mode)
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message to UI
    const newMessage = { 
      id: Date.now(), 
      text: inputValue, 
      sender: "me" };
    setMessages((prev) => [...prev, newMessage]);

    // Send to Backend
    if (socketRef.current) {
        socketRef.current.emit("prompt", inputValue);
    }

    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Room</h2>
      </div>
<div className="message-list">
  {messages.length === 0 ? (
    <p className="placeholder">No messages yet...</p>
  ) : (
    messages.map((msg) => (
      <div
        key={msg.id}
        // 👇 THIS IS THE KEY CHANGE
        className={`message-bubble ${msg.sender === "me" ? "outgoing" : "incoming"}`}
      >
        {msg.text}
      </div>
    ))
  )}
</div>
      <div className="input-area">
        <input
          type="text"
          className="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
