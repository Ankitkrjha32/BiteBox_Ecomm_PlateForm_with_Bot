import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';

const Chatbot = ({ productDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi there! 👋 I'm your product assistant. How can I help you today?",
      sender: 'bot',
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!currentMessage.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      text: currentMessage,
      sender: 'user',
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);
    
    try {
      // Send message and product details to backend
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${BACKEND_URL}/api/v1/products/chatbot`, {
        question: currentMessage,
        productDetails,
      });
      console.log('Chatbot response:', response.data.response);
      // Add bot response to chat
      setMessages((prev) => [
        ...prev,
        {
          text: response.data.response || "I'm sorry, I couldn't process that request.",
          sender: 'bot',
        },
      ]);
    } catch (error) {
      console.error('Error communicating with chatbot:', error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble connecting right now. Please try again later.",
          sender: 'bot',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Chatbot toggle button */}
      <button 
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-all duration-300 ease-in-out hover:scale-105 ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        onClick={toggleChatbot}
      >
        {isOpen ? <FaTimes /> : <FaComments />}
      </button>
      
      {/* Chatbot dialog */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
          <div className="px-5 py-4 bg-blue-500 text-white flex justify-between items-center rounded-t-xl">
            <h3 className="m-0 text-lg font-medium">Product Assistant</h3>
            <button className="bg-transparent border-none text-white text-lg cursor-pointer" onClick={toggleChatbot}>
              <FaTimes />
            </button>
          </div>
          
          <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex mb-3 ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                  ${msg.sender === 'bot' 
                    ? 'bg-blue-100 text-gray-800 rounded-bl-sm' 
                    : 'bg-blue-500 text-white rounded-br-sm'}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="flex items-center h-8 min-w-[60px] bg-blue-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <span className="h-2 w-2 bg-gray-500 rounded-full opacity-40 mx-0.5 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="h-2 w-2 bg-gray-500 rounded-full opacity-40 mx-0.5 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  <span className="h-2 w-2 bg-gray-500 rounded-full opacity-40 mx-0.5 animate-bounce" style={{ animationDelay: '0.6s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="p-3 flex border-t border-gray-200 bg-white" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Type your question here..."
              disabled={isLoading}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-blue-500 transition-colors"
            />
            <button 
              type="submit" 
              disabled={isLoading || !currentMessage.trim()}
              className={`w-10 h-10 rounded-full border-none ml-2 flex items-center justify-center transition-colors
                ${isLoading || !currentMessage.trim() 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'} text-white`}
            >
              <FaPaperPlane className="text-sm" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
