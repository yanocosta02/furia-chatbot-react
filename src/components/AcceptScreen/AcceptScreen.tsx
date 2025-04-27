import React, { useState, useEffect, useRef } from "react";
import styles from "./AcceptScreen.module.css";

interface AcceptScreenProps {
  onAccept: () => void;
}

// --- Configuração ---
const COUNTDOWN_START = 30;
const ACCEPT_SOUND_SRC = "/accept_sound.mp3"; // <-- **CONFIRME O NOME DO SEU ARQUIVO**

const AcceptScreen: React.FC<AcceptScreenProps> = ({ onAccept }) => {
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_START);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current!);
          setIsTimedOut(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    audioRef.current = new Audio(ACCEPT_SOUND_SRC);
    audioRef.current.preload = "auto";
  }, []);

  const handleAcceptClick = () => {
    if (isTimedOut) return;

    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((e) =>
          console.error(
            "Erro ao tocar áudio (necessário interação do usuário?):",
            e
          )
        );
    } else {
      console.warn("Elemento de áudio não está pronto.");
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    onAccept();
  };

  // Formata o tempo para 0:SS
  const formatTime = (seconds: number): string => {
    const displaySeconds = String(seconds).padStart(2, "0");
    return `0:${displaySeconds}`;
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.acceptBox}>
        {/* Título Atualizado */}
        <h2 className={styles.title}>A SUA CONVERSA ESTÁ PRONTA!</h2>

        <p className={styles.subtitle}>Furico está pronto para interagir.</p>

        {/* Mensagem de Timeout (condicional) */}
        {isTimedOut && <p className={styles.timeoutMessage}>Tempo Esgotado!</p>}

        {/* Botão Aceitar */}
        <button
          className={styles.acceptButton}
          onClick={handleAcceptClick}
          disabled={isTimedOut}
        >
          ACEITAR
        </button>

        {/* Timer (AGORA FORA e ABAIXO do botão) */}
        {!isTimedOut && (
          <div className={styles.timerContainer}>
            {" "}
            {/* Div container para o timer */}
            {formatTime(timeLeft)} {/* Usa a função de formatação */}
          </div>
        )}

        {!isTimedOut && (
          <p className={styles.tip}>Clique em ACEITAR para começar.</p>
        )}
      </div>
    </div>
  );
};

export default AcceptScreen;
