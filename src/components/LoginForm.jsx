import {useState} from 'react';
import {useUserContext} from '../hooks/contextHooks';

const LoginForm = () => {
  const [inputs, setInputs] = useState({username: '', password: ''});
  const {handleLogin} = useUserContext();

  const doLogin = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(inputs);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={doLogin}>
      <input
        type="text"
        placeholder="Username"
        value={inputs.username}
        onChange={(e) => setInputs({...inputs, username: e.target.value})}
      />
      <input
        type="password"
        placeholder="Password"
        value={inputs.password}
        onChange={(e) => setInputs({...inputs, password: e.target.value})}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
