// src/services/botService.ts

// --- DADOS (SEMI)-ESTÁTICOS DOS JOGOS ---
// IMPORTANTE: Atualize estas informações manualmente após os jogos!
const lastMatchInfo = {
  opponent: "Team Spirit", // Ex: Nome do último oponente
  score: "Derrota (1-2)", // Ex: Resultado (Vitória/Derrota e placar se simples)
  event: "IEM Katowice 2024", // Ex: Nome do campeonato
  detailsAvailable: true, // Mude para false se não tiver info recente
};

const nextMatchInfo = {
  opponent: "Natus Vincere", // Ex: Nome do próximo oponente (ou null se não confirmado)
  date: "25/07, 14:00 BRT", // Ex: Data e hora (seja claro sobre fuso!)
  event: "BLAST Premier Fall Groups", // Ex: Nome do campeonato
  isConfirmed: true, // Mude para false se o próximo jogo ainda não estiver definido
};
// --- FIM DOS DADOS (SEMI)-ESTÁTICOS ---

export function getBotResponse(userMessage: string): string {
  const lowerCaseMessage = userMessage.toLowerCase();

  // Saudações (Mantido igual, mas com nome Furico)
  if (
    lowerCaseMessage.includes("oi") ||
    lowerCaseMessage.includes("ola") ||
    lowerCaseMessage.includes("eae") ||
    lowerCaseMessage.includes("salve")
  ) {
    return "E aí! Aqui é o Furico, firmeza? Manda a braba aí. #DIADEFURIA";
  }

  // Time / Lineup (Mantido igual)
  if (
    lowerCaseMessage.includes("time") ||
    lowerCaseMessage.includes("jogadores") ||
    lowerCaseMessage.includes("lineup") ||
    lowerCaseMessage.includes("line") ||
    lowerCaseMessage.includes("roster")
  ) {
    // IMPORTANTE: Verifique a lineup atual da FURIA CS!
    return "A line atual tem KSCERATO, yuurih, FalleN, chelo e skullz! Com o coach guerri no comando! 🔥"; // ATENÇÃO: Verifique se essa line ainda é a atual!
  }

  // Próximo Jogo / Agenda (Ação Específica)
  if (
    lowerCaseMessage.includes("proximo jogo") ||
    lowerCaseMessage.includes("próximo jogo") ||
    lowerCaseMessage.includes("proxima partida") ||
    lowerCaseMessage.includes("próxima partida") ||
    lowerCaseMessage.includes("agenda") ||
    lowerCaseMessage.includes("calendario")
  ) {
    if (nextMatchInfo.isConfirmed && nextMatchInfo.opponent) {
      // Se temos informação específica
      return `Anota aí! 📝 O próximo confronto da FURIA é contra a ${nextMatchInfo.opponent} pela ${nextMatchInfo.event}. Marcado para ${nextMatchInfo.date}! Prepara a torcida! #DIADEFURIA\n\nAgenda completa aqui: https://www.hltv.org/matches?team=8297`;
    } else {
      // Se não temos informação específica
      return "Opa! Ainda estou procurando os detalhes do próximo jogo. Assim que souber, eu te aviso! 😉 Por enquanto, fica de olho na agenda geral aqui: https://www.hltv.org/matches?team=8297";
    }
  }

  // Último Jogo / Resultado (Ação Específica)
  if (
    lowerCaseMessage.includes("ultimo jogo") ||
    lowerCaseMessage.includes("último jogo") ||
    lowerCaseMessage.includes("resultado") ||
    lowerCaseMessage.includes("perdeu") ||
    lowerCaseMessage.includes("ganhou")
  ) {
    if (lastMatchInfo.detailsAvailable && lastMatchInfo.opponent) {
      // Se temos informação específica
      return `No último jogo, pela ${lastMatchInfo.event}, o resultado contra ${lastMatchInfo.opponent} foi: ${lastMatchInfo.score}. Pra ver todos os detalhes e estatísticas: https://www.hltv.org/results?team=8297`;
    } else {
      // Se não temos informação específica
      return "Hmm, minha memória tá dando umas travadas sobre o último resultado exato 😅. Mas você pode conferir todos os resultados recentes da pantera aqui: https://www.hltv.org/results?team=8297";
    }
  }

  // Loja / Produtos (Mantido igual)
  if (
    lowerCaseMessage.includes("loja") ||
    lowerCaseMessage.includes("camisa") ||
    lowerCaseMessage.includes("produtos") ||
    lowerCaseMessage.includes("merch") ||
    lowerCaseMessage.includes("comprar")
  ) {
    return "Quer garantir o manto ou outros produtos irados? Acessa a loja oficial: https://furiastore.com/";
  }

  // Redes Sociais (Mantido igual)
  if (
    lowerCaseMessage.includes("social") ||
    lowerCaseMessage.includes("redes sociais") ||
    lowerCaseMessage.includes("twitter") ||
    lowerCaseMessage.includes("instagram") ||
    lowerCaseMessage.includes("insta")
  ) {
    return "Segue a gente pra não perder nada! Twitter: @furia | Instagram: @furia";
  }

  // Agradecimento / Despedida (Mantido igual)
  if (
    lowerCaseMessage.includes("obrigado") ||
    lowerCaseMessage.includes("vlw") ||
    lowerCaseMessage.includes("valeu") ||
    lowerCaseMessage.includes("thx") ||
    lowerCaseMessage.includes("tchau")
  ) {
    return "Tamo junto! Precisando, é só chamar o Furico aqui! #DIADEFURIA";
  }

  // Respostas Padrão (Fallback - Mantido igual)
  const randomResponses = [
    "Opa! Essa aí eu não peguei, manda outra!",
    "Essa aí foi nível clutch 1v5... não entendi. Pode tentar de novo?",
    "Minha mira não focou nessa pergunta. Tente ser mais específico!",
    "Ainda tô aprendendo os comandos! Que tal perguntar sobre a line-up ou os jogos?",
    "Hmm, acho que preciso de mais café pra processar essa! ☕ Tenta de novo?",
  ];
  return randomResponses[Math.floor(Math.random() * randomResponses.length)];
}
