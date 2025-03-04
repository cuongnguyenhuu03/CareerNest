import { Avatar } from 'flowbite-react';
import React from 'react';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import icons from '../../../utils/icons';
import { Link } from 'react-router-dom';
import { path } from '../../../utils/constant';

const { CiMail, MdOutlineSubtitles } = icons;

const ShortInfo = () => {
    return (
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
    );
};

export default ShortInfo;