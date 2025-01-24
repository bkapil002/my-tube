import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from '../Image/thumbnail2.png';
import APIKEY from '../Key/APIKEY';
import { useParams } from 'react-router-dom';

const Chanel: React.FC = () => {
  const { id } = useParams();
  const [channelData, setChannelData] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${id}&key=${APIKEY}`
        );
        setChannelData(response.data.items[0]);
      } catch (error) {
        console.error('Error fetching channel data:', error);
      }
    };

    const fetchChannelVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${id}&type=video&key=${APIKEY}`
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching channel videos:', error);
      }
    };

    fetchChannelData();
    fetchChannelVideos();
  }, [id]);

  const handleButtonClick = () => {
    setSubscribed(!subscribed);
  };

  const abbreviateNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (!channelData) {
    return <div></div>;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Channel Header */}
      <div className="relative">
        <div className="h-64 w-full overflow-hidden">
          <img 
            src={image} 
            alt="" 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
        </div>

        {/* Channel Info Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
            <img 
              src={channelData.snippet.thumbnails.default.url} 
              alt="" 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl transform hover:scale-105 transition-all duration-300"
            />
            
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {channelData.snippet.title}
              </h1>
              <p className="text-gray-600 text-lg mb-4 line-clamp-2">
                {channelData.snippet.description}
              </p>
              <div className="flex items-center gap-6">
                <span className="text-gray-600 font-medium">
                  {abbreviateNumber(channelData.statistics.subscriberCount)} subscribers
                </span>
                <button
                  onClick={handleButtonClick}
                  className={`px-8 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                    subscribed
                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {subscribed ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div 
              key={video.id.videoId}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative group">
                <img
                  src={video.snippet.thumbnails.default.url}
                  alt={video.snippet.title}
                  className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-4">
                <div className="flex gap-3">
                  <img 
                    alt="" 
                    src={channelData.snippet.thumbnails.default.url} 
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-900 line-clamp-2 mb-1 hover:text-red-600 transition-colors duration-200">
                      {video.snippet.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {video.snippet.channelTitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chanel;