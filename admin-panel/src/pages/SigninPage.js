// src/SigninPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const authenticateUser = async (body) => {
  return await fetch('https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/authenticate', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: body,
  });
};


function SigninPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      authenticateUser(
        JSON.stringify({
          email: email,
          password: password,
        })
      ).then( async prop =>{
        if(prop.status == 200){
          const result = await prop.json()
          console.log("result:",result);
          setIsLoggedIn(true);
          navigate('/dashboard',{state:{id:result.userInfo.userId}});
        }
        else{
          alert("Email or Password is wrong")
        }
    })
    } catch (error) {
      console.log("error: ",error)
    }
    
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="space-y-4">
      <div className=' my-20'>
        <p className='text-center font-bold text-3xl text-[#6F70FF]'>
          PharmNav Admin Panel
        </p>
      </div>

      <div className='grid grid-cols-1 w-1/5 mx-auto'>
        <div className='mb-4'>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className='mb-5'>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className='grid grid-cols-2'>
          <div>
            <button onClick={handleSubmit} className="py-2 px-4 bg-green-500 text-white rounded">Sign In</button>
          </div>
          <div>
            <button onClick={navigateToSignup} className="py-2 px-4 bg-blue-500 text-white rounded float-right">Sign Up</button>
          </div>
        </div>
      </div>
        
    </div>
  );
}

export default SigninPage;
