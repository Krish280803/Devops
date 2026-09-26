import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';

interface AiTutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const AiTutorDrawer: React.FC<AiTutorDrawerProps> = ({
  isOpen,
  onClose,
  initialPrompt = '',
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: 'Hello! I am your AI DevOps Mentor. Ask me any technical question, clarification, or analogy!' }
  ]);
  const [input, setInput] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'tutor', userPrompt: userText }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'ai', text: data.reply || 'No response received.' }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'ai', text: 'Error connecting to AI mentor service.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-devops-dark border-l border-devops-border shadow-2xl flex flex-col">
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-4 border-b border-devops-border bg-devops-card">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">AI DevOps Mentor</h3>
            <p className="text-[10px] text-slate-400">Contextual Learning Assistant</p>
          </div>
        </div>
        <button onClick={onClose} className="rounded p-1 text-slate-400 hover:text-white hover:bg-slate-800">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 text-xs ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded ${
              msg.sender === 'user' ? 'bg-sky-600 text-white' : 'bg-purple-600 text-white'
            }`}>
              {msg.sender === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
            </div>
            <div className={`rounded-lg p-3 max-w-[85%] whitespace-pre-wrap leading-relaxed border ${
              msg.sender === 'user'
                ? 'bg-sky-600/20 border-sky-500/30 text-sky-100'
                : 'bg-devops-card border-devops-border text-slate-200'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-xs text-sky-400 animate-pulse flex items-center gap-2">
            <Sparkles className="h-3 w-3" /> AI Mentor is thinking...
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-devops-border bg-devops-card/80 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question about this lesson..."
          className="flex-1 rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="rounded-lg bg-brand-600 p-2 text-white hover:bg-brand-500 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
