import React, { useState, useEffect, useRef } from "react"; // <-- Importar useEffect e useRef
import styles from "./AcceptScreen.module.css";

interface AcceptScreenProps {
  onAccept: () => void;
}

// --- Configuração ---
// Função para formatar o tempo como 0:SS
const formatTime = (seconds: number): string => {
  // Converte para string e adiciona um '0' à esquerda se for menor que 10
  const displaySeconds = String(seconds).padStart(2, "0");
  return `0:${displaySeconds}`;
};
const COUNTDOWN_START = 30; // Tempo inicial em segundos
const ACCEPT_SOUND_SRC = "/audioAccept.mp3";

const AcceptScreen: React.FC<AcceptScreenProps> = ({ onAccept }) => {
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_START);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Para guardar o ID do intervalo
  const audioRef = useRef<HTMLAudioElement | null>(null); // Para o elemento de áudio

  // Efeito para o contador regressivo
  useEffect(() => {
    // Limpa qualquer intervalo anterior ao montar (segurança)
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Inicia um novo intervalo
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current!); // Limpa o intervalo
          setIsTimedOut(true); // Marca que o tempo esgotou
          return 0; // Mantém em 0
        }
        return prevTime - 1; // Decrementa o tempo
      });
    }, 1000); // Executa a cada 1 segundo

    // Função de limpeza: executada quando o componente desmonta
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Prepara o áudio (mas não toca ainda)
  useEffect(() => {
    // Cria o elemento de áudio uma vez
    audioRef.current = new Audio(ACCEPT_SOUND_SRC);
    audioRef.current.preload = "auto"; // Tenta pré-carregar
  }, []);

  // Função chamada ao clicar em ACEITAR
  const handleAcceptClick = () => {
    if (isTimedOut) return; // Não faz nada se o tempo esgotou

    // Toca o som de aceite
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((e) => console.error("Erro ao tocar áudio:", e));
    } else {
      console.warn("Elemento de áudio não está pronto.");
    }

    // Limpa o intervalo imediatamente para parar o contador
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Chama a função do App.tsx para mudar para o chat
    onAccept();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.acceptBox}>
        <h2 className={styles.title}>CONVERSA ENCONTRADA!</h2>
        <p className={styles.subtitle}>Furico está pronto para interagir.</p>

        {/* Mensagem de Timeout (condicional) */}
        {isTimedOut && <p className={styles.timeoutMessage}>Tempo Esgotado!</p>}

        <button
          className={styles.acceptButton}
          onClick={handleAcceptClick}
          disabled={isTimedOut} // Desabilita o botão se o tempo esgotou
        >
          ACEITAR
        </button>

        {/* Onde você mostra o timer */}
        {!isTimedOut && ( // Mostra o timer apenas se não esgotou
          // Chama a função formatTime passando timeLeft
          // Garanta que o className corresponda ao seu CSS (.timer ou .timerContainer)
          <p className={styles.timerContainer}>{formatTime(timeLeft)}</p>
        )}
      </div>
    </div>
  );
};

export default AcceptScreen;
