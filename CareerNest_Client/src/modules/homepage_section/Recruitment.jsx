import React from 'react';
import icons from '../../utils/icons';
import slugify from "slugify";
import { useNavigate } from 'react-router-dom';
import JobCard from '../../components/card/JobCard';

const { FaMoneyCheckDollar, FaRegBuilding, GrLocation, GrNetworkDrive } = icons;

const Recruitment = () => {
    const navigate = useNavigate();

    return (
        <div className='ct-container py-10 bg-gray-100'>
            <h1 className='text-2xl mb-10 text-center text-slate-800 font-bold uppercase'>Tin tuyển dụng mới nhất</h1>
            <div className='w-full flex flex-nowrap overflow-x-auto xs:grid xs:grid-cols-2 xl:grid-cols-3 xs:gap-4 xl:gap-8'>
                <JobCard className="min-w-full xs:min-w-0" />
                <JobCard className="min-w-full xs:min-w-0" />
                <JobCard className="min-w-full xs:min-w-0" />
                <JobCard className="min-w-full xs:min-w-0" />
                <JobCard className="min-w-full xs:min-w-0" />
            </div>
        </div>
    );
};

export default Recruitment;