"use client";
import { useState, FormEvent } from 'react';
import  Image  from 'next/image'
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';

const Login: React.FC = () => {
  const [employmentId, setEmploymentId] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const { login } = useAuth();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    await login(employmentId, pincode);
  };

  return <div>
    <LoginForm />
    <div className='absolute left-0 bottom-0 p-4 opacity-60'>
        <span className='font-semibold text-gray-600 text-sm'>
        Provided by: 
        </span>
        <Image width={200} height={50} alt='Meridion' src={"/images/meridion.png"} />
      </div>
  </div>

};

export default Login;
