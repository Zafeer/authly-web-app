import { Box, Divider, Grid, Typography } from '@mui/material';
import logo from '@/assets/logo.png';
import heroLogo from '@/assets/hero.png';
import Button from '@/components/Button';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import FormPasswordInput from '@/components/Forms/FormPasswordInput';
import useAuth from '@/hooks/useAuth';
import { FormikHelpers } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ILoginForm } from '@/redux/auth/authApiSlice';
import * as yup from 'yup';

const initialValues = {};

const validationSchema = yup.object({
  email: yup.string().email('Invalid email format').required().label('Email'),
  password: yup.string().required().label('Password'),
});

const Login = () => {
  const { login, loginLoading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleNavigation = () => {
    navigate(from, { replace: true });
  };

  const handleSubmit = async (values: ILoginForm, { setSubmitting }: FormikHelpers<ILoginForm>) => {
    try {
      const result = await login({ ...values, email: values?.email?.toLowerCase()?.replace(/\s/g, '') });
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
    <Grid container data-testid="LoginPage" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={5}
        sx={{
          backgroundImage: `url(${heroLogo})`,
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
          <Grid container alignItems="center" justifyContent="center" textAlign="center">
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
                  Sign In
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ py: 2 }}>
                <Typography variant="h7" textAlign="center">
                  Enter your credentials to continue.
                </Typography>
              </Grid>
              <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                <Grid container spacing={2}>
                  <Grid container item xs={12} justifyContent="center">
                    <Grid item xs={8} lg={7} spacing={2}>
                      <FormInput id="email" label="Email" />
                    </Grid>
                    <Grid item xs={8} lg={7} spacing={2} sx={{ mt: 2 }}>
                      <FormPasswordInput id="password" label="Password" autoComplete="current-password" />
                    </Grid>
                    <Grid container item xs={8} lg={7} spacing={2} sx={{ mt: 2 }} justifyContent="flex-end">
                      <Typography
                        variant="subtitle1"
                        component={Link}
                        to={`/forgot-password`}
                        color="secondary"
                        sx={{ textDecoration: 'none' }}
                      >
                        Forgot Password?
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} justifyContent="center">
                    <Grid item xs={7} lg={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 4, borderRadius: 6, fontWeight: 'bold' }}
                        isLoading={loginLoading}
                        color="primary"
                        type="submit"
                      >
                        Login
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
                      to={`/sign-up`}
                      color="secondary"
                      sx={{ textDecoration: 'none' }}
                    >
                      Don't have an account?
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

export default Login;
