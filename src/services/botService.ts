// --- DADOS ESTÁTICOS ---
const lastMatchInfo = {
  opponent: "Team Spirit",
  score: "Derrota (1-2)",
  event: "IEM Katowice 2024",
  detailsAvailable: true,
};
const nextMatchInfo = {
  opponent: "Natus Vincere",
  date: "25/07, 14:00 BRT",
  event: "BLAST Premier Fall Groups",
  isConfirmed: true,
};

// --- ESTRUTURA DE CLASSIFICAÇÃO (COM OBJETOS) ---

const currentTournamentStandings = {
  tournamentName: "PGL Major Copenhagen 2024: American RMR",
  standings: [
    { position: 1, team: "Imperial Esports", score: "3-0" },
    { position: 2, team: "FURIA Esports", score: "3-0" },
    { position: 3, team: "paiN Gaming", score: "3-1" },
    { position: 4, team: "Complexity", score: "3-1" },
    { position: 5, team: "Legacy", score: "3-1" },
    { position: 6, team: "M80", score: "2-2" },
    { position: 7, team: "Team Liquid", score: "2-2" },
    { position: 8, team: "ODDIK", score: "2-2" },
    { position: 9, team: "RED Canids", score: "1-2" },
    { position: 10, team: "BOSS", score: "1-2" },
    { position: 11, team: "MIBR", score: "1-2" },
    { position: 12, team: "Wildcard Gaming", score: "1-2" },
    { position: 13, team: "Nouns Esports", score: "0-2" },
    { position: 14, team: "Elevate", score: "0-2" },
    { position: 15, team: "NRG", score: "0-2" },
    { position: 16, team: "BESTIA", score: "0-2" },
  ],
  sourceLink:
    "https://liquipedia.net/counterstrike/PGL/2024/Copenhagen/Americas",
  hasData: true,
};

// Função auxiliar para normalizar strings (mantida)
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// --- FUNÇÃO PARA FORMATAR A TABELA EM TEXTO ---
function formatStandingsTableText(
  data: typeof currentTournamentStandings
): string {
  if (!data.hasData || !data.standings || data.standings.length === 0) {
    return "No momento não tenho a classificação de um campeonato específico pra te mostrar.";
  }

  // Título
  let response = `📊 Classificação (${data.tournamentName}):\n`; // Adiciona duas quebras de linha

  // Adiciona cada linha formatada
  data.standings.forEach((row) => {
    const positionStr = `${row.position}.`.padEnd(4);
    const teamStr = row.team.padEnd(20);
    const scoreStr = `(${row.score})`;
    response += `${positionStr}${teamStr}${scoreStr}\n`; // Adiciona a linha e uma quebra de linha
  });

  // Adiciona a fonte, se houver
  if (data.sourceLink) {
    response += `\nFonte: ${data.sourceLink}`;
  }

  return response;
}

