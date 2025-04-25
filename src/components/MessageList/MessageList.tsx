import React, { useEffect, useRef } from "react";
import { Message as MessageType } from "../../types/chat"; // Renomeia para evitar conflito
import Message from "../Message/Message"; // Importa o componente de mensagem
import styles from "./MessageList.module.css";

interface MessageListProps {
  messages: MessageType[];
  isBotTyping: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isBotTyping }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref para o final da lista

  // Função para rolar para o final
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Rola para o final sempre que as mensagens mudam
  useEffect(scrollToBottom, [messages, isBotTyping]);

  return (
    <div className={styles.messageList}>
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
      {isBotTyping && (
        <div className={styles.typingIndicator}>
          <span></span>
          <span></span>
          <span></span> {/* Bolinhas de "digitando" */}
        </div>
      )}
      {/* Elemento invisível no final para ajudar no scroll */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
