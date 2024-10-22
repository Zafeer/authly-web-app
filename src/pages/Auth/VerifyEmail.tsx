import { Box, Divider, Grid, Typography } from '@mui/material';
import logo from '@/assets/logo.png';
import verifyEmailLogo from '@/assets/verify_email.jpg';
import Button from '@/components/Button';
import Form from '@/components/Forms/Form';
import useAuth from '@/hooks/useAuth';
import { FormikHelpers } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormOtpInput from '@/components/Forms/FormOtpInput';
import { IVerifyEmailForm } from '@/redux/auth/authApiSlice';
// import * as yup from 'yup';
import { useEmail } from '@/hooks/useEmail';

const initialValues = {};

// const validationSchema = yup.object({
//   email: yup.string().email('Invalid email format').required().label('Email'),
//   otpToken: yup
//     .string()
//     .required('OTP Code is required')
//     .matches(/^\d{6}$/, 'OTP Code must be exactly 6 digits')
//     .label('OTP Code'),
// });

const VerifyEmail: React.FC = () => {
  const { verifyEmail, verifyEmailLoading } = useAuth();
  const { email } = useEmail();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleNavigation = () => {
    navigate(from, { replace: true });
  };

  const handleSubmit = async (values: IVerifyEmailForm, { setSubmitting }: FormikHelpers<IVerifyEmailForm>) => {
    try {
      const result = await verifyEmail({ ...values, email });
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
          backgroundImage: `url(${verifyEmailLogo})`,
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
                src={logo}
                alt="hero"
              />
            </Grid>
            <Grid container sx={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
              <Grid item xs={12}>
                <Typography variant="h6" color="secondary">
                  Verify email
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ py: 3 }}>
                <Typography variant="subtitle1" textAlign="center">
                  Please enter the OTP.
                </Typography>
              </Grid>
              <Form initialValues={initialValues} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid container item xs={12} justifyContent="center">
                    <Grid item xs={12} sx={{ mt: 3 }}>
                      <FormOtpInput id="otpToken" label="TOTP" />
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} justifyContent="center">
                    <Grid item xs={7} lg={6}>
                      <Button
                        variant="contained"
                        sx={{ mt: 2, mb: 4, borderRadius: 6, fontWeight: 'bold' }}
                        isLoading={verifyEmailLoading}
                        color="primary"
                        type="submit"
                        fullWidth
                      >
                        Continue
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item xs={12}>
                      <Grid item container direction="column" alignItems="center" xs={12}>
                        <Typography variant="subtitle1" sx={{ textDecoration: 'none' }} textAlign={'center'}>
                          Already verified your email?
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} alignItems="center" justifyContent="space-between">
                    <Typography
                      variant="subtitle1"
                      component={Link}
                      to={`/login`}
                      color="secondary"
                      sx={{ textDecoration: 'none' }}
                    >
                      Login
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

export default VerifyEmail;
