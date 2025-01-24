import React, { useEffect, useState } from 'react';
import APIKEY from '../Key/APIKEY';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface Video {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: {
      medium: {
        url: string;
      };
      default: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: number;
  };
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageToken, setPageToken] = useState<string>('');

  useEffect(() => {
    setVideos([]);
    setPageToken('');
    fetchVideos('');
  }, [id]);

  const fetchVideos = async (pageToken = '') => {
    setLoading(true);
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,statistics',
          maxResults: 20,
          chart: 'mostPopular',
          key: APIKEY,
          videoCategoryId: id,
          pageToken: pageToken,
        },
      });
      setVideos(response.data.items);
      setPageToken(response.data.nextPageToken);
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  function abbreviateNumber(number: number): string {
    const SI_SYMBOL = ["", "K", "M", "B", "T"];
    const tier = Math.log10(Math.abs(number)) / 3 | 0;
    if (tier === 0) return number.toString();
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = number / scale;
    return scaled.toFixed(1) + suffix;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6'>
      <div className='max-w-[2000px] mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {loading ? (
            [...Array(12)].map((_, index) => (
              <div key={index} className='bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden'>
                <div className='aspect-video bg-slate-200 animate-pulse'></div>
                <div className='p-4'>
                  <div className='flex items-start space-x-3'>
                    <div className='rounded-full bg-slate-200 w-10 h-10 animate-pulse'></div>
                    <div className='flex-1 space-y-2'>
                      <div className='h-4 bg-slate-200 rounded animate-pulse'></div>
                      <div className='h-4 bg-slate-200 rounded w-2/3 animate-pulse'></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            videos.map((video) => (
              <div
                key={video.id}
                onClick={() => navigate(`/video/${video.id}`)}
                className='group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer'
              >
                <div className='relative aspect-video overflow-hidden'>
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300'
                  />
                </div>
                <div className='p-4'>
                  <div className='flex items-start space-x-3'>
                    <img
                      src={video.snippet.thumbnails.default.url}
                      alt={video.snippet.channelTitle}
                      className='rounded-full w-10 h-10 object-cover ring-2 ring-slate-50'
                    />
                    <div>
                      <h2 className='font-medium text-slate-900 line-clamp-2 leading-snug mb-1 group-hover:text-blue-600 transition-colors'>
                        {video.snippet.title}
                      </h2>
                      <p className='text-sm text-slate-600 font-medium'>
                        {video.snippet.channelTitle}
                      </p>
                      <p className='text-xs text-slate-500 mt-1'>
                        {abbreviateNumber(video.statistics.viewCount)} views
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;