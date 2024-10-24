import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

export interface AuthData {
  accessToken: string | null;
  refreshToken: string | null;
  expires: number | null;
}

export interface AuthState extends AuthData {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null,
  refreshToken: localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : null,
  expires: +localStorage.getItem('expires')! ? +localStorage.getItem('expires')! : null,
  isLoggedIn: !!localStorage.getItem('accessToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthData>) => {
      const { accessToken, refreshToken, expires: expiresIn } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.expires = expiresIn;
      state.isLoggedIn = true;
    },
    unsetCredentials: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.expires = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setCredentials, unsetCredentials } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectCurrentLoginStatus = (state: RootState) => state.auth.isLoggedIn;
export const selectCurrentAccessToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectCurrentAuthState = (state: RootState) => state.auth;