// --- getBotResponse (RETORNA APENAS STRING) ---
export function getBotResponse(userMessage: string): string {
  const normalizedMessage = normalizeString(userMessage);

  // Saudações
  if (
    normalizedMessage.includes("oi") ||
    normalizedMessage.includes("ola") ||
    normalizedMessage.includes("eae") ||
    normalizedMessage.includes("salve")
  ) {
    return "E aí! Aqui é o Furico, firmeza? Manda a braba aí. #DIADEFURIA";
  }

  // Time / Lineup
  if (
    normalizedMessage.includes("time") ||
    normalizedMessage.includes("jogadores") ||
    normalizedMessage.includes("lineup") ||
    normalizedMessage.includes("line") ||
    normalizedMessage.includes("roster")
  ) {
    return "A line atual tem KSCERATO, yuurih, FalleN, chelo e skullz! Com o coach guerri no comando! 🔥"; // Verifique a line atual!
  }

  // Próximo Jogo / Agenda
  if (
    normalizedMessage.includes("proximo jogo") ||
    normalizedMessage.includes("proxima partida") ||
    normalizedMessage.includes("agenda") ||
    normalizedMessage.includes("calendario") ||
    normalizedMessage.includes("jogos")
  ) {
    if (nextMatchInfo.isConfirmed && nextMatchInfo.opponent) {
      return `Anota aí! 📝 O próximo confronto da FURIA é contra a ${nextMatchInfo.opponent} pela ${nextMatchInfo.event}. Marcado para ${nextMatchInfo.date}! Prepara a torcida! #DIADEFURIA\n\nAgenda completa aqui: https://www.hltv.org/matches?team=8297`;
    } else {
      return "Opa! Ainda estou procurando os detalhes do próximo jogo. 😉 Por enquanto, fica de olho na agenda geral aqui: https://www.hltv.org/team/8297/furia";
    }
  }

  // Último Jogo / Resultado
  if (
    normalizedMessage.includes("ultimo jogo") ||
    normalizedMessage.includes("resultado") ||
    normalizedMessage.includes("perdeu") ||
    normalizedMessage.includes("ganhou")
  ) {
    if (lastMatchInfo.detailsAvailable && lastMatchInfo.opponent) {
      return `No último jogo, pela ${lastMatchInfo.event}, o resultado contra ${lastMatchInfo.opponent} foi: ${lastMatchInfo.score}. Pra ver todos os detalhes e estatísticas: https://www.hltv.org/team/8297/furia`;
    } else {
      return "Hmm, minha memória tá meio vaga sobre o último resultado exato 😅. Mas você pode conferir tudo aqui: https://www.hltv.org/team/8297/furia";
    }
  }
  // Colocada antes da classificação específica para capturar a intenção mais geral
  if (
    normalizedMessage.includes("campeonatos") ||
    normalizedMessage.includes("eventos") ||
    normalizedMessage.includes("onde a furia joga") ||
    normalizedMessage.includes("hltv")
  ) {
    // Resposta genérica direcionando para a HLTV
    return (
      "Ficar de olho nos campeonatos da Pantera? Boa! 🏆 A HLTV é o point certo pra isso, lá tem a agenda atualizada e todos os resultados passados.\n\n" +
      "📅 Agenda/Próximos Jogos: https://www.hltv.org/team/8297/furia\n" +
      "📊 Resultados Anteriores: https://www.hltv.org/team/8297/furia\n\n" +
      "Fica ligado! #DIADEFURIA"
    );
  }
  // --- LÓGICA DE CLASSIFICAÇÃO (TEXTO) ---
  if (
    normalizedMessage.includes("classificacao") ||
    normalizedMessage.includes("tabela") ||
    normalizedMessage.includes("pontos") ||
    normalizedMessage.includes("standings") ||
    normalizedMessage.includes("grupo")
  ) {
    // Chama a função de formatação de TEXTO
    return formatStandingsTableText(currentTournamentStandings);
  }
  // --- FIM DA LÓGICA DE CLASSIFICAÇÃO ---
  if (
    normalizedMessage.includes("historia") ||
    normalizedMessage.includes("conquistas")
  ) {
    return "A FURIA foi fundada em 2017 e rapidamente se tornou uma potência no CS brasileiro e mundial! Um momento inesquecível foi o Top 4 no IEM Rio Major 2022, com a torcida apoiando muito! #DIADEFURIA";
  }

  // Loja / Produtos
  if (
    normalizedMessage.includes("loja") ||
    normalizedMessage.includes("camisa") ||
    normalizedMessage.includes("produtos") ||
    normalizedMessage.includes("merch") ||
    normalizedMessage.includes("comprar")
  ) {
    return "Quer garantir o manto ou outros produtos irados? Acessa a loja oficial: https://furia.gg/";
  }

  // Redes Sociais
  if (
    normalizedMessage.includes("social") ||
    normalizedMessage.includes("redes sociais") ||
    normalizedMessage.includes("twitter") ||
    normalizedMessage.includes("instagram") ||
    normalizedMessage.includes("insta")
  ) {
    return "Segue a gente pra não perder nada! \nX: @furia | Instagram: @furiagg";
  }

  if (
    normalizedMessage.includes("liquipedia") ||
    normalizedMessage.includes("wiki") ||
    normalizedMessage.includes("informacoes") ||
    normalizedMessage.includes("informação") ||
    normalizedMessage.includes("info")
  )
    return "Acesse o perfil da FURIA na Liquipedia: https://liquipedia.net/counterstrike/FURIA_Esports";
  if (normalizedMessage.includes("youtube"))
    return "Inscreva-se no canal oficial da FURIA no YouTube: https://www.youtube.com/@FURIA";

  // Agradecimento / Despedida
  if (
    normalizedMessage.includes("obrigado") ||
    normalizedMessage.includes("vlw") ||
    normalizedMessage.includes("valeu") ||
    normalizedMessage.includes("thx") ||
    normalizedMessage.includes("tchau") ||
    normalizedMessage.includes("tamo junto") ||
    normalizedMessage.includes("até mais") ||
    normalizedMessage.includes("xau") ||
    normalizedMessage.includes("ate logo")
  ) {
    return "Tamo junto! Precisando, é só chamar o bot do Furico aqui! #DIADEFURIA";
  }

  // Respostas Padrão (Fallback)
  const randomResponses = [
    "Opa! Essa aí eu não peguei, manda outra!",
    "Essa aí foi nível clutch 1v5... não entendi. Pode tentar de novo?",
    "Minha mira não focou nessa pergunta. Tente ser mais específico!",
    "Ainda tô aprendendo os comandos! Que tal perguntar sobre a line-up ou os jogos?",
    "Hmm, acho que preciso de mais café pra processar essa! ☕ Tenta de novo?",
  ];
  return randomResponses[Math.floor(Math.random() * randomResponses.length)];
}
