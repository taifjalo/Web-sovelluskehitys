import React from 'react';
import useForm from '../hooks/formHooks';
import {postRegister} from '../hooks/apiHooks';

const RegisterForm = () => {
  const initValues = {
    username: '',
    password: '',
    email: '',
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  async function doRegister() {
    const result = await postRegister(inputs);
    console.log(result);

    if (result.id) {
      alert('Registration successful! Please log in.');
      window.location.href = '/login';
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="registeruser">Username</label>
        <input
          name="username"
          type="text"
          id="registeruser"
          onChange={handleInputChange}
          value={inputs.username}
        />
      </div>
      <div>
        <label htmlFor="registeremail">Email</label>
        <input
          name="email"
          type="email"
          id="registeremail"
          onChange={handleInputChange}
          value={inputs.email}
        />
      </div>
      <div>
        <label htmlFor="registerpassword">Password</label>
        <input
          name="password"
          type="password"
          id="registerpassword"
          onChange={handleInputChange}
          value={inputs.password}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
