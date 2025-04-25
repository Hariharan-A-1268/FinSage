import React, { useState } from "react";
async function sendMessage(message) {
  const response = await fetch("http://localhost:5001/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();
  return data.reply;
}
const simulateTypingEffect = (text, setMessages) => {
  let index = 0;

  const typingInterval = setInterval(() => {
    // Update the last bot message progressively
    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1];
      const updatedMessage = {
        ...lastMessage,
        text: text.slice(0, index + 1),
      };
      return [...prev.slice(0, -1), updatedMessage];
    });

    index++;
    if (index >= text.length) {
      clearInterval(typingInterval);
    }
  }, 20); // Adjust speed (milliseconds) for the typing effect
};
export default function ChatUI() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && inputText.trim()) {
      if (inputText.length > 200) {
        alert("You have exceeded the maximum word limit of 200 characters.");
        return;
      }
  
      const userMessage = { text: inputText, sender: "user" };
      setMessages((prev) => [...prev, userMessage]);
      setIsSubmitted(true);
  
      try {
        const botmessage = await sendMessage(inputText); // Backend API call
        setMessages((prev) => [
          ...prev,
          { text: "", sender: "bot" }, // Add an empty bot message initially
        ]);
        simulateTypingEffect(botmessage, setMessages); // Call the typing effect function
      } catch (error) {
        console.error("Error calling API:", error);
        setMessages((prev) => [
          ...prev,
          { text: "Something went wrong. Please try again.", sender: "bot" },
        ]);
      }
  
      setInputText("");
      setTimeout(() => setIsSubmitted(false), 500);
    }
  };
  

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "rgba(10, 25, 50)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderRadius: "16px",
          padding: "24px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "90vh",
        }}
      >
        {/* Chat messages section */}
        <div style={{ flex: 1, overflowY: "auto", marginBottom: "20px" }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                  alignItems: "flex-start",
                  maxWidth: "80%",
                  padding: "4px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor:
                      msg.sender === "user"
                        ? "rgba(10, 25, 50)"
                        : "rgba(255, 255, 255, 0.8)",
                    color:
                      msg.sender === "user" ? "white" : "rgba(10, 25, 50, 0.8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: msg.sender === "user" ? "10px" : "0",
                    marginRight: msg.sender === "bot" ? "10px" : "0",
                    fontSize: "16px",
                  }}
                >
                  {msg.sender === "user" ? "👤" : "🤖"}
                </div>

                <div
                  style={{
                    backgroundColor:
                      msg.sender === "user"
                        ? "white"
                        : "rgba(255, 255, 255, 0.85)",
                    color: "rgba(10, 25, 50)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                    fontSize: "14px",
                    whiteSpace: "pre-wrap",
                    maxWidth: "700px", 
                    wordBreak: "break-word", 
                  }}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centered input and embedded button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{ position: "relative", width: "80%", maxWidth: "800px" }}
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={200} 
              style={{
                width: "100%",
                height:"50px",
                padding: "10px 48px 10px 12px",
                paddingRight: "1px",
                borderRadius: "8px",
                border: "none",
                outline: "none",
                backgroundColor: "white",
                color: "rgba(10, 25, 50)",
                fontSize: "14px",
              }}
            />
            <button
              style={{
                position: "absolute",
                top: "50%",
                right: "0px",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(10, 25, 50)",
                border: "none",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                cursor: "pointer",
                boxShadow: "0 0 6px rgba(10, 25, 50, 0.3)",
              }}
            >
              <span
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "14px",
                  lineHeight: "0",
                }}
              >
                {isSubmitted ? "▣" : "↑"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
