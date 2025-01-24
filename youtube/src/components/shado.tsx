import React from 'react';

const Shado: React.FC = () => {
  return (
    <div className='bg-slate-100 ml-3 rounded-lg w-full'>
      <div className='mt-2 flex w-full'>
        <div className='w-2/3'>
          <div>
            <div className='w-full h-64 bg-slate-400 animate-pulse rounded-lg'></div>
            <div className='w-80 h-5 bg-slate-400 animate-pulse rounded-full mt-2'></div>
            <div className='mt-3 flex justify-between items-center'>
              <div className='flex'>
                <div className='rounded-full ml-2 w-12 h-12 bg-slate-400 animate-pulse'></div>
                <div className='ml-3'>
                  <div className='w-32 h-6 bg-slate-400 rounded-full animate-pulse'></div>
                  <div className='w-24 h-6 bg-slate-400 rounded-full animate-pulse mt-1'></div>
                </div>
              </div>
              <div className='flex'>
                <div className='w-32 h-8 mr-2 bg-slate-400 animate-pulse rounded-full'></div>
                <div className='flex'>
                  <div className='w-10 h-10 bg-slate-400 animate-pulse rounded-full'></div>
                  <div className='w-10 h-10 bg-slate-400 animate-pulse rounded-full ml-2'></div>
                </div>
              </div>
            </div>
            <div className='mt-6'>
              <div className='w-40 h-5 bg-slate-400 animate-pulse'></div>
              <div className='w-full bg-slate-400 h-px mt-2 rounded-full'></div>
              {[...Array(15)].map((_, index) => (
                <div key={index} className='mt-4 ml-2 flex'>
                  <div className='flex'>
                    <div className='h-10 w-10 rounded-full bg-slate-400 animate-pulse'></div>
                    <div className='ml-3'>
                      <div className='w-40 h-5 bg-slate-400 animate-pulse rounded-full'></div>
                      <div className='w-96 h-5 bg-slate-400 animate-pulse rounded-full mt-1'></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='w-1/3'>
          <div className='ml-4 w-full gap-y-2'>
            {[...Array(16)].map((_, index) => (
              <div key={index} className='flex mb-4 hover:bg-slate-200 rounded-lg cursor-pointer'>
                <div className='h-24 w-40 bg-slate-400 animate-pulse rounded-lg'></div>
                <div className='ml-2'>
                  <div className='w-48 h-5 bg-slate-400 animate-pulse rounded-full'></div>
                  <div className='w-40 h-5 bg-slate-400 animate-pulse rounded-full mt-1'></div>
                  <div className='w-32 h-5 bg-slate-400 animate-pulse rounded-full mt-1'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shado;
