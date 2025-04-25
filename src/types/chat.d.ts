export interface Message {
  id: number; // Identificador único para cada mensagem
  text: string; // O conteúdo da mensagem
  sender: "user" | "bot"; // Quem enviou: o usuário ou o bot
}
