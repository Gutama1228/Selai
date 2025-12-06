import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Trash2, Download } from 'lucide-react';
import { sendChatMessage } from '../../services/claude';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';

/**
 * AI Chat Page
 * Chat with AI assistant for seller consultation
 */
const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message to AI
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await sendChatMessage(input);

      if (error) {
        throw new Error(error);
      }

      const aiMessage = {
        role: 'assistant',
        content: data,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi dalam beberapa saat.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Clear chat
  const handleClearChat = () => {
    if (window.confirm('Yakin ingin menghapus semua percakapan?')) {
      setMessages([]);
    }
  };

  // Export chat
  const handleExportChat = () => {
    const chatText = messages.map(msg => 
      `[${msg.role === 'user' ? 'Anda' : 'AI'}]: ${msg.content}`
    ).join('\n\n');

    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Quick prompts
  const quickPrompts = [
    'Bagaimana cara meningkatkan penjualan di Shopee?',
    'Strategi pricing yang efektif untuk produk fashion',
    'Tips optimasi foto produk untuk marketplace',
    'Cara menghadapi kompetitor dengan harga lebih murah'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Chat Assistant</h1>
          <p className="text-gray-600 mt-1">Tanyakan apapun tentang strategi penjualan Anda</p>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Download className="w-4 h-4" />}
                onClick={handleExportChat}
              >
                Export
              </Button>
              <Button
                variant="danger"
                size="sm"
                leftIcon={<Trash2 className="w-4 h-4" />}
                onClick={handleClearChat}
              >
                Clear
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Chat Container */}
      <Card padding="none" className="h-[calc(100vh-300px)] flex flex-col">
        {/* Chat Header */}
        <div className="p-6 border-b bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-lg">AI Assistant</div>
              <div className="text-sm opacity-90 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Siap membantu Anda 24/7
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <Sparkles className="w-16 h-16 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Mulai percakapan dengan AI
              </h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Tanyakan tentang strategi penjualan, optimasi produk, analisis kompetitor, atau apapun yang Anda butuhkan!
              </p>
              
              {/* Quick Prompts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(prompt)}
                    className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition text-left text-sm text-gray-700 hover:text-purple-600 border border-gray-200 hover:border-purple-300"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-lg shadow-md ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words">
                      {message.content}
                    </div>
                    <div
                      className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-white/70' : 'text-gray-400'
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 p-4 rounded-lg shadow-md border border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <span className="ml-2 text-sm text-gray-500">AI sedang berpikir...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-white rounded-b-xl">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ketik pertanyaan Anda... (Enter untuk kirim, Shift+Enter untuk baris baru)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows="2"
              disabled={isLoading}
            />
            <Button
              variant="primary"
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              loading={isLoading}
              className="self-end"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 Tips: Berikan konteks yang jelas untuk mendapatkan saran yang lebih spesifik dan actionable
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AIChat;
