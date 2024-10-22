import { Box, Divider, Grid, Typography } from '@mui/material';
import arcLogo from '@/assets/logo.png';
import forgotPasswordLogo from '@/assets/forgot_password.jpg';
import Button from '@/components/Button';
import Form from '@/components/Forms/Form';
import useAuth from '@/hooks/useAuth';
import { FormikHelpers } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IResetPasswordForm } from '@/redux/auth/authApiSlice';
import * as yup from 'yup';
import FormPasswordInput from '@/components/Forms/FormPasswordInput';
import FormOtpInput from '@/components/Forms/FormOtpInput';
import { useEmail } from '@/hooks/useEmail';

const initialValues: IResetPasswordForm = {
  password: '',
  confirmPassword: '',
  otpToken: '',
};

const validationSchema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .label('Password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
    .label('Confirm Password'),
  otpToken: yup
    .string()
    .required('OTP Code is required')
    .matches(/^\d{6}$/, 'OTP Code must be exactly 6 digits')
    .label('OTP Code'),
});

const ResetPassword = () => {
  const { resetPassword, resetPasswordLoading } = useAuth();
  const { email } = useEmail();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/login';

  const handleNavigation = () => {
    navigate(from, { replace: true });
  };

  const handleSubmit = async (values: IResetPasswordForm, { setSubmitting }: FormikHelpers<IResetPasswordForm>) => {
    try {
      const { confirmPassword, ...resetPasswordValues } = values;
      const result = await resetPassword({ ...resetPasswordValues, email });
      if (result) {
        handleNavigation();
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container data-testid="ResetPasswordPage" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={5}
        sx={{
          backgroundImage: `url(${forgotPasswordLogo})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
        }}
      />
      <Grid container item xs={12} sm={8} md={7} sx={{ backgroundColor: '#abe3d0', p: { xs: 4, md: 8 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f2f3f4',
            borderRadius: 2,
          }}
        >
          <Grid container sx={{ px: 1 }} alignItems="center" justifyContent="center" textAlign="center">
            <Grid item xs={12} sx={{ justifyContent: 'center' }}>
              <Box
                component="img"
                sx={{
                  width: '22%',
                  borderRadius: '8px',
                }}
                src={arcLogo}
                alt="hero"
              />
            </Grid>
            <Grid container sx={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
              <Grid item xs={12}>
                <Typography variant="h6" color="secondary">
                  Reset password
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ py: 3 }}>
                <Typography variant="h7" textAlign="center">
                  Please enter the OTP and choose your new password.
                </Typography>
              </Grid>
              <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                <Grid container spacing={2}>
                  <Grid container item xs={12} justifyContent="center">
                    <Grid item xs={12} sx={{ mt: 3 }}>
                      <FormOtpInput id="otpToken" label="OTP Code" />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 3 }}>
                      <FormPasswordInput id="password" label="Password" autoComplete="new-password" />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 3 }}>
                      <FormPasswordInput
                        id="confirmPassword"
                        label="Confirm Password"
                        autoComplete="confirm-password"
                      />
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} justifyContent="center">
                    <Grid item xs={7} lg={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 4, borderRadius: 6, fontWeight: 'bold' }}
                        isLoading={resetPasswordLoading}
                        color="primary"
                        type="submit"
                      >
                        Reset Password
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item xs={12}>
                      <Grid item container direction="column" alignItems="center" xs={12}>
                        <Typography to="#" variant="subtitle1" sx={{ textDecoration: 'none' }} textAlign={'center'}>
                          Did not receive the email? Check your spam filter, or
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} alignItems="center">
                      <Box textAlign="center">
                        <Button fullWidth disabled disableElevation size="large" variant="text" color="secondary">
                          Resend Code
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} alignItems="center" justifyContent="space-between">
                    <Typography
                      variant="subtitle1"
                      component={Link}
                      to={`/login`}
                      color="secondary"
                      sx={{ textDecoration: 'none' }}
                    >
                      Login?
                    </Typography>
                  </Grid>
                </Grid>
              </Form>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
