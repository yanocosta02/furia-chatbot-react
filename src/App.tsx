import React, { useState, useEffect } from "react";
import Chatbot from "./components/Chatbot/Chatbot";
import AcceptScreen from "./components/AcceptScreen/AcceptScreen";
import "./App.css";

function App() {
  // Estado para controlar se a "conversa" foi aceita
  const [isChatAccepted, setIsChatAccepted] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false); // Para controlar o chatbot com delay

  // Função para ser chamada quando o botão ACEITAR for clicado
  const handleAcceptChat = () => {
    setIsChatAccepted(true);

    // Espera o tempo do áudio (5 segundos) para mostrar o chatbot
    setTimeout(() => {
      setShowChatbot(true); // Exibe o chatbot após o tempo de áudio
    }, 1500); // 5000ms = 5 segundos
  };

  return (
    <div className="App">
      {/* Renderização Condicional */}
      {!isChatAccepted ? (
        // Se ainda não aceitou, mostra a tela de aceite
        <AcceptScreen onAccept={handleAcceptChat} />
      ) : (
        // Se já aceitou, mostra o chatbot com transição
        <div className={`chatbot-container ${showChatbot ? "show" : ""}`}>
          <Chatbot />
        </div>
      )}
    </div>
  );
}

export default App;
