import React, { useState } from "react"; // Importar useState
import Chatbot from "./components/Chatbot/Chatbot";
import AcceptScreen from "./components/AcceptScreen/AcceptScreen"; // <-- Importar o novo componente
import "./App.css";

function App() {
  // Estado para controlar se a "conversa" foi aceita
  const [isChatAccepted, setIsChatAccepted] = useState(false); // Começa como falso

  // Função para ser chamada quando o botão ACEITAR for clicado
  const handleAcceptChat = () => {
    setIsChatAccepted(true);
    // Opcional: Tocar um som de aceite aqui, se desejar (mais complexo)
  };

  return (
    <div className="App">
      {/* Renderização Condicional */}
      {!isChatAccepted ? (
        // Se ainda não aceitou, mostra a tela de aceite
        <AcceptScreen onAccept={handleAcceptChat} />
      ) : (
        // Se já aceitou, mostra o chatbot
        <Chatbot />
      )}
    </div>
  );
}

export default App;
