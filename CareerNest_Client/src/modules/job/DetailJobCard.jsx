import React, { forwardRef } from 'react';
import { getFirebaseImageUrl } from '../../utils/getFirebaseImageURL';
import { Link } from 'react-router-dom';
import { path } from '../../utils/constant';
import slugify from 'slugify';
import { Badge } from 'flowbite-react';
import { convertTimeStampToString } from '../../utils/convertTimeStampToString';

const DetailJobCard = forwardRef(({ job = {} }, ref) => {

    const isExpired = (date) => new Date(date * 1000) < new Date();

    if (!job) return null;
    return (
        <div ref={ref}
            className="h-fit basis-3/5 bg-white rounded-lg shadow-md p-6 border overflow-hidden dark:bg-gray-700"
        >
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                    <img
                        src={job?.company?.logoUrl ? getFirebaseImageUrl(job.company.logoUrl, 'companies') : ''}
                        alt="Company Logo"
                        className="w-20 h-20 object-contain"
                    />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-1 dark:text-white">
                            {job?.name}
                            <Link to={`/job/detail/${job?.id}/${slugify(job?.name, { lower: true, strict: true })}`} target="_blank" className="text-blue-500 text-md hover:underline">↗</Link>
                        </h2>
                        <Link to={`${path.RECRUITMENT}/detail/${job?.company?.id}/${slugify(job?.company?.name || '', { lower: true, strict: true })}`} className="text-gray-600 hover:underline dark:text-gray-400 hover:text-red-500 hover:transition-all">
                            {job?.company?.name}
                        </Link>
                        <p className="text-green-600 font-medium mt-1">
                            $ {new Intl.NumberFormat('de-DE').format(job?.salary)} USD
                        </p>
                    </div>
                </div>
                {!isExpired(job?.endDate) &&
                    <button className="text-red-500 text-xl hover:text-red-600">❤️</button>
                }

            </div>

            {/* Apply Button */}
            {!isExpired(job?.endDate) ?
                <button className="w-full bg-red-500 hover:bg-red-600 hover:transition-colors text-white font-semibold py-2 rounded-lg mt-4">
                    Ứng tuyển
                </button>
                : <Badge className='uppercase text-base w-fit' color="failure" size='sm' >Đã hết hạn ứng tuyển</Badge>
            }


            <hr className='mt-4' />

            {/* Nội dung công việc */}
            <div className="max-h-96 overflow-y-auto border-t px-6 py-4 space-y-4">
                <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        📍 <span>{job?.company?.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        🏢 <span>Tại văn phòng</span>
                    </div>
                    <div className="flex items-center gap-2">
                        ⏳ <span>{convertTimeStampToString(job?.startDate)}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {job?.skills?.map(skill => (
                            <span key={skill?.name} className="bg-gray-200 px-2 py-1 rounded-md text-xs text-gray-800 cursor-pointer hover:transition-all hover:bg-red-500 hover:text-white">{skill?.name}</span>
                        ))}
                    </div>
                </div>

                {/* description */}
                <div className="mt-6">
                    <h3 className="font-bold text-[#ee4d2d] mb-2">1. Mô tả công việc</h3>
                    <div className='text-black text-justify text-wrap dark:text-gray-400' dangerouslySetInnerHTML={{ __html: job?.description }}></div>
                </div>
                {/* requirements */}
                <div className="mt-6">
                    <h3 className="font-bold text-[#ee4d2d] mb-2">2. Yêu cầu công việc</h3>
                    <div className='text-black text-justify text-wrap dark:text-gray-400' dangerouslySetInnerHTML={{ __html: job?.requirements }}></div>
                </div>
                {/* benefits */}
                <div className="mt-6">
                    <h3 className="font-bold text-[#ee4d2d] mb-2">3. Phúc lợi</h3>
                    <div className='text-black text-justify text-wrap dark:text-gray-400' dangerouslySetInnerHTML={{ __html: job?.benefits }}></div>
                </div>

            </div>
        </div>
    );
});

export default React.memo(DetailJobCard);
