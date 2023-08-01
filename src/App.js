import React, { useState } from 'react';

import AppRouter from './AppRouter';

import AuthProvider from './context/auth';
import AppAuthLoader from './AppAuthLoader';

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  const onLoadingChange = (loadingValue) => {
    setIsAppLoading(loadingValue);
  };

  return (
    <AuthProvider>
      <AppAuthLoader setIsAppLoading={onLoadingChange} />
      {isAppLoading ? 'Loading...' : <AppRouter />}
    </AuthProvider>
  );
}

export default App;
