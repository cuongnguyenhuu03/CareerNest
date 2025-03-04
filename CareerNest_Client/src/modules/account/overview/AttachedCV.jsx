import { Avatar, Badge, FileInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { path } from '../../../utils/constant';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";

const AttachedCV = () => {
    const [fileName, setFileName] = useState('VuHoangHai_Intern_BackEndDeveloper_CV.pdf');
    const location = useLocation();

    return (
        <div className='w-full flex flex-col gap-y-4 shadow-md p-3 sm:p-4 rounded-lg mb-6'>
            <Badge className='w-fit text-base sm:text-lg' color="info" size='sm'>CV đính kèm của bạn</Badge>
            <div className='w-full flex gap-x-4 rounded-lg bg-[#f7f7f7] p-2 sm:p-6 border border-gray-200'>
                <Avatar size='lg' className='sm:order-1 order-2'
                    img={'https://itviec.com/assets/profile/uploaded-resume-f70bd4d24afa0fa12412353a2fe8c4deaa8bdc1a9ffef1cdb2b8638adb24a5ac.svg'}
                />
                <div className='flex flex-col gap-y-3 sm:order-2 order-1'>
                    <Link
                        className='text-[#414042] underline text- xs:text-xs sm:text-lg font-medium'
                        to={'#'}
                    >
                        {fileName}
                    </Link>
                    <span className='text-[#a6a6a6] text-xs sm:text-sm'>Cập nhật lần cuối: 03/03/2025</span>
                    {location.pathname.includes('overview') ?
                        <Link to={`${path.CV}/${path.CV__MANAGE}`} className='flex text-xs sm:text-sm items-center text-blue-600'>
                            Quản lý CV <MdKeyboardDoubleArrowRight size={18} />
                        </Link>
                        :
                        <>
                            <label className="w-fit p-2 cursor-pointer border border-red-500 rounded-lg bg-white text-sm xs:text-base text-red-500 font-medium flex items-center gap-2">
                                <FaFileUpload /> Tải CV lên
                                <FileInput
                                    accept=".docx,.doc,.pdf"
                                    // onChange={(e) => setCv(e.target.files?.[0])}
                                    onChange={(e) => setFileName(e.target?.files?.[0]?.name)}
                                    className="hidden" // Ẩn input
                                />
                            </label>
                            <div className='text-xs xs:text-sm mt-3 text-gray-500'>Chỉ chấp nhận file định dạng .docx, .doc, .pdf *</div>
                        </>

                    }
                </div>
            </div>
        </div>
    );
};

export default AttachedCV;