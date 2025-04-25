import React, { useState } from "react";
import styles from "./ChatInput.module.css";

interface ChatInputProps {
  onSendMessage: (text: string) => void; // Função para enviar a mensagem (recebida do pai)
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Impede o recarregamento da página
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText(""); // Limpa o input após enviar
    }
  };

  return (
    <form className={styles.chatInputForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.inputField}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Digite sua mensagem..."
        aria-label="Campo de mensagem"
      />
      <button
        type="submit"
        className={styles.sendButton}
        aria-label="Enviar mensagem"
      >
        {/* Pode adicionar um ícone de enviar aqui depois */}
        Enviar
      </button>
    </form>
  );
};

export default ChatInput;
