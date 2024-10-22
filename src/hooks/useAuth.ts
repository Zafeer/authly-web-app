import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useSnackbar } from 'notistack';
import {
  IForgotPasswordForm,
  ILoginForm,
  ISignUpForm,
  IVerifyEmailForm,
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  IResetPasswordForm,
} from '@/redux/auth/authApiSlice';
import {
  selectCurrentAuthState,
  selectCurrentLoginStatus,
  selectCurrentRefreshToken,
  setCredentials,
  unsetCredentials,
} from '@/redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import useConfig from './useConfig';

type ErrorObject = {
  success: false;
  message: string;
  data: {
    code: number;
    details: string;
  };
};
/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

/**
 * Type predicate to narrow an unknown data property in `FetchBaseQueryError`
 */
export function hasErrorObject(obj: unknown): obj is { error: ErrorObject } {
  return typeof obj === 'object' && obj !== null && 'data' in obj;
}

/**
 * Custom hook for handling authentication-related functionality.
 * Manages login, logout, and provides necessary data and loading states.
 */
export default function useAuth() {
  const {
    config: {},
  } = useConfig();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();
  const [loginApi, { isLoading: loginLoading }] = useLoginMutation();
  const [signUpApi, { isLoading: signUpLoading }] = useSignUpMutation();
  const [verifyEmailApi, { isLoading: verifyEmailLoading }] = useVerifyEmailMutation();
  const [forgotPasswordApi, { isLoading: forgotPasswordLoading }] = useForgotPasswordMutation();
  const [resetPasswordApi, { isLoading: resetPasswordLoading }] = useResetPasswordMutation();
  const [logoutApi, { isLoading: logoutLoading }] = useLogoutMutation();

  const refreshToken = useAppSelector(selectCurrentRefreshToken);
  const isLoggedIn = useAppSelector(selectCurrentLoginStatus);
  const authData = useAppSelector(selectCurrentAuthState);

  /**
   * Performs login with the provided login form values.
   * @param values - credentials.
   */
  const login = async (values: ILoginForm): Promise<boolean> => {
    try {
      const response = await loginApi({
        ...values,
      }).unwrap();
      if (response?.success) {
        dispatch(setCredentials({ ...response?.data, expires: 10 }));
        enqueueSnackbar('Login Successful', { variant: 'success' });
        return true;
      } else {
        enqueueSnackbar('Login Failed', { variant: 'error' });
        return false;
      }
    } catch (err) {
      if (isFetchBaseQueryError(err) && hasErrorObject(err?.data)) {
        enqueueSnackbar(`${err?.data?.message}`, { variant: 'error' });
      }
      return false;
    }
  };

  /**
   * Performs sign up with the provided sign up form values.
   * @param values - credentials.
   */
  const signUp = async (values: ISignUpForm): Promise<boolean> => {
    try {
      const response = await signUpApi({
        ...values,
      }).unwrap();
      if (response?.success) {
        // dispatch(setCredentials({ ...response?.data, expires: 10 }));
        enqueueSnackbar('Sign Up Successful', { variant: 'success' });
        return true;
      } else {
        enqueueSnackbar('Sign Up Failed', { variant: 'error' });
        return false;
      }
    } catch (err) {
      if (isFetchBaseQueryError(err) && hasErrorObject(err?.data)) {
        enqueueSnackbar(`${err?.data?.message}`, { variant: 'error' });
      }
      return false;
    }
  };

  /**
   * Performs verify email up with the provided sign up form values.
   * @param values - credentials.
   */
  const verifyEmail = async (values: IVerifyEmailForm): Promise<boolean> => {
    try {
      const response = await verifyEmailApi({
        ...values,
      }).unwrap();
      if (response?.success) {
        dispatch(setCredentials({ ...response?.data, expires: 10 }));
        enqueueSnackbar('Verification Successful', { variant: 'success' });
        return true;
      } else {
        enqueueSnackbar('Verification Failed', { variant: 'error' });
        return false;
      }
    } catch (err) {
      if (isFetchBaseQueryError(err) && hasErrorObject(err?.data)) {
        const errorMessage = err?.data?.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      } else {
        enqueueSnackbar('An unexpected error occurred', { variant: 'error' });
      }
      return false;
    }
  };

  /**
   * Performs forgot password.
   * @param values - credentials.
   */
  const forgotPassword = async (values: IForgotPasswordForm): Promise<boolean> => {
    try {
      const response = await forgotPasswordApi({
        ...values,
      }).unwrap();
      if (response?.success) {
        enqueueSnackbar('Password Reset Email Sent', { variant: 'success' });
        return true;
      } else {
        enqueueSnackbar('Forgot Password Flow Failed', { variant: 'error' });
        return false;
      }
    } catch (err) {
      if (isFetchBaseQueryError(err) && hasErrorObject(err?.data)) {
        const errorMessage = err?.data?.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      } else {
        enqueueSnackbar('An unexpected error occurred', { variant: 'error' });
      }
      return false;
    }
  };

  /**
   * Performs reset password.
   * @param values - credentials.
   */
  const resetPassword = async (values: IResetPasswordForm): Promise<boolean> => {
    try {
      const response = await resetPasswordApi({
        ...values,
      }).unwrap();
      if (response?.success) {
        enqueueSnackbar('Password Reset Successful', { variant: 'success' });
        return true;
      } else {
        enqueueSnackbar('Password Reset Failed', { variant: 'error' });
        return false;
      }
    } catch (err) {
      if (isFetchBaseQueryError(err) && hasErrorObject(err?.data)) {
        const errorMessage = err?.data?.message;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      } else {
        enqueueSnackbar('An unexpected error occurred', { variant: 'error' });
      }
      return false;
    }
  };

  /**
   * Performs logout by making a request to the logout API endpoint and clearing storages.
   */
  const logout = async () => {
    try {
      await logoutApi(refreshToken).unwrap();
      dispatch(unsetCredentials());
    } catch (err) {
      console.error(err); // NOSONAR
    }
  };

  return {
    isLoggedIn,
    login,
    authData,
    loginLoading,
    signUp,
    signUpLoading,
    verifyEmail,
    verifyEmailLoading,
    forgotPassword,
    forgotPasswordLoading,
    resetPassword,
    resetPasswordLoading,
    logout,
    logoutLoading,
  };
}
