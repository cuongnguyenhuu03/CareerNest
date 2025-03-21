import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { path } from '../../utils/constant';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { Tabs, Badge, Dropdown } from "flowbite-react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import AppliedJob from '../../modules/job/AppliedJob';
import SavedJob from '../../modules/job/SavedJob';

const data = [
    { text: "Trang chủ", path: path.HOME },
    { text: "Việc làm của tôi", path: "#" }
]
const MyJobPage = () => {
    const location = useLocation();
    const ref = useRef(null);
    const [activeTab, setActiveTab] = useState(location?.state === 'saved' ? 1 : 0);
    const [selected, setSelected] = useState("Ngày ứng tuyển gần nhất");

    console.log(activeTab)

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Việc làm của tôi';
    }, []);

    return (
        <div ref={ref} className='ct-container py-4 mt-20 bg-[#f7f7f7]'>
            <Breadcrumbs data={data} />
            <div className='bg-[#fff] px-6 py-3 rounded-lg'>
                <h1 className='font-semibold text-xl mb-3'>Việc làm của tôi</h1>
                <Tabs
                    variant="underline"
                    onActiveTabChange={(index) => setActiveTab(index)}
                    theme={{
                        tablist: {
                            base: 'flex border-b border-gray-200 space-x-4',
                            tabitem: {
                                base: '!outline-none focus:!outline-none focus:!ring-0 ring-0 text-xs',
                            }
                        }
                    }}
                >
                    <Tabs.Item
                        active={activeTab === 0}
                        title={
                            <div className='flex items-center gap-2'>
                                Đã ứng tuyển
                                <Badge color={activeTab === 0 ? "info" : "gray"} size="sm" className='rounded-full'>
                                    3
                                </Badge>
                            </div>
                        }>
                    </Tabs.Item>

                    <Tabs.Item
                        active={activeTab === 1}
                        title={
                            <div className='flex items-center gap-2'>
                                Đã lưu
                                <Badge color={activeTab === 1 ? "info" : "gray"} size="sm" className='rounded-full'>
                                    3
                                </Badge>
                            </div>
                        }>
                    </Tabs.Item>
                </Tabs>
            </div>
            <div className='w-full my-4 flex flex-col md:flex-row md:justify-between md:items-center px-6'>
                <div className='flex items-center gap-2 mb-4 md:mb-0'>
                    {activeTab === 1 &&
                        <>
                            <IoMdInformationCircleOutline size={15} />
                            <span>Bạn có thể lưu tối đa 20 công việc.</span>
                        </>
                    }
                </div>
                <div className='flex gap-2'>
                    <span>Sắp xếp theo:</span>
                    <Dropdown label={selected} inline>
                        <Dropdown.Item onClick={() => setSelected(`${activeTab === 0 ? 'Ngày ứng tuyển gần nhất' : "Ngày hết hạn gần nhất"}`)}>
                            {activeTab === 0 ? 'Ngày ứng tuyển gần nhất' : "Ngày hết hạn gần nhất"}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelected(`${activeTab === 0 ? 'Ngày ứng tuyển xa nhất' : "Việc làm mới nhất"}`)}>
                            {activeTab === 0 ? 'Ngày ứng tuyển xa nhất' : "Việc làm mới nhất"}
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            </div>
            <div className='w-full px-6 py-3'>
                {/* Render component theo activeTab */}
                {activeTab === 0 && <AppliedJob />}
                {activeTab === 1 && <SavedJob />}
            </div>
        </div>
    );
};

export default MyJobPage;
