import React, { useEffect, useState } from 'react';
import JobCard from '../../components/card/JobCard';
import { toast } from 'react-toastify';
import { getAllJobs } from '../../services/jobService';
import _ from 'lodash';

const Recruitment = () => {
    const [listJobs, setListJobs] = useState([]);

    const fetchAllJobs = async () => {
        try {
            let res = await getAllJobs();
            if (res?.result?.length > 0) {
                setListJobs(_.orderBy(res.result, ['createdAt'], ['desc']));
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.message ?? 'Error when fetching all jobs');
        }
    };

    useEffect(() => {
        fetchAllJobs();
    }, []);

    if (listJobs.length <= 0) return null;
    return (
        <div div className='ct-container py-10 bg-gray-100' >
            <h1 className='text-2xl mb-10 text-center text-slate-800 font-bold uppercase'>Tin tuyển dụng mới nhất</h1>
            <div className='w-full flex flex-nowrap overflow-x-auto xs:grid xs:grid-cols-2 xl:grid-cols-3 xs:gap-4 xl:gap-8'>
                {listJobs.length > 0 && listJobs.map(item => (
                    <JobCard key={item?.id} data={item} className="min-w-full xs:min-w-0" />
                ))}
            </div>
        </div >
    );
};

export default Recruitment;