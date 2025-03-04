import { Button, FileInput, Label, Radio, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFileUpload } from "react-icons/fa";

const ModalApplyCV = ({ openModal = false, setOpenModal = () => { }, jobTitle = "công việc abcd" }) => {
    const [option, setOption] = useState('');
    const [cv, setCv] = useState(null);
    const [message, setMessage] = useState('');

    const handleApply = () => {
        console.log('Option:', option);
        console.log('CV:', cv);
        console.log('Message:', message);
        setOpenModal(false);
    };

    if (!openModal) return null;
    return (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4 sm:px-0 overflow-y-auto'>
            <div className='bg-white rounded-lg w-[600px] shadow-lg p-6 max-h-[95vh] overflow-y-auto scroll-smooth'>
                <div className='flex justify-between items-center border-b pb-2'>
                    <h2 className='text-lg sm:text-xl font-medium uppercase'>Ứng tuyển {jobTitle}</h2>
                    <button onClick={() => setOpenModal(false)} className='text-gray-500 text-xl'>
                        &times;
                    </button>
                </div>

                <div className='space-y-4 mt-4'>
                    <label className='block'>
                        <Radio name='option' value='online' onChange={() => setOption('online')} className='mr-2' />
                        Sử dụng CV hiện tại
                    </label>

                    {option === 'online' && (
                        <div className='w-full flex gap-x-4 rounded-lg bg-[#f7f7f7] p-2 sm:p-6 border border-gray-200'>
                            <div className='flex flex-col gap-y-3'>
                                <Link
                                    className='text-blue-500 underline text-[11px] xs:text-base font-medium'
                                    to={'/'}
                                >
                                    VuHoangHai_Intern_BackEndDeveloper_CV.pdf
                                </Link>
                                <span className='text-[#a6a6a6] text-xs sm:text-sm'>Cập nhật lần cuối: 03/03/2025</span>

                            </div>
                        </div>
                    )}

                    <label className='block'>
                        <Radio name='option' value='upload' onChange={() => setOption('upload')} className='mr-2' />
                        Tải lên CV mới
                    </label>

                    {option === 'upload' && (
                        <>
                            <div className='flex items-center gap-x-6'>
                                <label className="w-fit p-2 cursor-pointer border border-red-500 rounded-lg bg-white text-sm xs:text-base text-red-500 font-medium flex items-center gap-2">
                                    <FaFileUpload /> Tải CV lên
                                    <FileInput
                                        accept=".docx,.doc,.pdf"
                                        onChange={(e) => setCv(e.target.files?.[0])}
                                        className="hidden" // Ẩn input
                                    />
                                </label>
                                {cv && (
                                    <span className='text-xs xs:text-sm text-red-500'>
                                        📄 {cv?.name ?? ''}
                                    </span>
                                )}
                            </div>
                            <div className='text-xs xs:text-sm mt-3 text-gray-500'>Chỉ chấp nhận file định dạng .docx, .doc, .pdf *</div>
                        </>
                    )}

                    <label className='block font-semibold'>Thông tin cá nhân</label>
                    <form className="flex max-w-md flex-col gap-3">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="fullName" value="Họ và tên" />
                            </div>
                            <TextInput id="fullName" type="text" value="Vũ Hoàng Hải" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phoneNumber" value="Số điện thoại" />
                            </div>
                            <TextInput id="phoneNumber" type="text" value="0123 456 789" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="city" value="Nơi làm việc mong muốn" />
                            </div>
                            <Select id="city" defaultValue={'hcm'} required>
                                <option value={'hcm'}>TP HCM</option>
                                <option value={'us'}>Hà Nội</option>
                                <option value={'dn'}>Đà nẵng</option>
                                <option value={'ct'}>Cần Thơ</option>
                            </Select>
                        </div>
                    </form>
                    <label className='block font-semibold'>Thư xin việc:</label>
                    <textarea
                        placeholder='Bạn có thể nêu mong muốn, lý do lựa chọn công ty này...'
                        className='border rounded p-2 w-full outline-none'
                        rows={4}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <div className='flex justify-end gap-3 mt-6'>
                    <Button color="gray" size='sm' onClick={() => setOpenModal(false)}>Bỏ qua</Button>
                    <Button color="failure" pill onClick={handleApply} size='sm'
                        disabled={!option || !cv}
                    >
                        Nộp CV
                    </Button>
                </div>
            </div>
        </div >
    );
};

export default ModalApplyCV;
