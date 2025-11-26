import {createContext, useState, useEffect} from 'react';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useNavigate} from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();

  const navigate = useNavigate();
  //const location = useLocation();

  // ------------------------
  // LOGIN
  // ------------------------
  const handleLogin = async (credentials) => {
    try {
      const loginResult = await postLogin(credentials);

      if (!loginResult.token) {
        throw new Error('Login failed: Token missing');
      }

      // Save token
      localStorage.setItem('token', loginResult.token);

      // Save user
      setUser(loginResult.user);

      navigate('/'); // Go home
    } catch (e) {
      console.error('Login failed:', e.message);
      throw e;
    }
  };

  // ------------------------
  // LOGOUT
  // ------------------------
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // ------------------------
  // AUTO LOGIN
  // ------------------------
  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) return; // No token → skip autologin

      const userResult = await getUserByToken(token);

      if (userResult?.user) {
        setUser(userResult.user);
        return;
      }

      // If API returned error / invalid token
      localStorage.removeItem('token');
    } catch (e) {
      console.log('AUTOLOGIN ERROR:', e.message);
      localStorage.removeItem('token'); // prevent infinite errors
    }
  };

  // Run autologin on app start
  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
