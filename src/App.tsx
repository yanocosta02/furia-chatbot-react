import React, { useState, useEffect } from "react";
import Chatbot from "./components/Chatbot/Chatbot";
import AcceptScreen from "./components/AcceptScreen/AcceptScreen";
import "./App.css";

function App() {
  const [isChatAccepted, setIsChatAccepted] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleAcceptChat = () => {
    setIsChatAccepted(true);
    setTimeout(() => {
      setShowChatbot(true);
    }, 1500);
  };

  return (
    <div className="App">
      <video className="background-video" autoPlay muted loop playsInline>
        <source src="/telacs.mp4" type="video/mp4" />
        Seu navegador não suporta vídeo em HTML5.
      </video>

      {/* Conteúdo principal */}
      {!isChatAccepted ? (
        <AcceptScreen onAccept={handleAcceptChat} />
      ) : (
        <div className={`chatbot-container ${showChatbot ? "show" : ""}`}>
          <Chatbot />
        </div>
      )}
    </div>
  );
}

export default App;
