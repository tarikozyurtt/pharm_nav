// src/SignupPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterUser = async (body) => {
  return await fetch('https://splendorous-praline-960c1f.netlify.app/.netlify/functions/index/authenticate', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: body,
  });
};

function SignupPage({ setIsLoggedIn }) {
  const [userData, setUserData] = useState({
    name: '',
    pharmacyName:'',
    email: '',
    password: '',
    location: '',
    description:'',
    photos: [],
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setUserData({ ...userData, photos: [...userData.photos, ...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      userRole:"2",
      email:userData.email,
      password:"pharm6",
      name: userData.name,
      pharmacyName:"examplename15",
      location:{
      type: "Point",
      coordinates:[15,15]
    }
    }
    try {
      RegisterUser(
        JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          location: userData.location
        })
      ).then( async prop =>{
          if(prop.status == 200){
            const result = await prop.json()
            console.log("result:",result);
          }
          else{
            throw new Error("Error occured")
          }
      })
    } catch (error) {
      console.log("error: ",error)
    }
    
    // Registration logic here
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const locationStr = `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`;
        setUserData({ ...userData, location: locationStr });
      }, () => {
        alert('Unable to retrieve your location');
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="space-y-4">

      <div className=' my-20'>
        <p className='text-center font-bold text-3xl text-[#6F70FF]'>
          PharmNav Admin Panel
        </p>
      </div>

      <div className='grid grid-cols-1 w-1/6 mx-auto'>

        <div className='mb-4'>
          <input type="text" name="name" placeholder="Name" onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className='mb-4'>
          <input type="text" name="pharmacyName" placeholder="Pharmacy Name" onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className='mb-4'>
          <input type="email" name="email" placeholder="Email" onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className='mb-4'>
          <input type="password" name="password" placeholder="Password" onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className='mb-4'>
          <input type="text" name="description" placeholder="Description" onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className='mb-4'>
          <input type="text" readOnly={true} name="location" placeholder="Current Location" value={userData.location} onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-1/2 mr-5" />
          <button type="button" onClick={handleLocation} className="py-2 px-4 bg-blue-500 text-white rounded w-2/5">Get Loc.</button>
        </div>
        <div className='mb-4'>
          <input type="file" multiple onChange={handleFileChange} className="p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className='mb-4 justify-center flex'>
          <button onClick={handleSubmit} className="py-2 px-4 bg-green-500 text-white rounded w-1/2 ">Sign Up</button>
        </div>

      </div>
    </div>
    

  );
}

export default SignupPage;
