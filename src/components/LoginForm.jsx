import React from 'react';
import useForm from '../hooks/formHooks';
import {postLogin} from '../hooks/apiHooks';

const LoginForm = () => {
  const initValues = {
    username: '',
    password: '',
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  async function doLogin() {
    const result = await postLogin(inputs);
    console.log('Login result:', result);

    if (result.token) {
      localStorage.setItem('token', result.token);
      window.location.href = '/';
    }
  }

  console.log(inputs);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="loginuser">Username</label>
        <input
          name="username"
          type="text"
          id="loginuser"
          onChange={handleInputChange}
          value={inputs.username}
        />
      </div>
      <div>
        <label htmlFor="loginpassword">Password</label>
        <input
          name="password"
          type="password"
          id="loginpassword"
          onChange={handleInputChange}
          value={inputs.password}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
