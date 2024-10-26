import React, { useState } from 'react';
import axios from 'axios';
import './index.css'

const RegisterationPage = () => {
  const [lastName, setlastName] = useState('');
  const [username,setUsername] = useState('');
  const [firstName,setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message,setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/api/auth/v1/register', {username,firstName, lastName, email, password });
      console.log(response.data);
     
      if (response.data.success) {
      
        setMessage(response.data.message);
        setEmail('')
        setFirstname('')
        setPassword('')
        setUsername('')
        setlastName('')
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message);
    }
  };

  return (
    <div className='register-card'>
      <h1 className='heading'>Register</h1>
    <form onSubmit={handleRegister}>
      <label htmlFor='uname'>USERNAME</label>
    <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter User Name" required id="uname"/>
    <label htmlFor='fname'>FIRST NAME</label>
    <input value={firstName} onChange={(e) => setFirstname(e.target.value)} placeholder="Enter First Name" required id="fname"/>
    <label htmlFor='lname'>LAST NAME</label>
      <input value={lastName} onChange={(e) => setlastName(e.target.value)} placeholder="Enter Last Name" id="lname" required/>
      <label htmlFor='email'>EMAIL</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" id="email" required/>
      <label htmlFor='pass'>PASSWORD</label>
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Set Password" required id="pass"/>
      <button type="submit">Register</button>

    </form>
    {message && <p className="response-message">{message}</p>}
    </div>
  );
};

export default RegisterationPage;
