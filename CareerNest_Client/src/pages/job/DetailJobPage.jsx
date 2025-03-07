import React, { useEffect, useRef, } from 'react';
import icons from '../../utils/icons';
import { Alert, Button, List, } from "flowbite-react";
import { useNavigate, useParams } from 'react-router-dom';
import { path } from '../../utils/constant';
import slugify from 'slugify';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { getDetailJob } from '../../services/jobService';
import { getDetailRecruitment } from '../../services/recruitmentService';
import _ from 'lodash';
import { convertTimeStampToString } from '../../utils/convertTimeStampToString';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { HiInformationCircle } from "react-icons/hi";
import withErrorBoundary from '../../hoc/withErrorBoundary';

const { FaRegBuilding, FaMoneyCheckDollar, IoMdTime, IoPeople, GrLocation, FaCircleInfo, HiCheckCircle, FaHeart } = icons;
const data = [
    { text: "Trang chủ", path: path.HOME },
    { text: "Chi tiết công việc", path: "#" }
]

const DetailJobPage = () => {
    const navigate = useNavigate();
    const ref = useRef(null);
    const params = useParams();
    const queryClient = useQueryClient()

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Chi tiết công việc';
    }, []);

    const { data: res, isLoading, isFetching } = useQuery({
        queryKey: ['job', +params?.id],
        queryFn: () => getDetailJob(+params?.id),
        enabled: !!params?.id,
        staleTime: 10 * 1000,
        refetchOnWindowFocus: false,
    })
    const detailJob = res?.data;

    const handlePrefetchRecruitment = (id) => {
        if (!id) return;
        queryClient.prefetchQuery({
            queryKey: ['recruitment', id],
            queryFn: () => getDetailRecruitment(id),
            staleTime: 10 * 1000,
        })
    }

    if (!params?.id) return null;
    if (isLoading || isFetching)
        return (
            <div className='ct-container flex flex-col gap-8 mt-20'>
                <div>
                    <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                        <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded-sm sm:w-96 dark:bg-gray-700">
                            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                        </div>
                        <div className="w-full">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5" />
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div role="status" className="w-full animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>

            </div>
        );
    if (detailJob?.statusCode === 500) {
        return (
            <Alert className='mt-20' color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Không tìm  thấy thông tin công việc!</span>
            </Alert>
        );
    }
    return (
        <div ref={ref} className='ct-container flex flex-col gap-8 mt-20'>
            <Breadcrumbs data={data} />
            <div className='w-full shadow-md flex items-center justify-between py-3 gap-3 xs:gap-6 rounded-lg'>
                <img
                    src={detailJob?.company?.logoUrl} alt="thumbnail"
                    className={`w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] lg:w-[150px] lg:h-[150px] object-cover rounded-md`}
                />
                <div className='flex flex-auto flex-col gap-1'>
                    <div className='flex flex-col gap-y-4 md:gap-y-0 md:flex-row md:items-center md:justify-between md:pr-6'>
                        <div className='text-sm order-2 md:order-1 md:text-base lg:text-lg xl:text-xl font-medium uppercase' >
                            {detailJob?.name}
                        </div>
                        <div className='flex order-1 md:order-2 items-center gap-4'>
                            <Button size='xs' className="block sm:hidden" gradientDuoTone="pinkToOrange" onClick={() => setOpenModal(true)}>
                                Ứng tuyển
                            </Button>
                            <Button size='sm' className="hidden sm:block" gradientDuoTone="pinkToOrange" onClick={() => setOpenModal(true)}>
                                Ứng tuyển
                            </Button>

                            <Button size='xs' className="block sm:hidden" gradientDuoTone="pinkToOrange" onClick={() => setOpenModal(true)}>
                                <FaHeart size={18} className='mr-2' />
                                Lưu tin
                            </Button>
                            <Button size='sm' className="hidden sm:block" gradientDuoTone="pinkToOrange" onClick={() => setOpenModal(true)}>
                                <FaHeart size={18} className='mr-2' />
                                Lưu tin
                            </Button>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center text-sm md:text-base font-medium text-[#23527c] cursor-pointer hover:underline'
                        onClick={() => navigate(`${path.RECRUITMENT}/detail/${detailJob?.company?.id}/${slugify(detailJob?.company?.name, { lower: true, strict: true })}`)}
                        onMouseEnter={() => handlePrefetchRecruitment(+detailJob?.company?.id)}
                        onTouchStart={() => handlePrefetchRecruitment(+detailJob?.company?.id)}
                    >
                        <FaRegBuilding size={15} /> {detailJob?.company?.name}
                    </div>
                    <div className='flex mb-6 gap-2 text-orange-600 items-center text-xs md:text-sm font-light'>
                        <FaMoneyCheckDollar /> Lương: {detailJob?.salary}$
                    </div>
                    <div className='flex gap-2 items-center text-xs md:text-sm font-light'>
                        <IoMdTime /> Hạn nộp: {convertTimeStampToString(detailJob?.endDate, true)}
                    </div>
                </div>
            </div>

            <div className='hidden w-full sm:flex gap-6'>
                <div className='basis-2/5 h-fit rounded-lg flex flex-col gap-3 bg-[#ebeeef] p-4'>
                    <h1 className='flex items-center gap-2 text-lg font-medium'> <FaCircleInfo className='text-gray-500' size={15} /> Nhà tuyển dụng:</h1>
                    <div className='flex gap-2 text-base font-semibold text-[#23527c] cursor-pointer hover:underline'
                        onClick={() => navigate(`${path.RECRUITMENT}/detail/${detailJob?.company?.id}/${slugify(detailJob?.company?.name, { lower: true, strict: true })}`)}
                        onMouseEnter={() => handlePrefetchRecruitment(+detailJob?.company?.id)}
                        onTouchStart={() => handlePrefetchRecruitment(+detailJob?.company?.id)}
                    >
                        <FaRegBuilding size={15} /> {detailJob?.company?.name}
                    </div>
                    <div className='text-justify text-sm px-3 font-light'>
                        {detailJob?.company?.description}
                    </div>
                    <div className='flex gap-2 items-center'>
                        <IoPeople className='text-[#23527c]' size={15} />
                        <span className='font-medium'> Quy mô:</span> {detailJob?.company?.size}  nhân viên
                    </div>
                    <div className='flex gap-2 items-center '>
                        <GrLocation className='text-[#23527c]' size={15} />
                        <span className='font-medium'> Địa chỉ:</span> {detailJob?.company?.address}
                    </div>
                </div>
                <div className='basis-3/5 flex flex-col gap-3'>
                    <h1 className='uppercase text-lg sm:text-xl font-semibold'>Chi tiết công việc</h1>
                    <div>
                        <List ordered className='flex flex-col gap-6'>
                            <List.Item className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                Thông tin tuyển dụng
                                <List nested className='text-black text-sm font-normal'>
                                    <List.Item icon={HiCheckCircle} >Mức lương: {detailJob?.salary}$</List.Item>
                                    <List.Item icon={HiCheckCircle} >Hình thức làm việc: Remote - Làm việc từ xa.</List.Item>
                                    <List.Item icon={HiCheckCircle} >Giới tính: Nam.</List.Item>
                                    <List.Item icon={HiCheckCircle} >Số lượng tuyển: {detailJob?.quantity}.</List.Item>
                                    <List.Item icon={HiCheckCircle} >Cấp bậc: {detailJob?.level}.</List.Item>
                                    <List.Item icon={HiCheckCircle} >Địa điểm làm việc: {detailJob?.location}</List.Item>
                                </List>
                            </List.Item>
                            <div className='flex flex-col'>
                                <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                    2. Mô tả công việc
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: detailJob?.description?.replace(/\*/g, '<br>•') }}></div>

                            </div>

                            <div className='flex flex-col'>
                                <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                    3. Yêu cầu ứng viên
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: detailJob?.requirements?.replace(/\*/g, '<br>•') }}></div>
                            </div>
                        </List>
                    </div>
                </div>
            </div>

            <div className='w-full sm:hidden flex flex-col gap-6'>
                <div className='h-fit rounded-lg flex flex-col gap-3 bg-[#ebeeef] p-4'>
                    <h1 className='flex items-center gap-2 text-lg font-medium'> <FaCircleInfo className='text-gray-500' size={15} /> Nhà tuyển dụng:</h1>
                    <div className='flex gap-2 text-base font-semibold text-[#23527c] cursor-pointer hover:underline'
                        onClick={() => navigate(`${path.RECRUITMENT}/detail/${detailJob?.company?.id}/${slugify(detailJob?.company?.name, { lower: true, strict: true })}`)}
                        onMouseEnter={() => handlePrefetchRecruitment(+detailJob?.company?.id)}
                        onTouchStart={() => handlePrefetchRecruitment(+detailJob?.company?.id)}
                    >
                        <FaRegBuilding size={15} /> {detailJob?.company?.name}
                    </div>
                    <div className='text-justify text-sm px-3 font-light'>
                        {detailJob?.company?.description}
                    </div>
                    <div className='flex gap-2 items-center'>
                        <IoPeople className='text-[#23527c]' size={15} />
                        <span className='font-medium'> Quy mô:</span> {detailJob?.company?.size} nhân viên
                    </div>
                    <div className='flex gap-2 items-center '>
                        <GrLocation className='text-[#23527c]' size={15} />
                        <span className='font-medium'> Địa chỉ:</span> {detailJob?.company?.address}
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <h1 className='uppercase text-lg sm:text-xl font-semibold'>Chi tiết công việc</h1>
                    <div>
                        <List ordered className='flex flex-col gap-6'>
                            <List.Item className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                Thông tin tuyển dụng
                                <List nested className='text-black text-sm font-normal'>
                                    <List.Item icon={HiCheckCircle} >Mức lương: {detailJob?.salary}$</List.Item>
                                    <List.Item icon={HiCheckCircle} >Hình thức làm việc: Remote - Làm việc từ xa.</List.Item>
                                    <List.Item icon={HiCheckCircle} >Giới tính: Nam.</List.Item>
                                    <List.Item icon={HiCheckCircle} >Số lượng tuyển: {detailJob?.quantity}.</List.Item>
                                    <List.Item icon={HiCheckCircle} >Cấp bậc: {detailJob?.level}.</List.Item>
                                    <List.Item icon={HiCheckCircle} >Địa điểm làm việc: {detailJob?.location}</List.Item>

                                </List>
                            </List.Item>
                            <div className='flex flex-col'>
                                <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                    2. Mô tả công việc
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: detailJob?.description?.replace(/\*/g, '<br>•') }}></div>

                            </div>

                            <div className='flex flex-col'>
                                <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                                    3. Yêu cầu ứng viên
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: detailJob?.requirements?.replace(/\*/g, '<br>•') }}></div>
                            </div>
                        </List>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withErrorBoundary(DetailJobPage);