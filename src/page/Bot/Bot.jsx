import { useState } from 'react';
import './Bot.css'

const Card = ({ children, className = '' }) => (
  <div className={`shadow-lg p-4 ${className} card`}>{children}</div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`overflow-y-auto ${className} Card-content`}>{children}</div>
);

const Button = ({ children, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-bold ${className} button`}
  >
    {children}
  </button>
);

const Input = ({ value, onChange, onKeyDown, placeholder, className = '' }) => (
  <input
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
    className={`px-3 py-2 outline-none w-full ${className} input`}
  />
);
const systemPrompt = `
Você é um assistente conversacional para os fãs da equipe de CS:GO da FURIA. 
Responda com entusiasmo, use emojis quando fizer sentido e traga informações sobre o time, jogadores, próximos jogos, história da FURIA e curiosidades. 
Se a pergunta não estiver relacionada à FURIA, gentilmente redirecione o usuário ao foco principal: FURIA Esports. 
Fale como um fã apaixonado de CS. Estamos no ano de 2025 e no mês de Maio no dia 4 então mostre os jogos e o elenco da furia desse ano e a partir desse mês e desse dia, caso o usuário perguntar, mostre resultados dos ultimos jogos.
próximo jogho da fúria dia 10/05
`;
export default function FuriaChatApp() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Fala, fã da FURIA! Em que posso te ajudar hoje?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
  
    const botText = await getBotReply(input);
    const botMessage = { from: 'bot', text: botText };
    setMessages((prev) => [...prev, botMessage]);
    setInput('');
  };

  const getBotReply = async (userInput) => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        // model: "gpt-3.5-turbo",
        model: "gpt-4-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userInput }
        ],
        temperature: 0.7
      })
    });
  
    const data = await response.json();
    return data.choices[0].message.content;
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">Chat Fã FURIA</h1>
      <Card className="w-full max-w-md bg-gray-900">
        <CardContent className="space-y-2 max-h-96 p-40">
          {messages.map((msg, idx) => (
            <div
            key={idx}
            className={`text-sm p-2 ${msg.from === 'bot' ? 'bg-purple-700 text-white self-start start' : 'bg-gray-800 text-white self-end'}`}
            >
              {msg.text}
            </div>
          ))}
        </CardContent>
        <div className="flex items-center gap-2 p-4 border-t border-gray-700">
          <Input
            className="bg-gray-800 text-white pergunta"
            placeholder="Digite sua pergunta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
          <Button onClick={handleSend} className="bg-purple-700 hover:bg-purple-800 text-white cursor-pointer button">
            Enviar
          </Button>
        </div>
      </Card>
    </div>
  );
}
