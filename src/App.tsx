import { useEffect } from 'react';
import AppRoutes from '@/routes/Routes';
import { getRouteConfig } from '@/routes/layoutRouteConfig';
import { fetchConfigData } from '@/redux/config/configThunk';
import { useAppDispatch } from '@/redux/hooks';
import useConfig from '@/hooks/useConfig';
import SessionTimeout from '@/components/SessionTimeout/SessionTimeout';
import useAuth from '@/hooks/useAuth';

function App() {
  const dispatch = useAppDispatch();
  const { enableSessionTimeout, expiryTimeInMinute, promptTimeBeforeIdleInMinute } = useConfig().config;
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const dispatchThunk = async () => {
      await dispatch(fetchConfigData()).unwrap();
    };
    dispatchThunk();
  }, [dispatch]);
  return (
    <>
      <AppRoutes routesConfig={getRouteConfig()} />
      {enableSessionTimeout && isLoggedIn ? (
        <SessionTimeout
          expiryTimeInMinute={expiryTimeInMinute}
          promptTimeBeforeIdleInMinute={promptTimeBeforeIdleInMinute}
        />
      ) : null}
    </>
  );
}

export default App;
