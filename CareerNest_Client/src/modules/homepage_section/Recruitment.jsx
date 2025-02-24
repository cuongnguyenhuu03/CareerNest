import React from 'react';
import icons from '../../utils/icons';
import slugify from "slugify";
import { useNavigate } from 'react-router-dom';

const { FaMoneyCheckDollar, FaRegBuilding, GrLocation, GrNetworkDrive } = icons;

const Recruitment = () => {
    const navigate = useNavigate();
    return (
        <div className='w-full py-10 bg-gray-100 mb-6 md:mb-16 px-6 md:px-10 lg:px-[150px]'>
            <h1 className='text-2xl mb-10 text-center text-slate-800 font-bold uppercase'>Tin tuyển dụng mới nhất</h1>
            <div className='w-full grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 xs:gap-4 xl:gap-8'>
                <div className={`w-full flex gap-3 md:gap-6 p-[12px] items-center justify-between cursor-pointer hover:rounded-md ct-hover-transition text-black hover:bg-white`}>
                    <div className='flex flex-col gap-2'>
                        <img
                            src={'/company_logo.jpg'} alt="thumbnail"
                            className={`w-12 h-12  sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] xl:w-[100px] xl:h-[100px] object-cover rounded-md`}
                        />
                        <div className="w-full py-1 text-[9px] md:text-xs flex gap-1 items-center justify-center text-white font-semibold rounded bg-red-500">
                            <GrLocation size={18} /> Hà Nội
                        </div>
                    </div>
                    <div className='flex flex-auto flex-col gap-1'>
                        <div className={`text-sm md:text-base lg:text-lg xl:text-base font-medium uppercase`}
                            onClick={() => navigate(`/job/detail/1/${slugify('Lập trình viên Python', { lower: true, strict: true })}`)}
                        >
                            Lập trình viên Python
                        </div>
                        <div className='flex gap-2 items-center text-xs md:text-sm font-light'>
                            <FaRegBuilding size={15} /> Công ty TNHH Lumos Việt nam
                        </div>
                        <div className='flex mb-6 gap-2 text-orange-600 items-center text-xs md:text-sm font-light'>
                            <FaMoneyCheckDollar /> Lương thỏa thuận
                        </div>
                        <div className='flex gap-2 items-center text-xs md:text-sm font-light'>
                            <GrNetworkDrive /> Làm việc từ xa
                        </div>
                    </div>
                </div>

                <div className={`w-full flex gap-3 md:gap-6 p-[12px] items-center justify-between cursor-pointer hover:rounded-md ct-hover-transition text-black hover:bg-white`}>
                    <div className='flex flex-col gap-2'>
                        <img
                            src={'/company_logo.jpg'} alt="thumbnail"
                            className={`w-12 h-12  sm:w-[60px]  sm:h-[60px]  md:w-[80px] md:h-[80px] xl:w-[100px] xl:h-[100px] object-cover rounded-md`}
                        />
                        <div className="w-full py-1 text-[9px] md:text-xs flex gap-1 items-center justify-center text-white font-semibold rounded bg-red-500">
                            <GrLocation size={18} /> Hà Nội
                        </div>
                    </div>
                    <div className='flex flex-auto flex-col gap-1'>
                        <div className={`text-sm md:text-base lg:text-lg xl:text-base font-medium uppercase`}>
                            Lập trình viên Python
                        </div>
                        <div className='flex gap-2 items-center text-xs md:text-sm font-light'>
                            <FaRegBuilding size={15} /> Công ty TNHH Lumos Việt nam
                        </div>
                        <div className='flex mb-6 gap-2 text-orange-600 items-center text-xs md:text-sm font-light'>
                            <FaMoneyCheckDollar /> Lương thỏa thuận
                        </div>
                        <div className='flex gap-2 items-center text-xs md:text-sm font-light'>
                            <GrNetworkDrive /> Làm việc từ xa
                        </div>
                    </div>
                </div>

                <div className={`w-full flex gap-3 md:gap-6 p-[12px] items-center justify-between cursor-pointer hover:rounded-md ct-hover-transition text-black hover:bg-white`}>
                    <div className='flex flex-col gap-2'>
                        <img
                            src={'/company_logo.jpg'} alt="thumbnail"
                            className={`w-12 h-12  sm:w-[60px]  sm:h-[60px] md:w-[80px] md:h-[80px] xl:w-[100px] xl:h-[100px] object-cover rounded-md`}
                        />
                        <div className="w-full py-1 text-[9px] md:text-xs flex gap-1 items-center justify-center text-white font-semibold rounded bg-red-500">
                            <GrLocation size={18} /> Hà Nội
                        </div>
                    </div>
                    <div className='flex flex-auto flex-col gap-1'>
                        <div className={`text-sm md:text-base lg:text-lg xl:text-base font-medium uppercase`}>
                            Lập trình viên Python
                        </div>
                        <div className='flex gap-2 items-center text-xs md:text-sm font-light'>
                            <FaRegBuilding size={15} /> Công ty TNHH Lumos Việt nam
                        </div>
                        <div className='flex mb-6 gap-2 text-orange-600 items-center text-xs md:text-sm font-light'>
                            <FaMoneyCheckDollar /> Lương thỏa thuận
                        </div>
                        <div className='flex gap-2 items-center text-xs md:text-sm font-light'>
                            <GrNetworkDrive /> Làm việc từ xa
                        </div>
                    </div>
                </div>

                <div className={`w-full flex gap-3 md:gap-6 p-[12px] items-center justify-between cursor-pointer hover:rounded-md ct-hover-transition text-black hover:bg-white`}>
                    <div className='flex flex-col gap-2'>
                        <img
                            src={'/company_logo.jpg'} alt="thumbnail"
                            className={`w-12 h-12  sm:w-[60px]  sm:h-[60px] md:w-[80px] md:h-[80px] xl:w-[100px] xl:h-[100px] object-cover rounded-md`}
                        />
                        <div className="w-full py-1 text-[9px] md:text-xs flex gap-1 items-center justify-center text-white font-semibold rounded bg-red-500">
                            <GrLocation size={18} /> Hà Nội
                        </div>
                    </div>
                    <div className='flex flex-auto flex-col gap-1'>
                        <div className={`text-sm md:text-base lg:text-lg xl:text-base font-medium uppercase`}>
                            Lập trình viên Python
                        </div>
                        <div className='flex gap-2 items-center text-xs md:text-sm font-light'>
                            <FaRegBuilding size={15} /> Công ty TNHH Lumos Việt nam
                        </div>
                        <div className='flex mb-6 gap-2 text-orange-600 items-center text-xs md:text-sm font-light'>
                            <FaMoneyCheckDollar /> Lương thỏa thuận
                        </div>
                        <div className='flex gap-2 items-center text-xs md:text-sm font-light'>
                            <GrNetworkDrive /> Làm việc từ xa
                        </div>
                    </div>
                </div>

                <div className={`w-full flex gap-3 md:gap-6 p-[12px] items-center justify-between cursor-pointer hover:rounded-md ct-hover-transition text-black hover:bg-white`}>
                    <div className='flex flex-col gap-2'>
                        <img
                            src={'/company_logo.jpg'} alt="thumbnail"
                            className={`w-12 h-12  sm:w-[60px]  sm:h-[60px] md:w-[80px] md:h-[80px] xl:w-[100px] xl:h-[100px] object-cover rounded-md`}
                        />
                        <div className="w-full py-1 text-[9px] md:text-xs flex gap-1 items-center justify-center text-white font-semibold rounded bg-red-500">
                            <GrLocation size={18} /> Hà Nội
                        </div>
                    </div>
                    <div className='flex flex-auto flex-col gap-1'>
                        <div className={`text-sm md:text-base lg:text-lg xl:text-base font-medium uppercase`}>
                            Lập trình viên Python
                        </div>
                        <div className='flex gap-2 items-center text-xs md:text-sm font-light'>
                            <FaRegBuilding size={15} /> Công ty TNHH Lumos Việt nam
                        </div>
                        <div className='flex mb-6 gap-2 text-orange-600 items-center text-xs md:text-sm font-light'>
                            <FaMoneyCheckDollar /> Lương thỏa thuận
                        </div>
                        <div className='flex gap-2 items-center text-xs md:text-sm font-light'>
                            <GrNetworkDrive /> Làm việc từ xa
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Recruitment;