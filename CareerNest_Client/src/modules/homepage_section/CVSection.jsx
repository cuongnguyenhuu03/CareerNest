import { Button } from 'flowbite-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';

const CVSection = () => {
    const navigate = useNavigate();
    return (
        <div className="main-cv tracking-wider ct-container">
            <div className="flex flex-nowrap gap-8">
                <div className="basis-1/2 rounded-md flex items-center bg-blue-100 h-[230px] md:h-[260px] pl-6" >
                    <div className="basis-1/2 md:basis-2/3 flex flex-col gap-3 md:gap-6">
                        <h2 className='text-base md:text-xl font-semibold text-slate-800'>Tạo CV</h2>
                        <h3 className='mb-3 md:mb-8 text-[10px] sm:text-xs md:text-sm'>Giúp bạn tạo CV xin việc trực tiếp trên hệ thống nhanh chóng, tiện lợi hơn bao giờ hết...</h3>
                        <Button gradientMonochrome="failure" className='w-fit h-10 sm:h-auto' onClick={() => navigate(`${path.CV}/${path.CV__CREATE}`)}>
                            <span className='flex uppercase gap-2 items-center text-[10px] md:text-sm'>
                                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Tạo CV
                            </span>
                        </Button>
                    </div>
                    <div className="basis-1/2 md:basis-1/3 h-[180px] bg-contain bg-no-repeat bg-center"
                        style={{ backgroundImage: `url('/create_cv.png')` }}
                    />
                </div>

                <div className="basis-1/2 rounded-md flex items-center bg-blue-100 h-[230px] md:h-[260px] pl-6">
                    <div className="basis-1/2 md:basis-2/3 flex flex-col gap-3 md:gap-6">
                        <h2 className='text-base md:text-xl font-semibold text-slate-800'>Sử dụng CV sẵn có</h2>
                        <h3 className='mb-3 md:mb-8 text-[10px] sm:text-xs md:text-sm'>Nếu bạn đã có CV của riêng mình, hãy tải lên cho nhà tuyển dụng nhìn thấy</h3>
                        <Button gradientMonochrome="failure" className='w-fit h-10 sm:h-auto'>
                            <span className='flex uppercase gap-2 items-center text-[10px] md:text-sm'>
                                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01" />
                                </svg>
                                Upload CV
                            </span>
                        </Button>
                    </div>
                    <div className="basis-1/2 md:basis-1/3 h-[180px] bg-contain bg-no-repeat bg-center"
                        style={{ backgroundImage: `url('/upload_cv.png')` }}
                    />
                </div>
            </div>

        </div>
    );
};

export default CVSection;