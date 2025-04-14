import React, { useEffect, useRef, useState } from 'react';
import { path } from '../../utils/constant';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { Button, Select, Space, Spin, message } from 'antd';
import { useSkills } from '../../hooks/useSkills';
import withErrorBoundary from '../../hoc/withErrorBoundary';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { postCreateNewSubscriber } from '../../services/subcriberService';
import { useSubscribers } from '../../hooks/useSubscribers';
import { Link } from 'react-router-dom';
import { Badge, Tooltip } from 'flowbite-react';
import { MdDeleteOutline } from "react-icons/md";

const data = [
    { text: "Trang chủ", path: path.HOME },
    { text: "Nhận job qua mail", path: "#" }
]
const JobViaEmail = () => {
    const user = useSelector(state => state?.user?.info);

    const ref = useRef(null);
    const selectedSkillsRef = useRef([]);
    const [resetKey, setResetKey] = useState(0);
    const { res: resSkills, isFetchingSkills, error: errSkills } = useSkills();
    const { res: resSubscribers, isFetchingSubscribers, error: errSubscribers } = useSubscribers(user?.email ?? '');

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Nhận job qua email';
    }, []);

    const handleChange = (values) => {
        selectedSkillsRef.current = values.map((v) => ({ id: v }));
    };

    const mapSkillsToOptions = (listSkills) => {
        if (!Array.isArray(listSkills)) return [];
        return listSkills.map(skill => ({
            value: skill.id,
            label: skill.name
        }));
    };

    const handleSubmit = async () => {
        const data = {
            email: user?.email,
            name: `${user?.lastName} ${user?.firstName}`,
            skills: selectedSkillsRef.current
        };
        try {
            let res = await postCreateNewSubscriber(data);
            if (res?.id) {
                message.success("Đăng ký nhận job thành công.");
                selectedSkillsRef.current = [];
                setResetKey(prev => prev + 1);  //reset giao diện `Select` cũng về rỗng:
            }
            else toast.warning("Đăng ký nhận job không thành công!");
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
    };

    if (errSkills || errSubscribers) {
        console.log(errSkills);
        console.log(errSubscribers);
        return <></>;
    }
    return (
        <div ref={ref} className='ct-container pt-20 flex flex-col'>
            <Breadcrumbs data={data} />
            <div className='w-full flex flex-col gap-y-4 shadow-md dark:shadow-lg dark:bg-slate-800 p-6 rounded-lg'>
                {
                    (isFetchingSkills || isFetchingSubscribers) ? (
                        <div className='w-full h-40 flex items-center justify-center'>
                            <Spin size="large" />
                        </div>
                    )
                        :
                        <>
                            <div className='text-base xs:text-lg sm:text-xl font-semibold text-slate-800 dark:text-white uppercase tracking-wider'>Kỹ năng đã đăng ký </div>
                            <span className='text-xs xs:text-sm md:text-base dark:text-gray-400'>Đăng ký Job Robot để không bỏ lỡ việc làm phù hợp với kỹ năng của bạn.</span>
                            <div className='hidden sm:flex items-center gap-x-4'>
                                <Select
                                    key={resetKey}
                                    mode="multiple"
                                    style={{ width: '60%' }}
                                    placeholder="Tìm kiếm kĩ năng, chức vụ"
                                    defaultValue={[]}
                                    onChange={handleChange}
                                    options={mapSkillsToOptions(resSkills?.data)}
                                    optionRender={(option) => (
                                        <Space>{option.data.label}</Space>
                                    )}
                                />
                                <Select
                                    defaultValue="hcm"
                                    style={{ width: '30%' }}
                                    // onChange={handleChangeCity}
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
                                <Button onClick={handleSubmit} type="primary" danger style={{ width: '10%' }} >
                                    Đăng ký
                                </Button>
                            </div>
                            <div className='sm:hidden flex flex-col gap-y-4'>
                                <div className='flex gap-x-3'>
                                    <Select
                                        key={resetKey}
                                        mode="multiple"
                                        style={{ width: '60%' }}
                                        placeholder="Tìm kiếm kĩ năng, chức vụ"
                                        defaultValue={[]}
                                        onChange={handleChange}
                                        options={mapSkillsToOptions(resSkills?.data)}
                                        optionRender={(option) => (
                                            <Space>{option.data.label}</Space>
                                        )}
                                    />

                                    <Select
                                        defaultValue="hcm"
                                        style={{ width: '40%' }}
                                        // onChange={handleChangeCity}
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
                                <Button onClick={handleSubmit} type="primary" size='large' danger style={{ width: '30%', margin: '0 auto' }} >
                                    Đăng ký
                                </Button>
                            </div>

                            {resSubscribers?.length > 0 &&
                                <div className='w-full flex items-center rounded-md p-2 sm:p-4 border border-gray-300 dark:border-gray-700'>
                                    <div className='basis-2/3 flex items-center gap-2 sm:gap-x-3 flex-wrap'>
                                        {resSubscribers.map(item => (
                                            <Badge key={item?.id} color="gray">{item?.name}</Badge>
                                        ))}
                                    </div>
                                    <div className='hidden basis-1/3 xs:flex items-center gap-x-2 sm:gap-x-0 justify-start sm:justify-evenly'>
                                        <Badge color="success" size='sm' className='hidden sm:block'>Đã đăng ký</Badge>
                                        <Badge color="success" size='xs' className='sm:hidden block'>Đã đăng ký</Badge>
                                        <Tooltip content="Xóa" style="dark">
                                            <MdDeleteOutline size={25} className='hidden sm:block cursor-pointer dark:text-white' />
                                            <MdDeleteOutline size={20} className='sm:hidden block cursor-pointer dark:text-white' />
                                        </Tooltip>
                                    </div>
                                    <div className='xs:hidden basis-1/3 flex flex-col items-center gap-y-2'>
                                        <Badge color="success" size='sm' className='hidden sm:block'>Đã đăng ký</Badge>
                                        <Badge color="success" className='sm:hidden block'>Đã đăng ký</Badge>
                                        <Tooltip content="Xóa" style="dark">
                                            <MdDeleteOutline size={25} className='hidden sm:block cursor-pointer dark:text-white' />
                                            <MdDeleteOutline size={20} className='sm:hidden block cursor-pointer dark:text-white' />
                                        </Tooltip>
                                    </div>
                                </div>
                            }
                        </>
                }
            </div>
        </div >
    );
};

export default withErrorBoundary(JobViaEmail);