import React, { useState } from 'react';
import OpenAI from 'openai';

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

  const openai = new OpenAI({
    apiKey: 'YOUR_API_KEY_HERE',  // Replace with the provided API key
  });

  const handleSend = async () => {
    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: `Given the ML Engineer salary data, provide insights: ${input}`,
      max_tokens: 150,
    });

    setMessages([...messages, { role: 'user', content: input }, { role: 'assistant', content: response.choices[0].text }]);
    setInput('');
  };

  return (
    <div>
      <div>
        {messages.map((msg: any, index) => (
          <div key={index} className={msg.role}>
            {msg.content}
          </div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatApp;
