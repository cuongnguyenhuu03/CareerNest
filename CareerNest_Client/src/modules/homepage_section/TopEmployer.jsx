import React, { useState } from 'react';

const TopEmployer = () => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div className='w-full mb-6 md:mb-16 px-6 md:px-10 lg:px-[150px]'>
            <h1 className='text-2xl mb-10 text-center text-slate-800 font-bold uppercase'>Top nhà tuyển dụng hàng đầu</h1>
            <div className='w-full grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10'>
                <div style={{ backgroundImage: `url(/employer-1.png)` }}
                    className='w-full border border-gray-300 h-[130px] md:h-[170px] xl:h-[200px] rounded-md relative bg-contain  bg-no-repeat bg-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110'
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    {isHover && <div className='absolute z-50 transition-all top-0 bottom-0 left-0 right-0 bg-overlay-30 rounded-md' />}
                </div >

                <div style={{ backgroundImage: `url(/employer-2.png)` }}
                    className='w-full border border-gray-300 h-[130px] md:h-[170px] xl:h-[200px] rounded-md relative bg-contain  bg-no-repeat bg-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110'
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    {isHover && <div className='absolute z-50 transition-all top-0 bottom-0 left-0 right-0 bg-overlay-30 rounded-md' />}
                </div >

                <div style={{ backgroundImage: `url(/employer-1.png)` }}
                    className='w-full border border-gray-300 h-[130px] md:h-[170px] xl:h-[200px] rounded-md relative bg-contain  bg-no-repeat bg-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110'
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    {isHover && <div className='absolute z-50 transition-all top-0 bottom-0 left-0 right-0 bg-overlay-30 rounded-md' />}
                </div >
                <div style={{ backgroundImage: `url(/employer-2.png)` }}
                    className='w-full border border-gray-300 h-[130px] md:h-[170px] xl:h-[200px] rounded-md relative bg-contain  bg-no-repeat bg-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110'
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    {isHover && <div className='absolute z-50 transition-all top-0 bottom-0 left-0 right-0 bg-overlay-30 rounded-md' />}
                </div >

                <div style={{ backgroundImage: `url(/employer-1.png)` }}
                    className='w-full border border-gray-300 h-[130px] md:h-[170px] xl:h-[200px] rounded-md relative bg-contain  bg-no-repeat bg-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110'
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    {isHover && <div className='absolute z-50 transition-all top-0 bottom-0 left-0 right-0 bg-overlay-30 rounded-md' />}
                </div >
                <div style={{ backgroundImage: `url(/employer-2.png)` }}
                    className='w-full border border-gray-300 h-[130px] md:h-[170px] xl:h-[200px] rounded-md relative bg-contain  bg-no-repeat bg-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110'
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    {isHover && <div className='absolute z-50 transition-all top-0 bottom-0 left-0 right-0 bg-overlay-30 rounded-md' />}
                </div >
                <div style={{ backgroundImage: `url(/employer-1.png)` }}
                    className='w-full border border-gray-300 h-[130px] md:h-[170px] xl:h-[200px] rounded-md relative bg-contain  bg-no-repeat bg-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110'
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    {isHover && <div className='absolute z-50 transition-all top-0 bottom-0 left-0 right-0 bg-overlay-30 rounded-md' />}
                </div >
                <div style={{ backgroundImage: `url(/employer-2.png)` }}
                    className='w-full border border-gray-300 h-[130px] md:h-[170px] xl:h-[200px] rounded-md relative bg-contain  bg-no-repeat bg-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110'
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    {isHover && <div className='absolute z-50 transition-all top-0 bottom-0 left-0 right-0 bg-overlay-30 rounded-md' />}
                </div >
            </div>
        </div>
    );
};

export default TopEmployer;