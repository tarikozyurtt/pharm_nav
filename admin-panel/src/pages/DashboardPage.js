// src/DashboardPage.js
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

function DashboardPage() {
  const [code, setCode] = useState('');
  const [medications, setMedications] = useState({});
  const [selectedDrug, setselectedDrug] = useState('pedifen');
  const [quantity, setQuantity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]); // Example comments
  const [activeTab, setActiveTab] = useState('medication');

  const [codeDrug,setCodeDrug] = useState({})
  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")
  const [address,setAddress] = useState("")
  const [rating, setRating] = useState(2.0)
  
  const [pharmId2,setPharmId2] = useState("")
  const location = useLocation();
  const [effect, setEffect] = useState(0)
  useEffect(() => {
    // Update the document title using the browser API
    const query = `https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/getPharmDetail?userId=${location.state?.id}`
    console.log("query", query)
    fetch( query, {
      method: 'Get',
      headers: {
          'Content-Type': 'application/json',
          'Authorization':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OTQ4OTgyM2UyMDM1OTkyMmIzYjkwYSIsImVtYWlsIjoiYSIsInBhc3RQcmVzY3JpcHRpb25zIjpbXSwidXNlclJvbGUiOiIxIiwibmFtZSI6IlF3ZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRyY1BWY0RkTjNiVTNuRWxRaGs5am0uUjZlNFU1UVYvSEdkRnhQTFNDUGhVN0QzWFhIM3BFUyIsIl9fdiI6MH0sImlhdCI6MTcwNDIzNDQxMn0.BV2HssWK-6sg_z_f1-_b2Qxj-yBBX8dMctKpqGjAu9M"
      }
  }).then( async prop =>{
    if(prop.status == 200){
      const result = await prop.json()
      console.log("result hop:",result);
      setMedications(result.drugs)
      setName(result.name)
      setPhone(result.phoneNum)
      setAddress(result.address)
      console.log("loo", result.rating.totalRatings/result.rating.raters.length.toFixed(2));
      setRating(result.rating.totalRatings/result.rating.raters.length.toFixed(2))
      console.log("comment",result.comments)
      setComments(result.comments)
      setPharmId2(result._id)
    }
    else{
      console.log("error occured")
    }
})
  },[effect]);


  const handleSearch = () => {
    const body = {code:code}
    console.log("bodY:", body);
    fetch('https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/getCodeDrugs', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OTQ4OTgyM2UyMDM1OTkyMmIzYjkwYSIsImVtYWlsIjoiYSIsInBhc3RQcmVzY3JpcHRpb25zIjpbXSwidXNlclJvbGUiOiIxIiwibmFtZSI6IlF3ZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRyY1BWY0RkTjNiVTNuRWxRaGs5am0uUjZlNFU1UVYvSEdkRnhQTFNDUGhVN0QzWFhIM3BFUyIsIl9fdiI6MH0sImlhdCI6MTcwNDIzNDQxMn0.BV2HssWK-6sg_z_f1-_b2Qxj-yBBX8dMctKpqGjAu9M"
      },
      body: JSON.stringify(body),
    }).then( async prop =>{
      if(prop.status == 200){
        const result = await prop.json()
        console.log("result code:",result);
        setCodeDrug(result.drugs)
      }
      else{
        console.log("Error occured")
      }
    })
    setShowModal(true); // Uncomment this to show the modal
  };

  const handleUpdate = async() => {
    
    let codeDrug2 = {};
    for (let key in codeDrug) {
        if (codeDrug.hasOwnProperty(key)) {
          codeDrug2[key] = -codeDrug[key];
        }
    }
    console.log("code drug: ",codeDrug2);
    await fetch("https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OTQ4OTgyM2UyMDM1OTkyMmIzYjkwYSIsImVtYWlsIjoiYSIsInBhc3RQcmVzY3JpcHRpb25zIjpbXSwidXNlclJvbGUiOiIxIiwibmFtZSI6IlF3ZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRyY1BWY0RkTjNiVTNuRWxRaGs5am0uUjZlNFU1UVYvSEdkRnhQTFNDUGhVN0QzWFhIM3BFUyIsIl9fdiI6MH0sImlhdCI6MTcwNDIzNDQxMn0.BV2HssWK-6sg_z_f1-_b2Qxj-yBBX8dMctKpqGjAu9M"
      },
      body: JSON.stringify({
        "pharmId":pharmId2,
        "drugs":codeDrug2
    }),
    }).then( async (prop)=>{
      if(prop.status == 200){
        const result = await prop.json()
        console.log("result code thx:",result);
        setShowModal(false);
        setEffect(effect+1)
      }
      else{
        console.log("Error occured")
      }
    })
  }

  const singleUpdate = async () =>{
  let body = {
      "pharmId":pharmId2,
      "drugs":{}
  }
  body.drugs[selectedDrug] = parseInt(quantity, 10)

  console.log("body: ",body);
  

    await fetch("https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OTQ4OTgyM2UyMDM1OTkyMmIzYjkwYSIsImVtYWlsIjoiYSIsInBhc3RQcmVzY3JpcHRpb25zIjpbXSwidXNlclJvbGUiOiIxIiwibmFtZSI6IlF3ZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRyY1BWY0RkTjNiVTNuRWxRaGs5am0uUjZlNFU1UVYvSEdkRnhQTFNDUGhVN0QzWFhIM3BFUyIsIl9fdiI6MH0sImlhdCI6MTcwNDIzNDQxMn0.BV2HssWK-6sg_z_f1-_b2Qxj-yBBX8dMctKpqGjAu9M"
      },
      body: JSON.stringify(body),
    }).then( async (prop)=>{
      if(prop.status == 200){
        const result = await prop.json()
        console.log("result code thx single:",result);
        setShowModal(false);
        setEffect(effect+1)
      }
      else{
        console.log("Error occured")
      }
    })

  }

  const handleModalClose = () => {
    setShowModal(false);
  };


  const medicationOptions = Object.entries(medications).map(([medication, quantity], index) => (
    <option key={index} value={medication}>
        {medication}
    </option>
  ));

  return (
    <div className="space-y-4">
      <div className='ml-10 mt-10 mb-6'>
        <p className='font-bold text-3xl text-[#6F70FF]'>
        {name}
        </p>
        <p className='font-semibold text-lg mt-5'>
        phone: {phone}
        </p>
        <p className='text-md mt-1'>
        address: {address}
        </p>
      </div>
      <div className='ml-10 mb-10'>
        <Rating name="read-only" value={rating} precision={0.5}  readOnly />
        <span className='text-3xl ml-3'>{rating}</span>
      </div>
      <div className='grid grid-cols-2 mt-20'>
        <div className='ml-10'>
          <input placeholder='Prescription Code' type="text" value={code} onChange={(e) => setCode(e.target.value)} className="p-2 border border-gray-300 rounded mr-4" />
          <button onClick={handleSearch} className="py-2 px-4 bg-blue-500 text-white rounded">Search</button>
        </div>
        <div>
          <select value={selectedDrug} onChange={(e) => setselectedDrug(e.target.value)} className="p-2 border border-gray-300 rounded mr-4">
            {medicationOptions}
          </select>
          <input placeholder='Number' type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="p-2 border border-gray-300 rounded mr-4 w-24" />
          <button onClick={singleUpdate} className="py-2 px-4 bg-green-500 text-white rounded">Update Manually</button>
        </div>
      </div>
      
      

      

      <div className="flex border-b ml-10">
        <button 
          className={`py-2 px-4 ${activeTab === 'medication' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('medication')}
        >
          Drug
        </button>
        <button 
          className={`py-2 px-4 ${activeTab === 'comment' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('comment')}
        >
          Comment
        </button>
      </div>

      {/* Medication List with Titles */}
      {activeTab === 'medication' && ( 
      <div className='ml-10'>
        <div className="flex">
          <div className="flex-1 font-semibold">Drug Name</div>
          <div className="flex-1 font-semibold">Drug Quantity</div>
        </div>
        <ul>
        {Object.entries(medications).sort(([, quantityA], [, quantityB]) => quantityB - quantityA)
        .map(([medication, quantity], index) => (
          <li key={index} className="flex p-2 border-b border-gray-200">
            <div className="flex-1">{medication}</div>
            <div className="flex-1">{quantity}</div>
          </li>
        ))}
        </ul>
      </div>)}

      {/* Medication Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Drug List</h3>
            <ul>
              {Object.entries(codeDrug).map(([medication, quantity], index) => (
                <li key={index} className="flex justify-between items-center p-2">
                  <span>{medication}</span>
                  <span>{quantity}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={handleModalClose} className="py-2 px-4 bg-gray-500 text-white rounded">Close</button>
              <button onClick={handleUpdate} className="py-2 px-4 bg-blue-500 text-white rounded">Update With Code</button>
            </div>
          </div>
        </div>
      )}

        {activeTab === 'comment' && (
            <div className='ml-10'>
            {/* Comments List */}
            <ul>
                {comments.map((comment, index) => (
                <li key={index} className="p-2 border-b border-gray-200"><span className='font-semibold'>{comment.user_name}</span> - {comment.content}</li>
                ))}
            </ul>
            </div>
        )}
    </div>
  );
}

export default DashboardPage;
