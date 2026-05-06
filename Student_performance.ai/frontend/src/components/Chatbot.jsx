import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send, Bot, User, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your AI Academic Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [modelType, setModelType] = useState('gemini'); // 'gemini' or 'gpt'
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: input,
        modelType: modelType
      });
      
      setMessages(prev => [...prev, { role: 'bot', text: response.data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I encountered an error. Is the backend running?' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="btn-primary"
        style={{ 
          position: 'fixed', 
          bottom: '2rem', 
          right: '2rem', 
          borderRadius: '50%', 
          width: '60px', 
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)'
        }}
      >
        <MessageCircle size={30} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="glass-card"
            style={{ 
              position: 'fixed', 
              bottom: '6rem', 
              right: '2rem', 
              width: '400px', 
              height: '550px',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              padding: '0'
            }}
          >
            {/* Header */}
            <div style={{ 
              padding: '1.5rem', 
              borderBottom: '1px solid var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(99, 102, 241, 0.1)',
              borderRadius: '1.5rem 1.5rem 0 0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Bot color="var(--primary)" />
                <div>
                  <h4 style={{ margin: 0 }}>AI Tutor</h4>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Online</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <select 
                  value={modelType} 
                  onChange={(e) => setModelType(e.target.value)}
                  style={{ 
                    background: 'transparent', 
                    color: 'var(--text-muted)', 
                    border: '1px solid var(--glass-border)',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    padding: '2px 4px'
                  }}
                >
                  <option value="gemini">Gemini 1.5</option>
                  <option value="gpt">GPT-4 Turbo</option>
                </select>
                <X style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              style={{ 
                flex: 1, 
                overflowY: 'auto', 
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              {messages.map((msg, idx) => (
                <div key={idx} style={{ 
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  display: 'flex',
                  gap: '0.5rem',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
                }}>
                  <div style={{ 
                    width: '30px', 
                    height: '30px', 
                    borderRadius: '50%', 
                    background: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div style={{ 
                    padding: '0.8rem', 
                    borderRadius: '1rem', 
                    background: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                    fontSize: '0.9rem',
                    lineHeight: '1.4'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Thinking...</div>}
            </div>

            {/* Input */}
            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything..."
                  style={{ 
                    width: '100%', 
                    background: 'rgba(15, 23, 42, 0.5)', 
                    border: '1px solid var(--glass-border)',
                    borderRadius: '2rem',
                    padding: '0.8rem 3rem 0.8rem 1.2rem',
                    color: 'white',
                    outline: 'none'
                  }}
                />
                <button 
                  onClick={handleSend}
                  style={{ 
                    position: 'absolute', 
                    right: '8px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    background: 'var(--primary)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Send size={16} color="white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
