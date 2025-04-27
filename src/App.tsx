import React, { useState } from "react";
import Chatbot from "./components/Chatbot/Chatbot";
import AcceptScreen from "./components/AcceptScreen/AcceptScreen";
// Importe o CSS onde definiu os estilos de .App e .transitionElement
import "./App.css"; // Ou garanta que index.css está sendo carregado

function App() {
  const [isChatAccepted, setIsChatAccepted] = useState(false);

  const handleAcceptChat = () => {
    setIsChatAccepted(true);
  };

  return (
    // Agora o .App tem a imagem de fundo e centraliza o conteúdo
    <div className="App">
      {/* Elemento AcceptScreen com controle de visibilidade/transição */}
      <div
        className={`transitionElement ${
          !isChatAccepted ? "visible" : "hidden"
        }`}
      >
        <AcceptScreen onAccept={handleAcceptChat} />
      </div>

      {/* Elemento Chatbot com controle de visibilidade/transição */}
      <div
        className={`transitionElement ${isChatAccepted ? "visible" : "hidden"}`}
      >
        <Chatbot />
      </div>
    </div>
  );
}

export default App;
