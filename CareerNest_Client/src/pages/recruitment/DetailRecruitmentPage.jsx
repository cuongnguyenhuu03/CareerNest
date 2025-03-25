import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from 'flowbite-react';
import icons from '../../utils/icons';
import JobCard from '../../components/card/JobCard';
import { CgWebsite } from "react-icons/cg";
import { TbMapSearch } from "react-icons/tb";
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { path } from '../../utils/constant';
import { getDetailRecruitment } from '../../services/recruitmentService';
import { useQuery } from '@tanstack/react-query';
import { HiInformationCircle } from "react-icons/hi";
import { getJobsByCompany } from '../../services/jobService';
import withErrorBoundary from '../../hoc/withErrorBoundary';
import '../job/DetailJobPage.scss';

const { IoPeople, GrLocation, FaCircleInfo } = icons;

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
        document.title = 'Chi tiết công ty';
    }, []);

    const { data: resRecruitment, isLoading, isFetching } = useQuery({
        queryKey: ['recruitment', +id],
        queryFn: () => getDetailRecruitment(+id),
        enabled: !!id,
        staleTime: 10 * 1000,
        refetchOnWindowFocus: false,
    })
    const detailCompany = resRecruitment?.data;

    const { data: resJobs } = useQuery({
        queryKey: ['jobsByCompany', +detailCompany?.id],
        queryFn: () => getJobsByCompany(+detailCompany?.id),
        enabled: !!detailCompany?.id,
        staleTime: 10 * 1000,
        refetchOnWindowFocus: false,
    })
    const jobsByCompany = resJobs?.data?.content;

    if (!id || !slug) return null;
    if (isLoading || isFetching)
        return (
            <div className='ct-container flex flex-col gap-8 mt-20 dark:bg-gray-800'>
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
    if (detailCompany?.statusCode === 500) {
        return (
            <Alert className='mt-20' color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Không tìm  thấy thông tin nhà tuyển dụng!</span>
            </Alert>
        );
    }
    return (
        <div className='ct-container mt-[60px]'>
            <Breadcrumbs data={data} />
            <div ref={ref} className='w-full h-[250px] rounded-md relative bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `url(/cover-default.jpg)` }} >
                <div className='w-full h-full py-3 flex flex-col gap-4 items-center justify-end  bg-gray-900 bg-opacity-30'>
                    <img
                        src={detailCompany?.logoUrl}
                        alt="company Logo"
                        className="w-40 h-40 object-contain dark:object-contain"
                    />
                    <h1 className='uppercase text-center font-semibold text-white text-base xs:text-xl sm:text-2xl'>
                        {detailCompany?.name}
                    </h1>
                </div>
            </div>

            <div className='hidden w-full sm:flex mt-8 gap-6'>
                <div className='basis-3/5 flex flex-col gap-10'>
                    <div className='flex flex-col gap-4'>
                        <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                            1. Giới thiệu nhà tuyển dụng
                        </div>
                        <div className='text-justify text-sm px-3 job-description'>
                            <div className='text-justify text-black dark:text-gray-400' dangerouslySetInnerHTML={{ __html: detailCompany?.description }}></div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                            2. Việc làm đang tuyển dụng
                        </div>
                        <div className='w-full flex flex-col gap-y-4'>
                            {jobsByCompany?.length > 0 && jobsByCompany.map(item => (
                                <div key={item?.id} className='shadow-lg'>
                                    <JobCard data={item} className="min-w-full xs:min-w-0" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='basis-2/5 flex flex-col gap-3'>
                    <h1 className='flex items-center gap-2 md:text-base lg:text-lg font-medium uppercase dark:text-white'> <FaCircleInfo className='text-gray-500' size={15} /> Thông tin nhà tuyển dụng</h1>
                    <div className='flex gap-2 items-center'>
                        <CgWebsite className='text-[#23527c]' size={15} />
                        <span className='font-medium dark:text-white'> Website:</span> <a className='text-blue-600 hover:underline' target='blank' href={detailCompany?.website}>
                            {detailCompany?.website}
                        </a>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <IoPeople className='text-[#23527c]' size={15} />
                        <span className='font-medium dark:text-white'> Quy mô:</span> <span className='dark:text-gray-400'>{detailCompany?.size} nhân viên</span>
                    </div>
                    <div className='flex gap-2 items-center '>
                        <GrLocation className='text-[#23527c]' size={15} />
                        <span className='font-medium dark:text-white'> Địa chỉ:</span> <span className='dark:text-gray-400'>{detailCompany?.address}</span>
                    </div>

                    <h1 className='mt-6 flex items-center gap-2 text-lg font-medium uppercase dark:text-white'> <TbMapSearch className='text-gray-500' size={15} />
                        Bản đồ
                    </h1>
                    <iframe className='w-full h-[300px] md:h-[400px]'
                        src={`https://maps.google.com/maps?q=${detailCompany?.address}&output=embed`}>
                    </iframe>
                </div>
            </div>

            {/* Resonsive for Mobile */}
            <div className='sm:hidden w-full flex flex-col px-2 mt-8'>
                <div className='w-full flex flex-col gap-2 mb-8'>
                    <h1 className='flex items-center gap-2 text-lg font-medium uppercase dark:text-white'> <FaCircleInfo className='text-gray-500' size={15} /> Thông tin nhà tuyển dụng</h1>
                    <div className='flex gap-2 items-center'>
                        <CgWebsite className='text-[#23527c]' size={15} />
                        <span className='font-medium dark:text-white'> Website:</span> <a className='text-blue-600 hover:underline' target='blank' href={detailCompany?.website}>
                            <span className='dark:text-gray-400'>{detailCompany?.website}</span>
                        </a>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <IoPeople className='text-[#23527c]' size={15} />
                        <span className='font-medium dark:text-white'> Quy mô:</span> <span className='dark:text-gray-400'>{detailCompany?.size} nhân viên</span>
                    </div>
                    <div className='flex gap-2 items-center '>
                        <GrLocation className='text-[#23527c]' size={15} />
                        <span className='font-medium dark:text-white'> Địa chỉ:</span> <span className='dark:text-gray-400'>{detailCompany?.address}</span>
                    </div>

                    <h1 className='mt-6 flex items-center gap-2 text-lg font-medium uppercase dark:text-white'> <TbMapSearch className='text-gray-500' size={15} />
                        Bản đồ
                    </h1>
                    <iframe className='w-full h-[300px] md:h-[400px]'
                        src='https://maps.google.com/maps?q=15/4%20Đặng%20Lộ%20P7%20Q.Tân%20Bình,%20TP.HCM&output=embed'>
                    </iframe>
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-4'>
                        <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                            1. Giới thiệu nhà tuyển dụng
                        </div>
                        <div className='text-justify text-sm px-0 xs:px-3'>
                            <div className='text-justify text-black dark:text-gray-400  ' dangerouslySetInnerHTML={{ __html: detailCompany?.description }}></div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <div className='text-[#ee4d2d] text-lg sm:text-xl font-semibold'>
                            2. Việc làm đang tuyển dụng
                        </div>
                        <div className='mt-3 w-full flex flex-col gap-y-4'>
                            {jobsByCompany?.length > 0 && jobsByCompany.map(item => (
                                <div key={item?.id} className='shadow-lg'>
                                    <JobCard data={item} className="min-w-full xs:min-w-0" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default withErrorBoundary(DetailRecruitmentPage);