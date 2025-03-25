import React, { useEffect, useState } from 'react';
import EmployerLogoCard from '../../components/card/EmployerLogoCard';
import './TopEmployer.scss';
import { getAllRecruitment } from '../../services/recruitmentService';
import withErrorBoundary from '../../hoc/withErrorBoundary';
import CompanyCardSkeleton from '../../components/skeleton/CompanyCardSkeleton';

const TopEmployer = () => {
    const [listCompanies, setListCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAllCompanies = async () => {
        setIsLoading(true);
        try {
            let res = await getAllRecruitment();
            if (res?.result?.length > 0) {
                setListCompanies(res?.result);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.message ?? 'Error when fetching all companies');
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllCompanies();
    }, []);

    if (listCompanies.length <= 0) return null;
    if (isLoading)
        return (
            <div className='ct-container mt-20'>
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7'>
                    <CompanyCardSkeleton /> <CompanyCardSkeleton /> <CompanyCardSkeleton />
                </div>
            </div>
        )
    return (
        <div className='ct-container'>
            <h1 className='text-base sm:text-lg xs:text-2xl mb-10 text-center text-slate-800 font-bold uppercase dark:text-white'>Top nhà tuyển dụng hàng đầu</h1>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7'>
                {listCompanies?.length > 0 && listCompanies.map(item => (
                    <EmployerLogoCard key={item?.id} data={item} />
                ))}
            </div>
        </div>
    );
};

export default withErrorBoundary(TopEmployer);