import React, { useState } from 'react';
import { Modal, Datepicker } from "flowbite-react";
import { getBase64 } from '../../utils/getBase64';
import { Button, Upload, Image } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import './UploadAccount.scss';

const UpdateAccount = ({ isOpen = false, setOpenModal = () => { } }) => {
    const [avatar, setAvatar] = useState('');
    const [dob, setDOB] = useState(null);

    const handleOnchangeAvatar = async ({ fileList }) => {
        if (fileList?.length <= 0)
            return;
        const file = fileList[0];
        if (!file?.url && !file?.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file?.preview)
    };

    return (
        <>
            <Modal show={isOpen} size="xl" className='pt-20' popup onClose={() => setOpenModal(false)} >
                <Modal.Header />
                <Modal.Body>
                    <form >
                        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="avatar" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Avatar </label>
                                <div className='flex items-center gap-x-6 xs:gap-x-10'>
                                    <Upload onChange={handleOnchangeAvatar} maxCount={1}>
                                        <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                                    </Upload>
                                    {avatar &&
                                        <Image
                                            src={avatar}
                                            style={{ height: '90px', width: '90px', borderRadius: '50%', objectFit: 'cover', border: '1px solid gray' }}
                                            alt="avatar"
                                        />
                                    }
                                </div>

                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="full_name_info_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Họ và tên </label>
                                <input type="text" id="full_name_info_modal" className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Enter your first name" required />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="email_info_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Email </label>
                                <input type="text" id="email_info_modal" className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Enter your email here" required />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="birthDay_info_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Ngày sinh </label>
                                <Datepicker value={dob} onChange={(date) => setDOB(date)} language='vi' placeholder='Chọn ngày sinh' />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="phone-input_billing_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Số điện thoại </label>
                                <div className="flex items-center">
                                    <button id="dropdown_phone_input__button_billing_modal" data-dropdown-toggle="dropdown_phone_input_billing_modal" className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700" type="button">
                                        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="h-4 w-4 mr-2" preserveAspectRatio="xMidYMid meet"><circle cx={32} cy={32} r={30} fill="#f42f4c" /><path fill="#ffe62e" d="M32 39l9.9 7l-3.7-11.4l9.8-7.4H35.8L32 16l-3.7 11.2H16l9.8 7.4L22.1 46z" /></svg>
                                        +84
                                    </button>
                                    <div className="relative w-full">
                                        <input type="text" id="phone-input" className="z-20 outline-none block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="0123 456 789" required />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="address_billing_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Địa chỉ </label>
                                <textarea id="address_billing_modal" rows={3} className="block w-full outline-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Enter here your address" defaultValue={""} />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <div className="mb-2 flex items-center gap-2">
                                    <label htmlFor="select_city_input_billing_modal" className="block text-sm font-medium text-gray-900 dark:text-white"> Tỉnh thành </label>
                                </div>
                                <select id="select_city_input_billing_modal" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                    <option selected>Hồ Chí Minh</option>
                                    <option value="NY">Hà Nội</option>
                                    <option value="LA">Đà Nẵng</option>
                                    <option value="CH">Cần Thơ</option>
                                    <option value="HU">Đồng Tháp</option>
                                </select>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="company_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Company name </label>
                                <input type="text" id="company_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Flowbite LLC" />
                            </div>
                        </div>
                        <div className="text-right border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
                            <button type="submit" className="me-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save information</button>
                            <button type="button" data-modal-toggle="accountInformationModal2" className="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Cancel</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal >

        </>
    );
};

export default UpdateAccount;