import React, { useEffect, useRef } from 'react';
import { Avatar, Badge } from 'flowbite-react';
import icons from '../../utils/icons';
import { path } from '../../utils/constant';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { Link, useNavigate } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const { CiMail, MdOutlineSubtitles } = icons;
const data = [
    { text: "Trang chủ", path: path.HOME },
    { text: "Tổng quan hồ sơ", path: "#" }
]
const OverviewPage = () => {
    const navigate = useNavigate();
    const ref = useRef(null);

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Tổng quan hồ sơ';
    }, []);

    return (
        <div ref={ref} className='ct-container mt-20 flex flex-col'>
            <Breadcrumbs data={data} />

            {/* Thông tin cá nhân */}
            <div className='w-full flex gap-x-4 shadow-md p-4 rounded-lg mb-6'>
                <Avatar size='lg' rounded />
                <div className='flex flex-col gap-y-3'>
                    <h1 className='font-semibold text-xl xs:text-3xl text-slate-800'>Vũ Hoàng Hải</h1>
                    <div className='flex gap-2 items-center text-gray-600'>
                        <MdOutlineSubtitles size={15} />
                        <span className='font-medium'> Fresher Web Developer</span>
                    </div>
                    <div className='flex gap-2 items-center text-gray-600'>
                        <CiMail size={15} />
                        <span className='font-medium'> vuhoanghai@gmai.com</span>
                    </div>
                    <Link to={`${path.ACCOUNT}/profile/12`} className='flex items-center text-blue-600'>
                        Chi tiết hồ sơ <MdKeyboardDoubleArrowRight size={18} />
                    </Link>
                </div>
            </div>

            {/* Hồ sơ đính kèm */}
            <div className='w-full flex flex-col gap-y-4 shadow-md p-3 sm:p-4 rounded-lg mb-6'>
                <Badge className='w-fit text-base sm:text-lg' color="info" size='sm'>CV đính kèm của bạn</Badge>
                <div className='w-full flex gap-x-4 rounded-lg bg-[#f7f7f7] p-2 sm:p-6 border border-gray-200'>
                    <Avatar size='lg' className='sm:order-1 order-2'
                        img={'https://itviec.com/assets/profile/uploaded-resume-f70bd4d24afa0fa12412353a2fe8c4deaa8bdc1a9ffef1cdb2b8638adb24a5ac.svg'}
                    />
                    <div className='flex flex-col gap-y-3 sm:order-2 order-1'>
                        <Link
                            className='text-[#414042] underline text-xs sm:text-lg font-medium'
                            to={'#'}
                        >
                            VuHoangHai_Intern_BackEndDeveloper_CV.pdf
                        </Link>
                        <span className='text-[#a6a6a6] text-xs sm:text-sm'>Cập nhật lần cuối: 03/03/2025</span>
                        <Link to={`${path.CV}/${path.CV__MANAGE}`} className='flex text-xs sm:text-sm items-center text-blue-600'>
                            Quản lý CV <MdKeyboardDoubleArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* HỒ sơ online */}
            <div className='w-full flex flex-col gap-y-4 shadow-md p-4 rounded-lg mb-6'>
                <Badge className='w-fit text-sm sm:text-lg' color="success" size='sm'>CV online của bạn trên CareerNest</Badge>
                <div className='w-full flex gap-x-3 rounded-lg bg-[#f7f7f7] p-2 xs:p-6 border border-gray-200'>
                    <div className='basis-1/3 flex flex-col gap-y-2 items-center justify-center'>
                        <span className='rounded-full bg-red-500 w-12 xs:w-16 h-12 xs:h-16 sm:w-20 sm:h-20 flex items-center justify-center text-white text-lg xs:text-2xl sm:text-3xl font-bold'>3</span>
                        <span className='text-xs xs:text-[13px] sm:text-lg font-medium text-center'>Hồ sơ được tạo</span>
                    </div>
                    <div className='basis-2/3 flex flex-col gap-y-3'>
                        <p className='text-[11px] xs:tex-sm sm:text-base text-justify'>
                            Hồ sơ của bạn đã sẵn sàng để tạo CV. Tiếp tục hoàn thiện hồ sơ để CV của bạn thêm thu hút.
                        </p>
                        <Link to={`${path.CV}/${path.CV__MANAGE}`} className='flex text-xs xs:text-sm items-center text-blue-600'>
                            Quản lý CV <MdKeyboardDoubleArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Việc làm đã ứng tuyển / đã lưu */}
            <div className='w-full flex flex-col gap-y-4 shadow-md p-4 rounded-lg'>
                <Badge className='w-fit text-base sm:text-lg' color="warning" size='sm'>Hoạt động của bạn</Badge>
                <div className='w-full flex gap-4'>
                    <div className='basis-1/2 bg-[#eaf0fa] flex rounded-lg cursor-pointer hover:border hover:border-blue-500 ct-hover-transition'
                        onClick={() => navigate(`${path.ACCOUNT}/${path.ACCOUNT__MY__JOB}`, { state: 'applied' })}
                    >
                        <div className='basis-2/3 flex flex-col gap-y-4 p-3'>
                            <div className='text-slate-800 font-medium text-sm xs:text-lg sm:text-xl'>Việc làm đã ứng tuyển</div>
                            <span className='text-[#085bdd] font-bold text-2xl sm:text-3xl flex items-center gap-3'>
                                1 <MdKeyboardDoubleArrowRight size={18} />
                            </span>
                        </div>
                        <div className='basis-1/3 flex items-center'>
                            <Avatar size='lg' className='hidden xs:block'
                                img={'https://itviec.com/assets/profile/paper-plane-8a851b897473226130bc976102c2b0c3ba7883876b92aa9f8961c40433694f83.svg'}
                            />
                            <Avatar size='md' className='xs:hidden'
                                img={'https://itviec.com/assets/profile/paper-plane-8a851b897473226130bc976102c2b0c3ba7883876b92aa9f8961c40433694f83.svg'}
                            />
                        </div>
                    </div>
                    <div className='basis-1/2 bg-[#fff5f5] flex rounded-lg cursor-pointer hover:border hover:border-red-500 ct-hover-transition'
                        onClick={() => navigate(`${path.ACCOUNT}/${path.ACCOUNT__MY__JOB}`, { state: 'saved' })}
                    >
                        <div className='basis-2/3 flex flex-col gap-y-4 p-3'>
                            <div className='text-slate-800 font-medium text-sm xs:text-lg sm:text-xll'>Việc làm đã lưu</div>
                            <span className='text-[#c82222] font-bold text-2xl sm:text-3xl flex items-center gap-3'>
                                3 <MdKeyboardDoubleArrowRight size={18} />
                            </span>
                        </div>
                        <div className='basis-1/3 flex items-center'>
                            <Avatar size='lg' className='hidden xs:block'
                                img={'https://itviec.com/assets/profile/healthcare-fea9f68443eab63e2b652d0cfd2c9e53a3856f78ea5d3a88b536bffb4258913c.svg'}
                            />
                            <Avatar size='md' className='xs:hidden'
                                img={'https://itviec.com/assets/profile/healthcare-fea9f68443eab63e2b652d0cfd2c9e53a3856f78ea5d3a88b536bffb4258913c.svg'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewPage;