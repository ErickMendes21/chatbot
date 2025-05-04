Chat Fã FURIA – Documentação
.Objetivo:
Este é um chatbot voltado para fãs da equipe de CS:GO da FURIA. O bot responde dúvidas sobre a equipe, jogos, lineup, curiosidades e muito mais, com linguagem empolgada e foco total no universo FURIA.

1. Inicialização do chat
const [messages, setMessages] = useState([
  { from: 'bot', text: 'Fala, fã da FURIA! Em que posso te ajudar hoje?' }
]);
O estado messages armazena o histórico da conversa.

2. Usuário envia uma pergunta
const handleSend = async () => {
  if (!input.trim()) return;
  ...
}
Quando o usuário digita algo e aperta Enter ou o botão "Enviar", a função handleSend é disparada.

3. A API do ChatGPT responde
const getBotReply = async (userInput) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      ...
    },
    body: JSON.stringify({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userInput }
      ],
    })
  });
Essa função usa a API da OpenAI para gerar respostas baseadas no prompt de sistema + input do usuário.

4. Prompt de sistema
const systemPrompt = `
Você é um assistente conversacional para os fãs da equipe de CS:GO da FURIA. 
Responda com entusiasmo, use emojis quando fizer sentido e traga informações sobre o time, jogadores, próximos jogos, história da FURIA e curiosidades. 
Se a pergunta não estiver relacionada à FURIA, gentilmente redirecione o usuário ao foco principal: FURIA Esports. 
Fale como um fã apaixonado de CS. Estamos no ano de 2025 e no mês de Maio no dia 4 então mostre os jogos e o elenco da furia desse ano e a partir desse mês e desse dia, caso o usuário perguntar, mostre resultados dos ultimos jogos.
`;
Esse prompt define o comportamento da IA, garantindo que ela aja como um fã animado da FURIA.

.Componentes:
Card, CardContent, Button, Input
Componentes básicos criados como wrappers estilizados para organizar a interface do chat.
