import React, { useState, useEffect, useRef } from "react"; // <-- Garanta que useState está importado
import { Message } from "../../types/chat";
import { getBotResponse } from "../../services/botService";
import styles from "./Chatbot.module.css";
import MessageList from "../MessageList/MessageList";
import ChatInput from "../ChatInput/ChatInput";
import VacWarning from "../VacWarning/VacWarning"; // <-- 1. Importar o novo componente

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(true); // Começa visível

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

  const handleDismissWarning = () => {
    setIsWarningVisible(false);
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatbotHeader}>
        {
          <img
            src={"/furia-pantera-icon.png"}
            alt="Furia Logo"
            className={styles.logo}
          />
        }
        <h2>FuricoBot</h2>
        <span className={styles.statusIndicator}>Online</span>
      </div>

      {isWarningVisible && <VacWarning onDismiss={handleDismissWarning} />}

      <MessageList messages={messages} isBotTyping={isBotTyping} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chatbot;
