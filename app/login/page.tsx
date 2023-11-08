
import  Image  from 'next/image'
import LoginForm from '@/components/LoginForm';

const Login: React.FC = () => {

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
