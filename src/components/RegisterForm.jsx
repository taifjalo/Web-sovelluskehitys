import React from 'react';
import useForm from '../hooks/formHooks';
import {postRegister} from '../hooks/apiHooks';
import {useNavigate} from 'react-router-dom';

const RegisterForm = () => {
  const initValues = {
    username: '',
    password: '',
    email: '',
  };

  const navigate = useNavigate();

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  async function doRegister() {
    try {
      const result = await postRegister(inputs);
      console.log('Registration result:', result);

      if (result.id) {
        alert('Registration successful! Please log in.');
        // Use navigate instead of window.location.href for SPA navigation
        navigate('/login');
      } else {
        // Handle API errors if returned differently
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.message || 'Something went wrong during registration');
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
          required
          minLength={3}
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
          required
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
          required
          minLength={5}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
