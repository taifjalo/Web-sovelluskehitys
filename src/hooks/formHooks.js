import {useState} from 'react';

const useForm = (callback, initState) => {
  const [inputs, setInputs] = useState(initState);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setInputs((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    await callback(inputs);
  };

  return {inputs, handleInputChange, handleSubmit};
};

export default useForm;
