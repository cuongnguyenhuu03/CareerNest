import React, { useState } from 'react';
import icons from '../../utils/icons';
import slugify from 'slugify';
import { useNavigate } from 'react-router-dom';
import { Button, Tooltip } from 'flowbite-react';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { path } from '../../utils/constant';
import ModalDeleteCV from '../../modules/cv/ModalDeleteCV';

const { FaMoneyCheckDollar, FaRegBuilding } = icons;
const CVCard = ({ className = '' }) => {
    const navigate = useNavigate();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    return (
        <>
            <div className={`${className} rounded-lg w-full flex gap-3 md:gap-6 p-[12px] items-center justify-between hover:rounded-md ct-hover-transition text-black hover:bg-gray-100`}>
                <div className='flex flex-col gap-2'>
                    <img
                        src={'/create_cv.png'} alt="thumbnail"
                        className={`w-12 h-12  sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] xl:w-[160px] xl:h-[160px] object-contain rounded-md`}
                    />
                </div>
                <div className='flex flex-auto flex-col gap-1'>
                    <div className='hidden sm:flex items-center justify-between'>
                        <div className={`text-sm md:text-base lg:text-lg xl:text-base font-medium uppercase`}>
                            Fresher Backend NodeJS
                        </div>
                        <div className='text-right flex flex-col gap-y-4'>
                            <Button gradientDuoTone="cyanToBlue" onClick={() => navigate(`${path.CV}/${path.CV__DETAIL}?candidate=12&cv=1`)}>Xem hồ sơ</Button>
                            <div className='flex gap-x-4  items-center justify-between'>
                                <Button color="gray" size='xs' pill onClick={() => alert('aaa')}>
                                    <FaRegEdit size={15} className='mr-2' /> Sửa
                                </Button>
                                <Button color="gray" size='xs' pill onClick={() => setOpenDeleteModal(true)}>
                                    <MdDelete size={15} className='mr-2' /> Xóa
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='sm:hidden mb-4'>
                        <div className='flex gap-x-4 mb-4'>
                            <Button className='w-fit' size='xs' gradientDuoTone="cyanToBlue" onClick={() => navigate(`${path.CV}/${path.CV__CREATE}`)}>Xem hồ sơ</Button>
                            <div className='flex gap-x-4 items-center'>
                                <Tooltip content="Sửa hồ sơ" style="light">
                                    <Button color="gray" size='xs' pill> <FaRegEdit size={15} /> </Button>
                                </Tooltip>
                                <Tooltip content="Xóa hồ sơ" style="light">
                                    <Button color="gray" size='xs' pill> <MdDelete size={15} onClick={() => setOpenDeleteModal(true)} /> </Button>
                                </Tooltip>
                            </div>
                        </div>
                        <div className={`text-sm md:text-base lg:text-lg xl:text-base font-medium uppercase`}
                            onClick={() => navigate(`/job/detail/1/${slugify('Lập trình viên Python', { lower: true, strict: true })}`)}
                        >
                            Fresher Backend NodeJS
                        </div>
                    </div>

                    <div className='flex gap-2 items-center text-xs md:text-sm font-light'>
                        <FaRegBuilding size={15} /> Mã CV: 192783910
                    </div>
                    <div className='flex mb-6 gap-2 text-orange-600 items-center text-xs md:text-sm font-light'>
                        <FaMoneyCheckDollar /> Chức vụ: Lập trình viên
                    </div>
                </div>
            </div>
            {openDeleteModal && <ModalDeleteCV openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} cvId={'#112233'} />}
        </>

    );
};

export default CVCard;