import React, { useEffect, useRef } from 'react';
import { path } from '../../utils/constant';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { Button, Select, Space } from 'antd';
import { Link } from 'react-router-dom';
import { Badge } from 'flowbite-react';
import { MdDeleteOutline } from "react-icons/md";
import { Tooltip } from "flowbite-react";

const data = [
    { text: "Trang chủ", path: path.HOME },
    { text: "Nhận job qua mail", path: "#" }
]

const options = [
    {
        label: 'NodeJS',
        value: 'nodejs',
    },
    {
        label: 'ReactJS',
        value: 'reactjs',
    },
    {
        label: 'Javascript',
        value: 'javascript',
    },
];

const JobViaEmail = () => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Nhận job qua email';
    }, []);

    const handleChange = (value) => {
        console.log(`${value}`);
    };

    const handleChangeCity = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div ref={ref} className='ct-container mt-20 flex flex-col'>
            <Breadcrumbs data={data} />
            <div className='w-full flex flex-col gap-y-4 shadow-md p-6 rounded-lg '>
                <div className='text-base xs:text-lg sm:text-xl font-semibold text-slate-800 uppercase tracking-wider'>Kỹ năng đã đăng ký </div>
                <span className='text-xs xs:text-sm md:text-base'>Đăng ký Job Robot để không bỏ lỡ việc làm phù hợp với kỹ năng của bạn.</span>
                <div className='hidden sm:flex items-center gap-x-4'>
                    <Select
                        mode="multiple"
                        style={{ width: '50%' }}
                        placeholder="Tìm kiếm kĩ năng, chức vụ"
                        defaultValue={[]}
                        onChange={handleChange}
                        options={options}
                        optionRender={(option) => (
                            <Space>
                                {option.data.label}
                            </Space>
                        )}
                    />
                    <Select
                        defaultValue="hcm"
                        style={{ width: '30%' }}
                        onChange={handleChangeCity}
                        options={[
                            {
                                value: 'hcm',
                                label: 'Ho Chi Minh',
                            },
                            {
                                value: 'hn',
                                label: 'Ha Noi',
                            },
                            {
                                value: 'dn',
                                label: 'Da Nang',
                            },
                        ]}
                    />
                    <Button type="primary" danger style={{ width: '10%' }} >
                        Đăng ký
                    </Button>
                </div>
                <div className='sm:hidden flex flex-col gap-y-4'>
                    <div className='flex gap-x-3'>
                        <Select
                            mode="multiple"
                            style={{ width: '60%' }}
                            placeholder="Tìm kiếm kĩ năng, chức vụ"
                            defaultValue={[]}
                            onChange={handleChange}
                            options={options}
                            optionRender={(option) => (
                                <Space>
                                    {option.data.label}
                                </Space>
                            )}
                        />
                        <Select
                            defaultValue="hcm"
                            style={{ width: '40%' }}
                            onChange={handleChangeCity}
                            options={[
                                {
                                    value: 'hcm',
                                    label: 'Ho Chi Minh',
                                },
                                {
                                    value: 'hn',
                                    label: 'Ha Noi',
                                },
                                {
                                    value: 'dn',
                                    label: 'Da Nang',
                                },
                            ]}
                        />
                    </div>
                    <Button type="primary" size='large' danger style={{ width: '30%', margin: '0 auto' }} >
                        Đăng ký
                    </Button>
                </div>

                <div className='w-full flex items-center rounded-md p-2 sm:p-4 border border-gray-300 '>
                    <div className='basis-2/3 flex items-center gap-x-2 sm:gap-x-3'>
                        <span className='font-semibold text-[11px] xs:text-xs sm:text-sm'>1.</span>
                        <Link
                            to={"#"}
                            className='font-medium tracking-wide text-slate-800 underline hover:transition-colors hover:text-red-500'
                        >
                            <span className='font-semibold text-[11px] xs:text-xs sm:text-sm'>Lập trình viên NodeJS</span> tại Hồ Chí Minh
                        </Link>
                    </div>
                    <div className='hidden basis-1/3 xs:flex items-center gap-x-2 sm:gap-x-0 justify-start sm:justify-evenly'>
                        <Badge color="success" size='sm' className='hidden sm:block'>Đã đăng ký</Badge>
                        <Badge color="success" size='xs' className='sm:hidden block'>Đã đăng ký</Badge>
                        <Tooltip content="Xóa" style="dark">
                            <MdDeleteOutline size={25} className='hidden sm:block' />
                            <MdDeleteOutline size={20} className='sm:hidden block' />
                        </Tooltip>
                    </div>
                    <div className='xs:hidden basis-1/3 flex flex-col items-center gap-y-2'>
                        <Badge color="success" size='sm' className='hidden sm:block'>Đã đăng ký</Badge>
                        <Badge color="success" className='sm:hidden block'>Đã đăng ký</Badge>
                        <Tooltip content="Xóa" style="dark">
                            <MdDeleteOutline size={25} className='hidden sm:block' />
                            <MdDeleteOutline size={20} className='sm:hidden block' />
                        </Tooltip>
                    </div>
                </div>
                <div className='w-full flex items-center rounded-md p-2 sm:p-4 border border-gray-300 '>
                    <div className='basis-2/3 flex items-center gap-x-2 sm:gap-x-3'>
                        <span className='font-semibold text-[11px] xs:text-xs sm:text-sm'>1.</span>
                        <Link
                            to={"#"}
                            className='font-medium tracking-wide text-slate-800 underline hover:transition-colors hover:text-red-500'
                        >
                            <span className='font-semibold text-[11px] xs:text-xs sm:text-sm'>Lập trình viên NodeJS</span> tại Hồ Chí Minh
                        </Link>
                    </div>
                    <div className='hidden basis-1/3 xs:flex items-center gap-x-2 sm:gap-x-0 justify-start sm:justify-evenly'>
                        <Badge color="success" size='sm' className='hidden sm:block'>Đã đăng ký</Badge>
                        <Badge color="success" size='xs' className='sm:hidden block'>Đã đăng ký</Badge>
                        <Tooltip content="Xóa" style="dark">
                            <MdDeleteOutline size={25} className='hidden sm:block' />
                            <MdDeleteOutline size={20} className='sm:hidden block' />
                        </Tooltip>
                    </div>
                    <div className='xs:hidden basis-1/3 flex flex-col items-center gap-y-2'>
                        <Badge color="success" size='sm' className='hidden sm:block'>Đã đăng ký</Badge>
                        <Badge color="success" className='sm:hidden block'>Đã đăng ký</Badge>
                        <Tooltip content="Xóa" style="dark">
                            <MdDeleteOutline size={25} className='hidden sm:block' />
                            <MdDeleteOutline size={20} className='sm:hidden block' />
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default JobViaEmail;