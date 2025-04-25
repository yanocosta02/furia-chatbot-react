import React, { useState, useEffect, useRef } from "react";
import { Message } from "../../types/chat"; // Importa nosso tipo
import { getBotResponse } from "../../services/botService"; // Importaremos depois
// Importa o CSS Modules para estilização
import styles from "./Chatbot.module.css"; // CSS Modules para estilização

// Importar componentes filhos que criaremos a seguir
import MessageList from "../MessageList/MessageList";
import ChatInput from "../ChatInput/ChatInput";

// Imagem do Logo (coloque o logo na pasta public ou src/assets)
// Se colocar em public: const furiaLogo = '/furia-logo-preto.svg'; // Exemplo
// Se colocar em src/assets: import furiaLogo from '../../assets/furia-logo.svg';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]); // Estado para guardar as mensagens
  const [isBotTyping, setIsBotTyping] = useState(false); // Estado para indicar se o bot está "digitando"

  // Mensagem inicial do bot
  useEffect(() => {
    setMessages([
      {
        id: Date.now(),
        text: "E aí, FURIOSO! Pronto pra trocar uma ideia? Manda a bala! #DIADEFURIA",
        sender: "bot",
      },
    ]);
  }, []);

  // Função para adicionar mensagem do usuário e obter resposta do bot
  const handleSendMessage = (userText: string) => {
    if (!userText.trim()) return; // Ignora mensagens vazias

    // 1. Adiciona a mensagem do usuário à lista
    const newUserMessage: Message = {
      id: Date.now(), // Usar Date.now() é simples para IDs únicos aqui
      text: userText,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // 2. Simula o bot "digitando"
    setIsBotTyping(true);

    // 3. Obtém a resposta do bot (com um pequeno delay)
    setTimeout(() => {
      const botText = getBotResponse(userText); // Chama a função do botService
      const newBotMessage: Message = {
        id: Date.now() + 1, // Garante ID diferente do user
        text: botText,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      setIsBotTyping(false); // Bot terminou de "digitar"
    }, 1000 + Math.random() * 500); // Delay de 1 a 1.5 segundos
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatbotHeader}>
        {/* <img src={furiaLogo} alt="FURIA Logo" className={styles.logo} /> */}
        <h2>FuricoBot</h2>
        <span className={styles.statusIndicator}>Online</span>
      </div>
      <MessageList messages={messages} isBotTyping={isBotTyping} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chatbot;
