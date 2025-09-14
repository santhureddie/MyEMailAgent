import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

const ChatBubble: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m your EmailAgent assistant. I can help you with email categorization, drafting replies, setting reminders, and more. What would you like me to help you with?',
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('categorize') || input.includes('category')) {
      return 'I can help categorize your emails! I\'ve found:\n\n📧 Job Opportunities (3 emails)\n👤 Personal (5 emails)\n🚨 Urgent (1 email)\n📢 Promotions (7 emails)\n\nWould you like me to show you the details of any category?';
    }
    
    if (input.includes('draft') || input.includes('reply')) {
      return 'I can help you draft a reply! Here are some options:\n\n✉️ **Formal**: "Thank you for your email. I will review this and get back to you shortly."\n\n💬 **Casual**: "Hey! Thanks for reaching out. I\'ll take a look and get back to you soon."\n\n⚡ **Quick**: "Received, thanks!"\n\nWhich style would you prefer?';
    }
    
    if (input.includes('remind') || input.includes('reminder')) {
      return 'I can set reminders for you! I\'ve found these upcoming tasks:\n\n📅 Follow up with recruiter (Due: Sep 15)\n📝 Send project update (Due: Sep 18)\n💼 Review contract (Due: Sep 20)\n\nWould you like me to add a new reminder?';
    }
    
    if (input.includes('voice') || input.includes('speak')) {
      return 'Voice commands are available! You can say things like:\n\n🎤 "Summarize today\'s emails"\n🎤 "Draft a reply to John"\n🎤 "Remind me about the meeting"\n🎤 "Read my latest emails"\n\nJust click the voice button to start!';
    }
    
    if (input.includes('help') || input.includes('what can you do')) {
      return 'I can help you with:\n\n📊 **Email Categorization** - Sort emails by type\n✍️ **Draft Suggestions** - Generate replies\n⏰ **Reminders** - Extract and set reminders\n🎤 **Voice Commands** - Hands-free interaction\n\nWhat would you like to try first?';
    }
    
    return 'I understand you\'re asking about email management. I can help with categorizing emails, drafting replies, setting reminders, or voice commands. Could you be more specific about what you\'d like me to help you with?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClose = () => {
    const chatWindow = document.getElementById('emailagent-chat-window');
    if (chatWindow) {
      chatWindow.remove();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-sm">EmailAgent</h3>
            <p className="text-xs opacity-90">AI Assistant</p>
          </div>
        </div>
        <button 
          onClick={handleClose}
          className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about your emails..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
