// src/SignupPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterUser = async (body) => {
  return await fetch('https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/registerPharmacist', {
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
    phoneNum:"",
    address:"",
    photos: {},
    latitude:0,
    longitude:0
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    console.log("e.target.files", e.target.files)
    setUserData({ ...userData, photos: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      userRole:"2",
      email:userData.email,
      password:userData.password,
      name: userData.name,
      pharmacyName:userData.pharmacyName,
      location:{
      type: "Point",
      coordinates:[userData.longitude,userData.latitude]
      },
      description: userData.description,
      phoneNum:userData.phoneNum,
      address:userData.address
    }
    try {
      RegisterUser(
        JSON.stringify(body))
        .then( async prop =>{
          if(prop.status == 200){
            const result = await prop.json()
            console.log("result:",result);


            let formData = new FormData();
            formData.append("file", userData.photos);
            formData.append("pharmacyId", result.pharmacyId);
            [...formData.entries()].forEach(e => console.log(e))

            try {
              await fetch('https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/image', {
                method: 'POST',
                headers: {
                  'Authorization':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OTQ4OTgyM2UyMDM1OTkyMmIzYjkwYSIsImVtYWlsIjoiYSIsInBhc3RQcmVzY3JpcHRpb25zIjpbXSwidXNlclJvbGUiOiIxIiwibmFtZSI6IlF3ZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRyY1BWY0RkTjNiVTNuRWxRaGs5am0uUjZlNFU1UVYvSEdkRnhQTFNDUGhVN0QzWFhIM3BFUyIsIl9fdiI6MH0sImlhdCI6MTcwNDIzNDQxMn0.BV2HssWK-6sg_z_f1-_b2Qxj-yBBX8dMctKpqGjAu9M"
                },
                body: formData,
              }).then( async (prop)=>{
                if(prop.status == 200){
                  const result = await prop.json()
                  console.log("image success:",result)
                  navigate('/');
                }
                else{
                  console.log("Error occured", prop.status)
                }
              })
            } catch (error) {
              console.log("error: ",error);
            }
            
            setIsLoggedIn(true);
            //navigate('/dashboard',{state:{id:result.userId}});
          }
          else{
            alert("Somethings are wrong")
          }
      })
    } catch (error) {
      console.log("error: ",error)
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const locationStr = `${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`;
        
        setUserData({ ...userData,location: locationStr, longitude: position.coords.longitude, latitude: position.coords.latitude});
        console.log(userData.location)

      }, () => {
        alert('Unable to retrieve your location');
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="space-y-4">

      <div className=' my-10'>
        <p className='text-center font-bold text-3xl text-[#6F70FF]'>
          PharmNav Admin Panel
        </p>
      </div>

      <div className='grid grid-cols-1 w-1/5 mx-auto'>
        <div className='grid grid-cols-2'>
          <div className='mb-4 mr-2'>
            <input type="text" name="name" placeholder="Name" onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-full" />
          </div>
          <div className='mb-4'>
            <input type="text" name="pharmacyName" placeholder="Pharmacy Name" onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-full" />
          </div>
        </div>


        <div className='mb-4'>
          <input type="email" name="email" placeholder="Email" onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className='mb-4'>
          <input type="password" name="password" placeholder="Password" onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className='mb-4'>
          <input type="text" name="phoneNum" placeholder="Phone Number" onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className='mb-4'>
          <input type="text" name="address" placeholder="Address" onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className='mb-4'>
          <textarea rows={3} name="description" placeholder="Description" onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className='mb-4'>
          <input type="text" readOnly={true} name="location" placeholder="Current Location" value={userData.location} onChange={handleInputChange} className="p-2 border border-gray-300 rounded w-1/2 mr-5" />
          <button onClick={handleLocation} className="py-2 px-4 bg-blue-500 text-white rounded w-2/5">Get Loca.</button>
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
