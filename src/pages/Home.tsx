import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined';
import DeviceWidthProvider from '@/providers/DeviceWidthProvider';

const Home = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      data-testid="HomePage"
    >
      <DeviceWidthProvider breakpoint="xs">
        <MoodOutlinedIcon
          sx={{
            height: '10%',
            width: 'auto',
            mx: 'auto',
            display: 'block',
          }}
        />
        <Typography
          variant="h3"
          color="inherit"
          component="div"
          sx={{ marginTop: 2, alignContent: 'center', textAlign: 'center' }}
        >
          {'Welcome to the application'}
        </Typography>
      </DeviceWidthProvider>
    </Grid>
  );
};

export default Home;
