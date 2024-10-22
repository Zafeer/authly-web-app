import { Middleware } from '@reduxjs/toolkit';

const storageMiddleware: Middleware = () => (next) => (action: unknown) => {
  const typedAction = action as {
    type: string;
    payload: { accessToken: string; refreshToken: string; expires: string };
  };

  if (typedAction.type === 'auth/setCredentials') {
    const { accessToken, refreshToken, expires } = typedAction.payload;

    // Update localStorage
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expires', expires?.toString());
  }

  if (typedAction.type === 'auth/unsetCredentials') {
    localStorage.clear();
    sessionStorage.clear();
  }

  // Pass the action to the next middleware or reducer
  return next(action);
};

export default storageMiddleware;
