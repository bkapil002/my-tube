import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import APIKEY from '../Key/APIKEY';

interface SearchResult {
  id: {
    videoId: string;
  };
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
}

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        setLoading(true);
        try {
          const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
              part: 'snippet',
              q: query,
              type: 'video',
              maxResults: 20,
              key: APIKEY,
            },
          });
          setSearchResults(response.data.items);
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6'>
      <div className='max-w-[2000px] mx-auto'>
        {query && (
          <h1 className='text-2xl font-semibold text-slate-800 mb-6 px-4'>
            Search results for "{query}"
          </h1>
        )}
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
            searchResults.map((result) => (
              <div
                key={result.id.videoId}
                onClick={() => navigate(`/video/${result.id.videoId}`)}
                className='group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer'
              >
                <div className='relative aspect-video overflow-hidden'>
                  <img
                    src={result.snippet.thumbnails.medium.url}
                    alt={result.snippet.title}
                    className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300'
                  />
                </div>
                <div className='p-4'>
                  <div className='flex items-start space-x-3'>
                    <img
                      src={result.snippet.thumbnails.default.url}
                      alt={result.snippet.channelTitle}
                      className='rounded-full w-10 h-10 object-cover ring-2 ring-slate-50'
                    />
                    <div>
                      <h2 className='font-medium text-slate-900 line-clamp-2 leading-snug mb-1 group-hover:text-blue-600 transition-colors'>
                        {result.snippet.title}
                      </h2>
                      <p className='text-sm text-slate-600 font-medium'>
                        {result.snippet.channelTitle}
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

export default Search;