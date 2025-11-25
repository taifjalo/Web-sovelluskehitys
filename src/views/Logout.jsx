import {useUserContext} from '../hooks/contextHooks';

const Logout = () => {
  const {handleLogout} = useUserContext();
  // Handle logout logic (clearing the token or user data)

  const userLogout = async () => {
    try {
      await handleLogout();
    } catch (e) {
      alert(e.message);
    }
  };
  console.log();

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={userLogout}>Logout</button>
    </div>
  );
};

export default Logout;
