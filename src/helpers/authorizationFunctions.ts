import useAuth from '@/hooks/useAuth';

export interface AnyFunctions {
  [key: string]: (...args: unknown[]) => boolean; // NOSONAR
}

const IsAuthenticated = () => {
  // NOSONAR typescript:S100
  const { isLoggedIn } = useAuth();
  return !!isLoggedIn;
};

export const authorizationFunctions: AnyFunctions = {
  isAuthenticated: IsAuthenticated,
};
