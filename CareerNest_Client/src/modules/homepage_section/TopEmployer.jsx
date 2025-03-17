import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployerLogoCard from '../../components/card/EmployerLogoCard';
import slugify from 'slugify';
import './TopEmployer.scss';
import { path } from '../../utils/constant';
import { getAllRecruitment } from '../../services/recruitmentService';
import withErrorBoundary from '../../hoc/withErrorBoundary';

const TopEmployer = () => {
    const navigate = useNavigate();
    const [listCompanies, setListCompanies] = useState([]);

    const fetchAllCompanies = async () => {
        try {
            let res = await getAllRecruitment();
            if (res?.result?.length > 0) {
                setListCompanies(res?.result);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.message ?? 'Error when fetching all companies');
        }
    };

    useEffect(() => {
        fetchAllCompanies();
    }, []);

    // if (listCompanies.length <= 0) return null;
    return (
        <div className='ct-container'>
            <h1 className='text-base sm:text-lg xs:text-2xl mb-10 text-center text-slate-800 font-bold uppercase dark:text-white'>Top nhà tuyển dụng hàng đầu</h1>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7'>
                {/* <EmployerLogoCard />  <EmployerLogoCard />  <EmployerLogoCard /> <EmployerLogoCard /> */}
                {listCompanies?.length > 0 && listCompanies.map(item => (
                    <EmployerLogoCard key={item?.id} data={item} />
                ))}
            </div>
        </div>
    );
};

export default withErrorBoundary(TopEmployer);