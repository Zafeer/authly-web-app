import { apiSlice } from '../apiSlice';
import { User } from './user.model';

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IForgotPasswordForm {
  email: string;
}

export interface IVerifyEmailForm {
  email: string;
  otpToken: string;
}

export interface IResetPasswordForm {
  email: string;
  password: string;
  confirmPassword: string;
  otpToken: string;
}
export type IResetPasswordFormWithoutConfirm = Omit<IResetPasswordForm, 'confirmPassword'>;

export interface ISignUpForm {
  name: string;
  email: string;
  confirmPassword: string;
  password: string;
}
export type ISignUpFormWithoutConfirm = Omit<ISignUpForm, 'confirmPassword'>;

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: ILoginForm) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    signUp: builder.mutation({
      query: (credentials: ISignUpFormWithoutConfirm) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    forgotPassword: builder.mutation({
      query: (credentials: IForgotPasswordForm) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials: IResetPasswordFormWithoutConfirm) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    verifyEmail: builder.mutation({
      query: (credentials: IVerifyEmailForm) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: (refreshToken: string | null) => ({
        url: '/auth/logout',
        method: 'POST',
        body: { refreshToken },
      }),
    }),
    getUser: builder.query<User, void>({
      query: () => ({ url: '/auth/me' }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useGetUserQuery,
} = authApiSlice;
