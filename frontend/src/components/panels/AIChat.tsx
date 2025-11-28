import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User, Trash2 } from 'lucide-react';
import { GlowingBox } from '@/components/ui/GlowingBox';
import { useCourseStore } from '@/store/courseStore';
import type { ChatMessage } from '@/types/course';

export function AIChat() {
  const { chatMessages, sendChatMessage, clearChat, isChatting } = useCourseStore();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isChatting) return;

    const message = inputValue;
    setInputValue('');
    await sendChatMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <GlowingBox className="p-4 flex flex-col h-[400px]" glowColor="purple" intensity="medium">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-prometheus-text-primary">
            AI Assistant
          </h2>
        </div>
        <button
          onClick={clearChat}
          className="p-1.5 rounded-lg text-prometheus-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
          title="Clear chat"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
        {chatMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bot className="w-12 h-12 text-purple-400/50 mb-3" />
            <p className="text-prometheus-text-muted text-sm">
              Ask me anything about your course!
            </p>
            <p className="text-prometheus-text-muted/60 text-xs mt-1">
              I can help with objectives, content ideas, and more.
            </p>
          </div>
        ) : (
          chatMessages.map((message) => (
            <ChatMessageBubble key={message.id} message={message} formatTime={formatTime} />
          ))
        )}

        {/* Typing Indicator */}
        {isChatting && (
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-purple-400" />
            </div>
            <div className="p-3 rounded-lg bg-prometheus-bg-tertiary border border-purple-500/20">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your course..."
          className="prometheus-textarea flex-1 resize-none h-10 min-h-[40px] py-2"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!inputValue.trim() || isChatting}
          className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Suggestions */}
      <div className="flex flex-wrap gap-2 mt-2">
        {['Suggest objectives', 'Review my course', 'Add more detail'].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setInputValue(suggestion)}
            className="text-xs px-2 py-1 rounded bg-prometheus-bg-tertiary text-prometheus-text-muted hover:text-purple-400 hover:bg-purple-500/10 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </GlowingBox>
  );
}

interface ChatMessageBubbleProps {
  message: ChatMessage;
  formatTime: (timestamp: string) => string;
}

function ChatMessageBubble({ message, formatTime }: ChatMessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-prometheus-cyan-500/20' : 'bg-purple-500/20'
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-prometheus-cyan-400" />
        ) : (
          <Bot className="w-4 h-4 text-purple-400" />
        )}
      </div>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isUser
            ? 'bg-prometheus-cyan-500/10 border border-prometheus-cyan-500/20'
            : 'bg-prometheus-bg-tertiary border border-purple-500/20'
        }`}
      >
        <p className="text-sm text-prometheus-text-primary whitespace-pre-wrap">
          {message.content}
        </p>
        <span className="text-xs text-prometheus-text-muted mt-1 block">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
