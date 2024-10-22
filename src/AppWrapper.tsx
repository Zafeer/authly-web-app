import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import App from './App';
import ErrorBoundary from '@/providers/ErrorBoundary';
import NotificationProvider from '@/providers/NotificationProvider';
import ThemeProvider from '@/providers/theme/ThemeProvider';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { EmailProvider } from './providers/EmailProvider';

function AppWrapper() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <BrowserRouter>
            <ThemeProvider>
              <NotificationProvider>
                <EmailProvider>
                  <App />
                </EmailProvider>
              </NotificationProvider>
            </ThemeProvider>
          </BrowserRouter>
        </LocalizationProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default AppWrapper;
