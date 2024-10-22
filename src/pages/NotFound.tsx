import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const NotFound = () => (
  <Grid sx={{ height: '80vh' }} container direction="row" justifyContent="center" alignItems="center">
    <Grid item>
      <ErrorOutlineOutlinedIcon
        sx={{
          width: 'auto',
          mx: 'auto',
          display: 'block',
        }}
      />
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Page not found
      </Typography>
      <Typography sx={{ textAlign: 'center' }}>
        We are sorry but the page you are looking for does not exist.
      </Typography>
    </Grid>
  </Grid>
);
export default NotFound;
