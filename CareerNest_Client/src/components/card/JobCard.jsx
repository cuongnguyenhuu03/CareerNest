import React, { useState } from 'react';
import icons from '../../utils/icons';
import slugify from 'slugify';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Tooltip } from "flowbite-react";
import ModalApplyCV from '../../modules/cv/ModalApplyCV';

const { FaMoneyCheckDollar, FaRegBuilding, GrLocation, GrNetworkDrive, FaRegCalendarAlt, HiCheckCircle, FaHeart } = icons;

const JobCard = ({ className = '', isApplied = false, isSaved = false }) => {
    const navigate = useNavigate();
    const [isOpenModal, setOpenModal] = useState(false);

    return (
        <>
            <div className={`${className} rounded-lg w-full flex gap-3 md:gap-6 p-[12px] items-center justify-between cursor-pointer hover:rounded-md ct-hover-transition text-black hover:bg-white`}>
                <div className='flex flex-col gap-2'>
                    <img
                        src={'/company_logo.jpg'} alt="thumbnail"
                        className={`w-12 h-12 border border-gray-300  sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] xl:w-[100px] xl:h-[100px] object-cover rounded-md`}
                    />
                    <div className="w-full py-1 text-[9px] md:text-xs flex gap-1 items-center justify-center text-white font-semibold rounded bg-red-500">
                        <GrLocation size={18} /> Hà Nội
                    </div>
                </div>
                <div className='flex flex-auto flex-col gap-1'>
                    {(isApplied && !isSaved) ?
                        <>
                            <div className='hidden sm:flex items-center justify-between'>
                                <div className={`text-sm md:text-base lg:text-lg xl:text-base font-medium uppercase`}
                                    onClick={() => navigate(`/job/detail/1/${slugify('Lập trình viên Python', { lower: true, strict: true })}`)}
                                >
                                    Lập trình viên Python
                                </div>
                                <span className='text-xs md:text-sm'>Ứng tuyển vào ngày: 27/02/2025</span>
                            </div>
                            <div className='sm:hidden'>
                                <span className='text-xs md:text-sm text-gray-400 '>Ứng tuyển vào ngày: 27/02/2025</span>
                                <div className={`mt-4 text-sm md:text-base lg:text-lg xl:text-base font-medium uppercase`}
                                    onClick={() => navigate(`/job/detail/1/${slugify('Lập trình viên Python', { lower: true, strict: true })}`)}
                                >
                                    Lập trình viên Python
                                </div>
                            </div>
                        </>
                        :
                        isSaved ?
                            <>
                                <div className='hidden sm:flex items-center justify-between'>
                                    <div className={`text-sm md:text-base lg:text-lg xl:text-base font-medium uppercase`}
                                        onClick={() => navigate(`/job/detail/1/${slugify('Lập trình viên Python', { lower: true, strict: true })}`)}
                                    >
                                        Lập trình viên Python
                                    </div>
                                    <div className='text-right flex flex-col gap-y-2'>
                                        <span className='text-xs md:text-sm'>Đăng 1 ngày trước</span>
                                        <span className='text-xs md:text-sm text-orange-600'>(Hết hạn trong 10 ngày)</span>
                                        <div className='flex items-center justify-between'>
                                            {isApplied ?
                                                <Badge icon={HiCheckCircle} color="success" size="sm">
                                                    Đã ứng tuyển
                                                </Badge>
                                                : <Button gradientDuoTone="pinkToOrange" onClick={() => setOpenModal(true)}>Ứng tuyển</Button>
                                            }
                                            <Tooltip content="Đã lưu" style="dark">
                                                <FaHeart size={28} color='red' />
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                                <div className='sm:hidden mb-4'>
                                    <div className='flex flex-col gap-y-2'>
                                        <div className='flex gap-x-2'>
                                            <span className='text-xs md:text-sm'>Đăng 1 ngày trước</span>
                                            <span className='text-[10px] xs:text-xs md:text-sm text-orange-600'>(Hết hạn trong 10 ngày)</span>
                                        </div>
                                        <div className='flex items-center gap-x-4'>
                                            {isApplied ?
                                                <Badge icon={HiCheckCircle} color="success" size="xs">
                                                    Đã ứng tuyển
                                                </Badge>
                                                : <Button size='xs' gradientDuoTone="pinkToOrange"
                                                    onClick={() => setOpenModal(true)}
                                                >
                                                    Ứng tuyển
                                                </Button>
                                            }
                                            <Tooltip content="Đã lưu" style="dark">
                                                <FaHeart size={20} color='red' />
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className={`mt-4 text-sm md:text-base lg:text-lg xl:text-base font-medium uppercase`}
                                        onClick={() => navigate(`/job/detail/1/${slugify('Lập trình viên Python', { lower: true, strict: true })}`)}
                                    >
                                        Lập trình viên Python
                                    </div>
                                </div>
                            </>
                            :
                            <div className={`text-sm md:text-base lg:text-lg xl:text-base font-medium uppercase`}
                                onClick={() => navigate(`/job/detail/1/${slugify('Lập trình viên Python', { lower: true, strict: true })}`)}
                            >
                                Lập trình viên Python
                            </div>
                    }

                    <div className='flex gap-2 items-center text-xs md:text-sm font-light'>
                        <FaRegBuilding size={15} /> Công ty TNHH Lumos Việt nam
                    </div>
                    <div className='flex gap-2 items-center text-xs md:text-sm font-light'>
                        <FaRegCalendarAlt /> Ngày đăng: 27/2/2025
                    </div>
                    <div className='flex mb-6 gap-2 text-orange-600 items-center text-xs md:text-sm font-light'>
                        <FaMoneyCheckDollar /> Lương thỏa thuận
                    </div>
                    <div className='flex gap-2 items-center text-xs md:text-sm font-light'>
                        <GrNetworkDrive /> Làm việc từ xa
                    </div>
                </div>
            </div>
            {isOpenModal && <ModalApplyCV openModal={isOpenModal} setOpenModal={setOpenModal} />}
        </>

    );
};

export default JobCard;