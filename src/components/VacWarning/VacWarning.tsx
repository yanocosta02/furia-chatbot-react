import React from "react";
import styles from "./VacWarning.module.css";
import { IoWarningOutline } from "react-icons/io5"; // Ícone de aviso
import { IoClose } from "react-icons/io5"; // Ícone de fechar

interface VacWarningProps {
  onDismiss: () => void; // Função para fechar o aviso
}

const VacWarning: React.FC<VacWarningProps> = ({ onDismiss }) => {
  return (
    <div className={styles.warningContainer}>
      <IoWarningOutline className={styles.warningIcon} />
      <div className={styles.warningText}>
        <strong>Atenção!</strong> Linguagem tóxica pode resultar em VAC Ban 😉.
      </div>
      <button
        className={styles.closeButton}
        onClick={onDismiss}
        aria-label="Fechar aviso" // Para acessibilidade
      >
        <IoClose />
      </button>
    </div>
  );
};
export default VacWarning;
