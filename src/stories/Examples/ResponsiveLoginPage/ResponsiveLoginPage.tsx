import { Alert as MuiAlert, AlertProps, Box, Grid, Snackbar, Typography } from '@mui/material';
import arcLogo from '@/assets/logo.jpeg';
import heroLogo from '@/assets/hero.png';
import Button from '@/components/Button';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import FormPasswordInput from '@/components/Forms/FormPasswordInput';
import { FormikHelpers } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';

type LoginForm = {
  username: string;
  password: string;
};

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object({
  username: yup.string().required().label('UserName'),
  password: yup.string().required().label('Password'),
});

interface ResponsiveLoginPageProps {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ResponsiveLoginPage: React.FC<ResponsiveLoginPageProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleSubmit = async (_: LoginForm, { setSubmitting }: FormikHelpers<LoginForm>) => {
    const FAKE_DELAY = 2000;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOpen(true);
      setSubmitting(false);
    }, FAKE_DELAY);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Login Successful ✅
        </Alert>
      </Snackbar>
      <Grid container data-testid="LoginPage" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${heroLogo})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
        <Grid item xs={12} sm={8} md={5}>
          <Box
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              px: '15px',
            }}
          >
            <Grid container maxWidth="25em">
              <Box
                component="img"
                sx={{
                  width: 'auto',
                }}
                src={arcLogo}
                alt="hero"
              />
              <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                <Grid item xs={12}>
                  <FormInput id="username" label="Username" />
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <FormPasswordInput id="password" label="Password" />
                </Grid>
                <Grid container item xs={12}>
                  <Button
                    variant="contained"
                    sx={{ mt: 2, mb: 4, borderRadius: 6, fontWeight: 'bold' }}
                    isLoading={isLoading}
                    color="secondary"
                    type="submit"
                  >
                    Login
                  </Button>
                </Grid>
              </Form>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
