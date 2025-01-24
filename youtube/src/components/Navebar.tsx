import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import search from '../Image/search.png';
import upload from '../Image/upload.png';
import more from '../Image/more.png';
import notification from '../Image/notification.png';
import user from '../Image/user_profile.jpg';
import logo from '../Image/Screenshot_2024-07-06_211712-removebg-preview.png';

const Navebar: React.FC = () => {
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <div className='w-full shadow-lg shadow-gray-700/5 h-12'>
      <div className='flex justify-between items-center ml-3 mr-3'>
        <div>
          <img alt='' src={logo} className='w-13 h-11 ml-5' />
        </div>
        <div>
          <div className='hidden ml-5 lg:flex items-center h-10 w-80 justify-between max-w-sm border rounded-full focus-within:shadow pl-5'>
            <input
              type='text'
              placeholder='search...'
              value={searchQuery}
              onChange={handleSearchInputChange}
              className='w-full text-black bg-transparent outline-none'
            />
            <img
              alt='search'
              src={search}
              className='w-6 h-6 mr-2 cursor-pointer'
              onClick={handleSearch}
            />
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <img alt='' src={upload} className='w-7 h-7 mt-2 cursor-pointer' />
          <img alt='' src={more} className='w-7 h-7 mt-2 cursor-pointer' />
          <img alt='' src={notification} className='w-7 h-7 mt-2 cursor-pointer' />
          <img alt='' src={user} className='rounded-full w-10 h-10 cursor-pointer' />
        </div>
      </div>
    </div>
  );
};

export default Navebar;
