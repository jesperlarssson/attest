"use client";

import { useState, FormEvent } from 'react';
import toast from 'react-hot-toast';

import { useAuth } from '../contexts/AuthContext';


const LoginForm: React.FC = () => {
  const [employmentId, setEmploymentId] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); 

  const { login } = useAuth();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = login(employmentId, pincode);
      toast.promise(res, {
        loading: 'Loading',
        success: 'Successful login',
        error: 'Login failed',
      });

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-3xl flex flex-col font-bold  mt-2 text-center"> <span>MATE</span> <span className='text-lg -mt-2 font-light'>Meridion Attestation Tool</span></div>
        <div className="bg-card-light dark:bg-card-dark p-8 border border-edge-light dark:border-edge-dark mt-6 rounded-lg shadow-lg m-6">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="employmentId" className="text-sm font-bold block">
                Employment ID
              </label>
              <input
                type="text"
                className="w-full p-2 border bg-black bg-opacity-10 rounded mt-1"
                id="employmentId"
                placeholder="Enter your Employment ID"
                value={employmentId}
                onChange={(e) => setEmploymentId(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="pincode" className="text-sm font-bold block">
                PIN Code
              </label>
              <input
                type="password"
                className="w-full p-2 border bg-black bg-opacity-10 rounded mt-1"
                id="pincode"
                placeholder="Enter your PIN"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className={`w-full p-2 bg-gray-600 text-white rounded ${
                  loading ? 'bg-indigo-400' : 'hover:bg-gray-700'
                }`}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default LoginForm;
