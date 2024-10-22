import { useContext } from 'react';
import { EmailContext, EmailContextType } from '@/providers/EmailProvider';

export const useEmail = (): EmailContextType => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
};
