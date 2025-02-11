import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import APIKEY from '../Key/APIKEY';

// Import your icons
import { IoHome, IoGameController } from "react-icons/io5";
import { FaCarAlt, FaMusic, FaBloggerB, FaNewspaper } from "react-icons/fa";
import { MdSportsBaseball, MdBiotech } from "react-icons/md";
import { PiTelevisionSimpleBold } from "react-icons/pi";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Category {
  name: string;
  icon: JSX.Element;
  id: string;
}

interface Channel {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [famousChannels, setFamousChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('0');

  const categories: Category[] = [
    { name: 'Home', icon: <IoHome />, id: '0' },
    { name: 'Game', icon: <IoGameController />, id: '20' },
    { name: 'Automobiles', icon: <FaCarAlt />, id: '2' },
    { name: 'Entertainment', icon: <PiTelevisionSimpleBold />, id: '24' },
    { name: 'Sports', icon: <MdSportsBaseball />, id: '17' },
    { name: 'Tech', icon: <MdBiotech />, id: '28' },
    { name: 'Songs', icon: <FaMusic />, id: '10' },
    { name: 'Blogs', icon: <FaBloggerB />, id: '1' },
    { name: 'News', icon: <FaNewspaper />, id: '25' }
  ];

  useEffect(() => {
    const fetchChannels = async () => {
      const channelIds = [
        'UC_x5XG1OV2P6uZZ5FSM9Ttw',
        'UCVHFbqXqoYvEWM1Ddxl0QDg',
        'UC29ju8bIPH5as8OGnQzwJyA',
        'UC4R8DWoMoI7CAwX8_LjQHig',
        'UC0v-tlzsn0QZwJnkiaUSJVQ',
        'UC-lHJZR3Gqxm24_Vd_AJ5Yw',
        'UC5rjz7_P-3KxjTNrZ8CUt_dbK0r1cF2g',
        'UCrFjDah5kdnBmWj8tNS2pBA',
        'UCiDJtJKMICpb9B1qf7qjEOA',
        'UCZRdNleCgW-BGUJf-bbjzQg',
        'UCGMfRSOhC8SqZ0nnjfDR1Rg',
        'UCxgAuX3XZROujMmGphN_scA'
      ];

      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
          params: {
            part: 'snippet',
            id: channelIds.join(','),
            key: APIKEY
          }
        });
        setFamousChannels(response.data.items);
      } catch (error) {
        console.error('Error fetching channels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    navigate(`/category/${categoryId}`);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <div className="flex h-full">
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 h-full bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 flex flex-col
        `}
      >
        {/* Categories Section */}
        <div className="flex-none overflow-y-auto bg-white px-3 py-4">
          <div className="space-y-1">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`
                  flex items-center px-3 py-2.5 rounded-lg cursor-pointer
                  transition-all duration-200 ease-in-out
                  ${activeCategory === category.id
                    ? 'bg-red-50 text-red-700'
                    : 'hover:bg-gray-50 text-gray-700 hover:text-red-600'
                  }
                `}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className={`text-xl ${activeCategory === category.id ? 'text-red-700' : 'text-gray-500'}`}>
                  {category.icon}
                </div>
                <span className="ml-3 font-medium text-sm">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="px-3 py-4">
          <div className="h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
        </div>

        {/* Channels Section */}
        <div className="flex-1 overflow-y-auto px-3">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Popular Channels
          </h3>
          
          {loading ? (
            <div className="space-y-3 px-3">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {famousChannels.map((channel) => (
                <div
                  key={channel.id}
                  onClick={() => {
                    navigate(`/channel/${channel.id}`);
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                  className="flex items-center px-3 py-2 rounded-lg cursor-pointer
                    transition-all duration-200 ease-in-out hover:bg-gray-50"
                >
                  <img
                    src={channel.snippet.thumbnails.default.url}
                    alt={channel.snippet.title}
                    className="w-8 h-8 rounded-full ring-2 ring-white shadow-sm"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700 truncate">
                    {channel.snippet.title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden lg:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;