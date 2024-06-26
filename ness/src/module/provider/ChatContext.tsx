import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  ReactElement,
} from "react";

interface ChatContextType {
  message: string;
  setMessage: (message: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement | null => {
  const [message, setMessage] = useState<string>("");

  // children이 없는 경우 React.Fragment로 대체하여 항상 ReactElement를 반환합니다.
  return (
    <ChatContext.Provider value={{ message, setMessage }}>
      {children || <React.Fragment />}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
