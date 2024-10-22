import React, { createContext, useState, ReactNode } from 'react';

export interface EmailContextType {
  email: string;
  setEmail: (email: string) => void;
}

export const EmailContext = createContext<EmailContextType | undefined>(undefined);

interface EmailProviderProps {
  children: ReactNode;
}

export const EmailProvider: React.FC<EmailProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string>('');

  return <EmailContext.Provider value={{ email, setEmail }}>{children}</EmailContext.Provider>;
};
