import React, { useEffect, useRef, useState } from 'react';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { path } from '../../utils/constant';
import { Badge } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { Button, Upload, Image } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import './CVCreatePage.scss';
import { getBase64 } from '../../utils/getBase64';
import Markdown from '../../components/markdown/Markdown';

const data = [
    { text: "Trang chủ", path: path.HOME },
    { text: "Quản lý CV", path: path.CV + '/' + path.CV__MANAGE },
    { text: "Tạo CV", path: '#' },
]

const CVCreatePage = () => {
    const ref = useRef(null);
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Tạo CV';
    }, []);

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
        <div ref={ref} className='w-full py-4 mt-20 px-6 md:px-10 lg:px-[150px] bg-[#f7f7f7]'>
            <Breadcrumbs data={data} />
            <div className='bg-[#fff] px-6 py-3 rounded-lg'>
                <Badge className='py-2 rounded-md mb-4 tracking-wider text-base' color="gray" size='sm'>Thông tin tạo hồ sơ xin việc</Badge>
                <div className="mb-5 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="col-span-2">
                        <label htmlFor="avatar" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Ảnh đại diện </label>
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
                        <label htmlFor="CV_name_info_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Tên hồ sơ</label>
                        <input type="text" id="CV_name_info_modal" className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" required />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="porfolio_info_modal" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Porfolio </label>
                        <input type="text" id="porfolio_info_modal" className="outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" required />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <div className="mb-2 flex items-center gap-2">
                            <label htmlFor="select_city_input_billing_modal" className="block text-sm font-medium text-gray-900 dark:text-white"> Cấp bậc </label>
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
                        <div className="mb-2 flex items-center gap-2">
                            <label htmlFor="select_city_input_billing_modal" className="block text-sm font-medium text-gray-900 dark:text-white"> Chuyên ngành </label>
                        </div>
                        <select id="select_city_input_billing_modal" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                            <option selected>Hồ Chí Minh</option>
                            <option value="NY">Hà Nội</option>
                            <option value="LA">Đà Nẵng</option>
                            <option value="CH">Cần Thơ</option>
                            <option value="HU">Đồng Tháp</option>
                        </select>
                    </div>
                    <div className="col-span-2">
                        <div className="mb-2 flex items-center gap-2">
                            <label htmlFor="select_city_input_billing_modal" className="block text-sm font-medium text-gray-900 dark:text-white"> Loại công việc </label>
                        </div>
                        <select id="select_city_input_billing_modal" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                            <option selected>Hồ Chí Minh</option>
                            <option value="NY">Hà Nội</option>
                            <option value="LA">Đà Nẵng</option>
                            <option value="CH">Cần Thơ</option>
                            <option value="HU">Đồng Tháp</option>
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Mục tiêu nghề nghiệp </label>
                        <Markdown />
                    </div>
                    <div className="col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Kinh nghiệm </label>
                        <Markdown />
                    </div>
                    <div className="col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Kỹ năng </label>
                        <Markdown />
                    </div>
                    <div className="col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Học vấn </label>
                        <Markdown />
                    </div>
                    <div className="col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Kỹ năng mềm </label>
                        <Markdown />
                    </div>
                    <div className="col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Giải thưởng đạt được </label>
                        <Markdown />
                    </div>
                </div>
                <div className="text-right border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
                    <button type="submit" className="me-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Tạo CV</button>
                    <button onClick={() => navigate(`${path.CV}/${path.CV__MANAGE}`)} type="button" data-modal-toggle="accountInformationModal2" className="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Hủy</button>
                </div>

            </div>
        </div>
    );
};

export default CVCreatePage;