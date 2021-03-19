import { useRoutes } from './routes';
import 'materialize-css';

import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';

function App() {
  const { login, logout, token, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        userId,
        isAuthenticated
      }}>
      {isAuthenticated && <Navbar />}
      <div className='container'>{routes}</div>
    </AuthContext.Provider>
  );
}

export default App;
