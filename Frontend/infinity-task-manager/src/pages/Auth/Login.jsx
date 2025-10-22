import React from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/layout/inputs/Input'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle login from Submit
  const handleLogin = async (e) => {
    e.preventDefault();
  }

  return <AuthLayout>
    <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
         <p className='text-xs text-state-700 mt-[5px] mb-6'>
          Please Enter you details
         </p>
         <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target}) => setEmail(target.value)}
            label="Email Address"
            placeholder="tony@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target}) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />
         </form>
    </div>
  </AuthLayout>
  
}

export default Login