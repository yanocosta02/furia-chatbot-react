import React from "react";
import { Message as MessageType } from "../../types/chat";
import styles from "./Message.module.css";

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === "user";
  const messageClass = isUser ? styles.userMessage : styles.botMessage;

  return (
    <div
      className={`${styles.messageRow} ${
        isUser ? styles.userRow : styles.botRow
      }`}
    >
      {!isUser && (
        <img src={"/furico.png"} alt="Bot" className={styles.avatar} />
      )}{" "}
      <div className={`${styles.messageBubble} ${messageClass}`}>
        {message.text}
      </div>
    </div>
  );
};

export default Message;
