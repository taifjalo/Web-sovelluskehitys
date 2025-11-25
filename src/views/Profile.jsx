import {useContext} from 'react';
import {UserContext} from '../contexts/UserContext';

const Profile = () => {
  const {user} = useContext(UserContext);
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Username: {user?.username}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default Profile;
