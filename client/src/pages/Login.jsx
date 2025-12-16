import React, { useContext, useEffect, useState } from 'react';
import AuthUi from '../components/AuthUi';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import { Loader2, Eye, EyeOff } from 'lucide-react'; // Import icons

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <AuthUi>
      <form onSubmit={onSubmit} className='flex flex-col items-center w-[90%] sm:max-w-[500px] m-auto mt-14 sm:mt-auto gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>

        {currentState === 'Login' ? '' : (
          <input 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            type="text" 
            className='w-full px-3 py-2 border border-gray-800 rounded-md' 
            placeholder='Name' 
            required 
          />
        )}

        <input 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
          type="email" 
          className='w-full px-3 py-2 border border-gray-800 rounded-md' 
          placeholder='Email' 
          required 
        />

        <div className='w-full relative'>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            type={showPassword ? 'text' : 'password'}
            className='w-full px-3 py-2 border border-gray-800 rounded-md' 
            placeholder='Password' 
            required 
          />
          <div 
            className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600'
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        <div className='w-full flex flex-col md:flex-row gap-2 justify-between items-center text-xs sm:text-sm mt-[-4px]'>
          <p className='cursor-pointer'>Forgot your password? <span className='text-[#57201b]/70 cursor-pointer'>Reset</span></p>
          {currentState === 'Login' ? (
            <p>Don't have an account? <span onClick={() => setCurrentState('Sign Up')} className='text-[#57201b]/70 cursor-pointer'>Sign Up</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setCurrentState('Login')} className='text-[#57201b]/70 cursor-pointer'>Login</span></p>
          )}
        </div>

        {loading ? (
          <button className='bg-black text-white font-light h-16 px-8 py-2 mt-2 w-full rounded-full flex items-center justify-center'>
            <Loader2 size={32} className='animate-spin' />
          </button>
        ) : (
          <button className='bg-black text-white font-light h-16 px-8 py-2 mt-2 w-full rounded-full'>
            {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
          </button>
        )}

        <div className='text-xs sm:text-sm mt-4 flex gap-1 justify-end items-end'>
          <p>Are you an admin?</p>
          <a href='https://luxeloom-admin.vercel.app' target='_blank' rel="noopener noreferrer" className='text-[#57201b]/70'>Login</a>
        </div>
      </form>
    </AuthUi>
  );
};

export default Login;
