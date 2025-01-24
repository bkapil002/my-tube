import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/VideoPage.css';
import Shado from './shado';
import APIKEY from '../Key/APIKEY';

const Videopage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoDetails, setVideoDetails] = useState<any>(null);
  const [channelDetails, setChannelDetails] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [relatedVideos, setRelatedVideos] = useState<any[]>([]);
  const [subscribed, setSubscribed] = useState(false);
  const [thumbsUpClicked, setThumbsUpClicked] = useState(false);
  const [thumbsDownClicked, setThumbsDownClicked] = useState(false);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${APIKEY}`
        );
        setVideoDetails(response.data.items[0]);

        const channelResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${response.data.items[0].snippet.channelId}&key=${APIKEY}`
        );
        setChannelDetails(channelResponse.data.items[0]);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${id}&key=${APIKEY}`
        );
        setComments(response.data.items);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const fetchRelatedVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&key=${APIKEY}`
        );
        setRelatedVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching related videos:', error);
      }
    };

    fetchVideoDetails();
    fetchComments();
    fetchRelatedVideos();
  }, [id]);

  const handleButtonClick = () => {
    setSubscribed(!subscribed);
  };

  const handleThumbsUpClick = () => {
    setThumbsUpClicked(!thumbsUpClicked);
    if (thumbsDownClicked) setThumbsDownClicked(false);
  };

  const handleThumbsDownClick = () => {
    setThumbsDownClicked(!thumbsDownClicked);
    if (thumbsUpClicked) setThumbsUpClicked(false);
  };

  const abbreviateNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (!videoDetails || !channelDetails) {
    return <div className="w-full"><Shado /></div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-[2000px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="lg:w-[65%] space-y-4">
            {/* Video Player */}
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-white">
              <iframe
                src={`https://www.youtube.com/embed/${id}`}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Title */}
            <h1 className="text-2xl font-bold text-gray-900 line-clamp-2 mt-4">
              {videoDetails.snippet.title}
            </h1>

            {/* Channel Info & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-gray-200">
              <div 
                onClick={() => navigate(`/channel/${channelDetails.id}`)}
                className="flex items-center space-x-4 cursor-pointer group"
              >
                <img
                  alt={channelDetails.snippet.title}
                  src={channelDetails.snippet.thumbnails.default.url}
                  className="w-12 h-12 rounded-full ring-2 ring-white shadow-md transition-transform group-hover:scale-105"
                />
                <div>
                  <h2 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {videoDetails.snippet.channelTitle}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {abbreviateNumber(videoDetails.statistics.viewCount)} views
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleButtonClick}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                    subscribed
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {subscribed ? 'Subscribe' : 'Subscribed'}
                </button>

                <div className="flex items-center bg-gray-100 rounded-full p-1">
                  <button
                    onClick={handleThumbsUpClick}
                    className={`p-2 rounded-l-full transition-colors ${
                      thumbsUpClicked ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
                    }`}
                  >
                    <i className="fa-solid fa-thumbs-up"></i>
                  </button>
                  <div className="w-px h-5 bg-gray-300"></div>
                  <button
                    onClick={handleThumbsDownClick}
                    className={`p-2 rounded-r-full transition-colors ${
                      thumbsDownClicked ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
                    }`}
                  >
                    <i className="fa-solid fa-thumbs-down"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-8 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Comments</h2>
              <div className="space-y-6">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4 group">
                      <img
                        src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                        alt={comment.snippet.topLevelComment.snippet.authorDisplayName}
                        className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {comment.snippet.topLevelComment.snippet.authorDisplayName}
                        </h3>
                        <p className="text-gray-600 mt-1 line-clamp-3">
                          {comment.snippet.topLevelComment.snippet.textDisplay}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No comments found.</p>
                )}
              </div>
            </div>
          </div>

          {/* Related Videos */}
          <div className="lg:w-[35%] space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Videos</h2>
            <div className="space-y-4">
              {relatedVideos.map((video) => (
                <div
                  key={video.id.videoId}
                  onClick={() => navigate(`/video/${video.id.videoId}`)}
                  className="flex space-x-3 group cursor-pointer rounded-lg hover:bg-white p-2 transition-all duration-200"
                >
                  <div className="flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600">
                      {video.snippet.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {video.snippet.channelTitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videopage;