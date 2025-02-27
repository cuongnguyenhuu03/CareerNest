import React, { useEffect, useRef } from 'react';
import icons from '../../utils/icons';
import { List } from "flowbite-react";

const { FaRegBuilding, FaMoneyCheckDollar, IoMdTime, IoPeople, GrLocation, FaCircleInfo, HiCheckCircle } = icons;

const DetailJobPage = ({ jobData = {} }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Chi tiết công việc'
    }, []);

    return (
        <div ref={ref} className='w-full flex flex-col gap-8 mt-20 px-6 md:px-10 lg:px-[150px]'>
            <div className='w-full shadow-md flex items-center justify-between py-3 gap-3 xs:gap-6 rounded-lg'>
                <img
                    src={'/company_logo.jpg'} alt="thumbnail"
                    className={`w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] lg:w-[150px] lg:h-[150px] object-cover rounded-md`}
                />
                <div className='flex flex-auto flex-col gap-1'>
                    <div className={`text-sm md:text-base lg:text-lg xl:text-xl font-medium uppercase`} >
                        Lập trình viên Python
                    </div>
                    <div className='flex gap-2 items-center text-sm md:text-base font-medium text-[#23527c]'>
                        <FaRegBuilding size={15} /> Công ty TNHH Lumos Việt nam
                    </div>
                    <div className='flex mb-6 gap-2 text-orange-600 items-center text-xs md:text-sm font-light'>
                        <FaMoneyCheckDollar /> Lương thỏa thuận
                    </div>
                    <div className='flex gap-2 items-center text-xs md:text-sm font-light'>
                        <IoMdTime /> Hạn nộp: 25/02/2025 10:30:00
                    </div>
                </div>

            </div>

            <div className='hidden w-full sm:flex gap-6'>
                <div className='basis-2/5 h-fit rounded-lg flex flex-col gap-3 bg-[#ebeeef] p-4'>
                    <h1 className='flex items-center gap-2 text-lg font-medium'> <FaCircleInfo className='text-gray-500' size={15} /> Nhà tuyển dụng:</h1>
                    <div className='flex gap-2 text-base font-semibold text-[#23527c]'>
                        <FaRegBuilding size={15} /> Công ty TNHH Lumos Việt nam
                    </div>
                    <div className='text-justify text-sm px-3 font-light'>
                        Có được cả tính linh hoạt của một start-up và sự am hiểu của một chuyên gia, chúng tôi không chỉ đơn
                        thuần thực hiện những thủ thuật digital marketing. Đam mê của chúng tôi là những chiến lược marketing
                        vững chắc.
                    </div>
                    <div className='flex gap-2 items-center'>
                        <IoPeople className='text-[#23527c]' size={15} />
                        <span className='font-medium'> Quy mô:</span> 25-99 nhân viên
                    </div>
                    <div className='flex gap-2 items-center '>
                        <GrLocation className='text-[#23527c]' size={15} />
                        <span className='font-medium'> Địa chỉ:</span> 15/4 Đặng Lộ P7 Q.Tân Bình, TP.HCM
                    </div>
                </div>
                <div className='basis-3/5 flex flex-col gap-3'>
                    <h1 className='uppercase text-lg sm:text-xl font-semibold'>Chi tiết công việc</h1>
                    <div>
                        <List ordered className='flex flex-col gap-6'>
                            <List.Item className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                Thông tin tuyển dụng
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
                                Yêu cầu ứng viên
                                <List nested className='text-black text-sm font-normal'>
                                    <List.Item>Kinh nghiệm từ 6 tháng trở lên Python</List.Item>
                                    <List.Item>Có kinh nghiệm phát triển ứng dụng client/server.</List.Item>
                                    <List.Item>Hiểu biết về cơ sở dữ liệu Mysql, PostgreSQL.</List.Item>
                                    <List.Item>Ưu tiên ứng viên có khả năng thiết kế cơ sở dữ liệu.</List.Item>
                                    <List.Item>Biết về hệ thống Hosting, server, cài đặt server, Linux là lợi thế</List.Item>
                                </List>
                            </List.Item>
                        </List>
                    </div>
                </div>
            </div>

            <div className='w-full sm:hidden flex flex-col gap-6'>
                <div className='h-fit rounded-lg flex flex-col gap-3 bg-[#ebeeef] p-4'>
                    <h1 className='flex items-center gap-2 text-lg font-medium'> <FaCircleInfo className='text-gray-500' size={15} /> Nhà tuyển dụng:</h1>
                    <div className='flex gap-2 text-base font-semibold text-[#23527c]'>
                        <FaRegBuilding size={15} /> Công ty TNHH Lumos Việt nam
                    </div>
                    <div className='text-justify text-sm px-3 font-light'>
                        Có được cả tính linh hoạt của một start-up và sự am hiểu của một chuyên gia, chúng tôi không chỉ đơn
                        thuần thực hiện những thủ thuật digital marketing. Đam mê của chúng tôi là những chiến lược marketing
                        vững chắc.
                    </div>
                    <div className='flex gap-2 items-center'>
                        <IoPeople className='text-[#23527c]' size={15} />
                        <span className='font-medium'> Quy mô:</span> 25-99 nhân viên
                    </div>
                    <div className='flex gap-2 items-center '>
                        <GrLocation className='text-[#23527c]' size={15} />
                        <span className='font-medium'> Địa chỉ:</span> 15/4 Đặng Lộ P7 Q.Tân Bình, TP.HCM
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <h1 className='uppercase text-lg sm:text-xl font-semibold'>Chi tiết công việc</h1>
                    <div>
                        <List ordered className='flex flex-col gap-6'>
                            <List.Item className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                Thông tin tuyển dụng
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
                                Yêu cầu ứng viên
                                <List nested className='text-black text-sm font-normal'>
                                    <List.Item>Kinh nghiệm từ 6 tháng trở lên Python</List.Item>
                                    <List.Item>Có kinh nghiệm phát triển ứng dụng client/server.</List.Item>
                                    <List.Item>Hiểu biết về cơ sở dữ liệu Mysql, PostgreSQL.</List.Item>
                                    <List.Item>Ưu tiên ứng viên có khả năng thiết kế cơ sở dữ liệu.</List.Item>
                                    <List.Item>Biết về hệ thống Hosting, server, cài đặt server, Linux là lợi thế</List.Item>
                                </List>
                            </List.Item>
                        </List>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailJobPage;