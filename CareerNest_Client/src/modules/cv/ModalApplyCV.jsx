import { Badge, Button, FileInput, Label, Radio } from 'flowbite-react';
import React, { useState } from 'react';

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
        <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4 sm:px-0'>
            <div className='bg-white rounded-lg w-[600px] shadow-lg p-6'>
                <div className='flex justify-between items-center border-b pb-2'>
                    <h2 className='text-lg sm:text-xl font-medium uppercase'>Ứng tuyển {jobTitle}</h2>
                    <button onClick={() => setOpenModal(false)} className='text-gray-500 text-xl'>
                        &times;
                    </button>
                </div>

                <div className='space-y-4 mt-4'>
                    <label className='block'>
                        <Radio name='option' value='online' onChange={() => setOption('online')} className='mr-2' />
                        Sử dụng CV online
                    </label>

                    {option === 'online' && (
                        <div className='ml-6 space-y-2'>
                            <Label className='flex items-center gap-2'>
                                <Radio name='cv' value='cv1' onChange={(e) => setCv(e.target.value)} />
                                <Badge color="info">Fresher Backend NodeJS</Badge>
                            </Label>
                            <Label className='flex items-center gap-2'>
                                <Radio name='cv' value='cv2' onChange={(e) => setCv(e.target.value)} />
                                <Badge color="info">Fresher FrontEnd NodeJS</Badge>
                            </Label>
                        </div>
                    )}

                    <label className='block'>
                        <Radio name='option' value='upload' onChange={() => setOption('upload')} className='mr-2' />
                        Tải CV từ máy tính
                    </label>

                    {option === 'upload' && (
                        <FileInput
                            accept=".docx,.doc,.pdf"
                            onChange={(e) => setCv(e.target.files[0])}
                            helperText="Chỉ chấp nhận file định dạng .docx, .doc, .pdf" />
                    )}

                    <label className='block font-semibold'>Lời nhắn:</label>
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
        </div>
    );
};

export default ModalApplyCV;
