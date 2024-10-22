import { Box, Divider, Grid, Typography } from '@mui/material';
import arcLogo from '@/assets/logo.png';
import forgotPasswordLogo from '@/assets/forgot_password.jpg';
import Button from '@/components/Button';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import useAuth from '@/hooks/useAuth';
import { FormikHelpers } from 'formik';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { IForgotPasswordForm } from '@/redux/auth/authApiSlice';
import * as yup from 'yup';
import { useEmail } from '@/hooks/useEmail';

const initialValues = {};

const validationSchema = yup.object({
  email: yup.string().email('Invalid email format').required().label('Email'),
});

const ForgotPassword = () => {
  const { forgotPassword, forgotPasswordLoading } = useAuth();
  const { setEmail } = useEmail();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/reset-password';

  const handleNavigation = () => {
    navigate(from, { replace: true });
  };

  const handleSubmit = async (values: IForgotPasswordForm, { setSubmitting }: FormikHelpers<IForgotPasswordForm>) => {
    try {
      const emailInput = values?.email?.toLowerCase()?.replace(/\s/g, '');
      const result = await forgotPassword({ ...values, email: emailInput });
      if (result) {
        setEmail(emailInput);
        handleNavigation();
      }
    } catch (error) {
      setEmail('');
      console.error('An unexpected error occurred:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container data-testid="ForgotPasswordPage" sx={{ height: '100vh' }}>
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
                  Forgot password
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ py: 3 }}>
                <Typography variant="subtitle1" textAlign="center">
                  Enter your email address below and we&apos;ll send you a password reset OTP.
                </Typography>
              </Grid>
              <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                <Grid container spacing={2}>
                  <Grid container item xs={12} justifyContent="center">
                    <Grid item xs={8} lg={7} spacing={2}>
                      <FormInput id="email" label="Email" />
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} justifyContent="center">
                    <Grid item xs={7} lg={6}>
                      <Button
                        variant="contained"
                        sx={{ mt: 2, mb: 4, borderRadius: 6, fontWeight: 'bold' }}
                        isLoading={forgotPasswordLoading}
                        color="primary"
                        type="submit"
                        fullWidth
                      >
                        Send Email
                      </Button>
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
                      Already have an account?
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

export default ForgotPassword;
