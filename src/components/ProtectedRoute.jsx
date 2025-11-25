import {Navigate} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';

const ProtectedRoute = ({children}) => {
  const {user} = useUserContext();
  if (!user) {
    return <Navigate to="/" />; // redirect to home if not logged in
  }
  return children;
};

export default ProtectedRoute;
