// src/components/Chatbot/Chatbot.tsx
import React, { useState, useEffect, useRef } from "react"; // <-- Garanta que useState está importado
import { Message } from "../../types/chat";
import { getBotResponse } from "../../services/botService";
import styles from "./Chatbot.module.css";
import MessageList from "../MessageList/MessageList";
import ChatInput from "../ChatInput/ChatInput";
import VacWarning from "../VacWarning/VacWarning"; // <-- 1. Importar o novo componente

// Imagem do Logo (se estiver usando)
// import furiaLogo from '/furia-logo-preto.svg';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  // --- 2. Estado para visibilidade do aviso ---
  const [isWarningVisible, setIsWarningVisible] = useState(true); // Começa visível
  // --- Fim do Estado ---

  // Mensagem inicial do bot (sem alterações)
  useEffect(() => {
    setMessages([
      {
        id: Date.now(),
        text: "E aí! Aqui é o Furico, firmeza? Manda a braba aí. #DIADEFURIA",
        sender: "bot",
      },
    ]);
  }, []);

  // Função para enviar mensagem (sem alterações)
  const handleSendMessage = (userText: string) => {
    // ... (lógica existente) ...
    if (!userText.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      text: userText,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    setIsBotTyping(true);

    setTimeout(() => {
      const botText = getBotResponse(userText);
      const newBotMessage: Message = {
        id: Date.now() + 1,
        text: botText,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      setIsBotTyping(false);
    }, 1000 + Math.random() * 500);
  };

  // --- 3. Função para fechar o aviso ---
  const handleDismissWarning = () => {
    setIsWarningVisible(false);
  };
  // --- Fim da Função ---

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatbotHeader}>
        {/* <img src={furiaLogo} alt="FURIA Logo" className={styles.logo} /> */}
        <h2>Chat do Furico 🐾</h2>
        <span className={styles.statusIndicator}>Online</span>
      </div>

      {/* --- 4. Renderização Condicional do Aviso --- */}
      {isWarningVisible && <VacWarning onDismiss={handleDismissWarning} />}
      {/* --- Fim da Renderização --- */}

      <MessageList messages={messages} isBotTyping={isBotTyping} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chatbot;
