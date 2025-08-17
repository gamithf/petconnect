import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => setShowChat(prev => !prev);
  const openChat = () => setShowChat(true);
  const closeChat = () => setShowChat(false);

  return (
    <ChatContext.Provider value={{ showChat, toggleChat, openChat, closeChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);