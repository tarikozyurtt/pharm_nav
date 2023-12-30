// src/DashboardPage.js
import React, { useState } from 'react';

function DashboardPage() {
  const [code, setCode] = useState('');
  const [medications, setMedications] = useState([{name:"parol", quantity:5},{name:"majezik", quantity:2},{name:"tarlusal", quantity:7},]);
  const [selectedMed, setSelectedMed] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState(['Comment 1', 'Comment 2']); // Example comments
  const [activeTab, setActiveTab] = useState('medication');

  const handleSearch = () => {
    // TODO: Replace with your service call using the code
    // Example: Update the medications state with the response
    setShowModal(true); // Uncomment this to show the modal
  };

  const handleUpdate = () => {
    // Call your update service with selectedMed and quantity
  };

  const handleModalClose = () => {
    setShowModal(false);
  };


  const medicationOptions = medications.map((med, index) => (
    <option key={index} value={med.name}>{med.name}</option>
  ));

  return (
    <div className="space-y-4">
      <div className='ml-10 my-10'>
        <p className='font-bold text-2xl text-[#6F70FF]'>
          Pharmacy Name Dashboard
        </p>
      </div>
      <div className='grid grid-cols-2 mt-10'>
        <div className='ml-10'>
          <input placeholder='Prescription Code' type="text" value={code} onChange={(e) => setCode(e.target.value)} className="p-2 border border-gray-300 rounded mr-4" />
          <button onClick={handleSearch} className="py-2 px-4 bg-blue-500 text-white rounded">Search</button>
        </div>
        <div>
          <select value={selectedMed} onChange={(e) => setSelectedMed(e.target.value)} className="p-2 border border-gray-300 rounded mr-4">
            {medicationOptions}
          </select>
          <input placeholder='Number' type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="p-2 border border-gray-300 rounded mr-4 w-24" />
          <button onClick={handleUpdate} className="py-2 px-4 bg-green-500 text-white rounded">Update</button>
        </div>
      </div>
      
      

      

      <div className="flex border-b ml-10">
        <button 
          className={`py-2 px-4 ${activeTab === 'medication' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('medication')}
        >
          Medication
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
          {medications.map((med, index) => (
            <li key={index} className="flex p-2 border-b border-gray-200">
              <div className="flex-1">{med.name}</div>
              <div className="flex-1">{med.quantity}</div>
            </li>
          ))}
        </ul>
      </div>)}

      {/* Medication Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Medication List</h3>
            <ul>
              {medications.map((med, index) => (
                <li key={index} className="flex justify-between items-center p-2">
                  <span>{med.name}</span>
                  <span>{med.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={handleModalClose} className="py-2 px-4 bg-gray-500 text-white rounded">Close</button>
              <button className="py-2 px-4 bg-blue-500 text-white rounded">Update</button>
            </div>
          </div>
        </div>
      )}

        {activeTab === 'comment' && (
            <div className='ml-10'>
            {/* Comments List */}
            <ul>
                {comments.map((comment, index) => (
                <li key={index} className="p-2 border-b border-gray-200">{comment}</li>
                ))}
            </ul>
            </div>
        )}
    </div>
  );
}

export default DashboardPage;
