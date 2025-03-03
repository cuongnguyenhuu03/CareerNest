import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar } from 'flowbite-react';
import icons from '../../utils/icons';
import { List } from "flowbite-react";
import JobCard from '../../components/card/JobCard';
import { CgWebsite } from "react-icons/cg";
import { TbMapSearch } from "react-icons/tb";
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { path } from '../../utils/constant';

const { IoPeople, GrLocation, FaCircleInfo, HiCheckCircle } = icons;

const data = [
    { text: "Trang chủ", path: path.HOME },
    { text: "Nhà tuyển dụng", path: "#" }
]

const DetailRecruitmentPage = () => {
    const ref = useRef(null);
    const { id, slug } = useParams();

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Chi tiết công ty'
    }, []);

    if (!id || !slug) return null;
    return (
        <div ref={ref} className='ct-container mt-24'>
            <Breadcrumbs data={data} />
            <div className='w-full h-[250px] rounded-md relative bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `url(/cover-default.jpg)` }} >
                <div className='w-full h-full py-3 flex flex-col items-center justify-end  bg-gray-900 bg-opacity-30'>
                    <Avatar img="/employer-1.png" size='xl' rounded />
                    <h1 className='uppercase font-semibold text-white text-base xs:text-xl sm:text-2xl'>Công ty TNHH Lumos Việt Nam</h1>
                </div>
            </div>

            <div className='hidden w-full sm:flex px-2 mt-8 gap-6'>
                <div className='basis-3/5 flex flex-col gap-3'>
                    <div>
                        <List ordered className='flex flex-col gap-6'>
                            <List.Item className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                Giới thiệu nhà tuyển dụng
                                <List nested className='text-black text-sm font-normal'>
                                    <List.Item icon={HiCheckCircle} >Mức lương: Thỏa thuận</List.Item>
                                    <List.Item icon={HiCheckCircle} >Hình thức làm việc: Remote - Làm việc từ xa.</List.Item>
                                    <List.Item icon={HiCheckCircle} >Giới tính: Nam.</List.Item>
                                    <List.Item icon={HiCheckCircle} >Số lượng tuyển: 9.</List.Item>
                                    <List.Item icon={HiCheckCircle} >Cấp bậc: Lập trình viên.</List.Item>
                                    <List.Item icon={HiCheckCircle} >Địa điểm làm việc: Hà Nội</List.Item>

                                </List>
                            </List.Item>
                            <List.Item className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                Mô tả công việc
                                <List nested className='text-black text-sm font-normal'>
                                    <List.Item>Tham gia nghiên cứu xây dựng hệ thống và phát triển các dự án sản phẩm của công ty.</List.Item>
                                    <List.Item>Vận hành và bảo trì các ứng dụng, dịch vụ hiện tại của công ty.</List.Item>
                                    <List.Item>Triển khai và phát triển dự án theo đơn đặt hàng của khách hàng.</List.Item>
                                    <List.Item>Triển khai và phát triển dự án theo đơn đặt hàng của khách hàng.</List.Item>
                                    <List.Item>Hỗ trợ kỹ thuật, hướng dẫn vận hành cho khách hàng.</List.Item>
                                    <List.Item>Thực hiện nhiệm vụ khác theo sự phân công trực tiếp của Trưởng phòng, Ban lãnh đạo.</List.Item>
                                </List>
                            </List.Item>
                            <List.Item className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                Việc làm đang tuyển dụng
                                <div className='mt-3 w-full flex flex-col gap-y-4'>
                                    <div className='shadow-lg'>
                                        <JobCard />
                                    </div>
                                    <div className='shadow-lg'>
                                        <JobCard />
                                    </div>
                                </div>
                            </List.Item>
                        </List>
                    </div>
                </div>
                <div className='basis-2/5 flex flex-col gap-3'>
                    <h1 className='flex items-center gap-2 md:text-base lg:text-lg font-medium uppercase'> <FaCircleInfo className='text-gray-500' size={15} /> Thông tin nhà tuyển dụng</h1>
                    <div className='flex gap-2 items-center'>
                        <CgWebsite className='text-[#23527c]' size={15} />
                        <span className='font-medium'> Website:</span> <a className='text-blue-600 hover:underline' target='blank' href="https://www.facebook.com/">www.facebook.com</a>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <IoPeople className='text-[#23527c]' size={15} />
                        <span className='font-medium'> Quy mô:</span> 25-99 nhân viên
                    </div>
                    <div className='flex gap-2 items-center '>
                        <GrLocation className='text-[#23527c]' size={15} />
                        <span className='font-medium'> Địa chỉ:</span> 15/4 Đặng Lộ P7 Q.Tân Bình, TP.HCM
                    </div>

                    <h1 className='mt-6 flex items-center gap-2 text-lg font-medium uppercase'> <TbMapSearch className='text-gray-500' size={15} />
                        Bản đồ
                    </h1>
                    <iframe className='w-full h-[300px] md:h-[400px]'
                        src='https://maps.google.com/maps?q=15/4%20Đặng%20Lộ%20P7%20Q.Tân%20Bình,%20TP.HCM&output=embed'>
                    </iframe>
                </div>
            </div>

            {/* Resonsive for Mobile */}
            <div className='sm:hidden w-full flex flex-col px-2 mt-8'>
                <div className='w-full flex flex-col gap-2 mb-8'>
                    <h1 className='flex items-center gap-2 text-lg font-medium uppercase'> <FaCircleInfo className='text-gray-500' size={15} /> Thông tin nhà tuyển dụng</h1>
                    <div className='flex gap-2 items-center'>
                        <CgWebsite className='text-[#23527c]' size={15} />
                        <span className='font-medium'> Website:</span> <a className='text-blue-600 hover:underline' target='blank' href="https://www.facebook.com/">www.facebook.com</a>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <IoPeople className='text-[#23527c]' size={15} />
                        <span className='font-medium'> Quy mô:</span> 25-99 nhân viên
                    </div>
                    <div className='flex gap-2 items-center '>
                        <GrLocation className='text-[#23527c]' size={15} />
                        <span className='font-medium'> Địa chỉ:</span> 15/4 Đặng Lộ P7 Q.Tân Bình, TP.HCM
                    </div>

                    <h1 className='mt-6 flex items-center gap-2 text-lg font-medium uppercase'> <TbMapSearch className='text-gray-500' size={15} />
                        Bản đồ
                    </h1>
                    <iframe className='w-full h-[300px] md:h-[400px]'
                        src='https://maps.google.com/maps?q=15/4%20Đặng%20Lộ%20P7%20Q.Tân%20Bình,%20TP.HCM&output=embed'>
                    </iframe>
                </div>
                <List ordered className='flex flex-col gap-6'>
                    <List.Item className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                        Giới thiệu nhà tuyển dụng
                        <List nested className='text-black text-sm font-normal'>
                            <List.Item icon={HiCheckCircle} >Mức lương: Thỏa thuận</List.Item>
                            <List.Item icon={HiCheckCircle} >Hình thức làm việc: Remote - Làm việc từ xa.</List.Item>
                            <List.Item icon={HiCheckCircle} >Giới tính: Nam.</List.Item>
                            <List.Item icon={HiCheckCircle} >Số lượng tuyển: 9.</List.Item>
                            <List.Item icon={HiCheckCircle} >Cấp bậc: Lập trình viên.</List.Item>
                            <List.Item icon={HiCheckCircle} >Địa điểm làm việc: Hà Nội</List.Item>

                        </List>
                    </List.Item>
                    <List.Item className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                        Mô tả công việc
                        <List nested className='text-black text-sm font-normal'>
                            <List.Item>Tham gia nghiên cứu xây dựng hệ thống và phát triển các dự án sản phẩm của công ty.</List.Item>
                            <List.Item>Vận hành và bảo trì các ứng dụng, dịch vụ hiện tại của công ty.</List.Item>
                            <List.Item>Triển khai và phát triển dự án theo đơn đặt hàng của khách hàng.</List.Item>
                            <List.Item>Triển khai và phát triển dự án theo đơn đặt hàng của khách hàng.</List.Item>
                            <List.Item>Hỗ trợ kỹ thuật, hướng dẫn vận hành cho khách hàng.</List.Item>
                            <List.Item>Thực hiện nhiệm vụ khác theo sự phân công trực tiếp của Trưởng phòng, Ban lãnh đạo.</List.Item>
                        </List>
                    </List.Item>
                    <List.Item className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                        Việc làm đang tuyển dụng
                        <div className='mt-3 w-full flex flex-col gap-y-4'>
                            <div className='shadow-lg'>
                                <JobCard />
                            </div>
                            <div className='shadow-lg'>
                                <JobCard />
                            </div>
                        </div>
                    </List.Item>
                </List>

            </div>

        </div>
    );
};

export default DetailRecruitmentPage;