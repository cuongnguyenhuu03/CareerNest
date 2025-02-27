import React from 'react';
import icons from '../../utils/icons';
import slugify from "slugify";
import { useNavigate } from 'react-router-dom';
import JobCard from '../../components/card/JobCard';

const { FaMoneyCheckDollar, FaRegBuilding, GrLocation, GrNetworkDrive } = icons;

const Recruitment = () => {
    const navigate = useNavigate();

    return (
        <div className='w-full py-10 bg-gray-100 mb-6 md:mb-16 px-6 md:px-10 lg:px-[150px]'>
            <h1 className='text-2xl mb-10 text-center text-slate-800 font-bold uppercase'>Tin tuyển dụng mới nhất</h1>
            <div className='w-full grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 xs:gap-4 xl:gap-8'>
                <JobCard />
                <JobCard />
                <JobCard />  <JobCard />  <JobCard />
            </div>
        </div>
    );
};

export default Recruitment;