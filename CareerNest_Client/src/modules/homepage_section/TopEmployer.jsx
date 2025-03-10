import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployerLogoCard from '../../components/card/EmployerLogoCard';
import { Carousel } from 'flowbite-react';
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

    if (listCompanies.length <= 0) return null;
    return (
        <div className='ct-container'>
            <h1 className='text-lg xs:text-2xl mb-10 text-center text-slate-800 font-bold uppercase'>Top nhà tuyển dụng hàng đầu</h1>
            <div className='w-full hidden sm:grid sm:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10'>
                {listCompanies?.length > 0 && listCompanies.map(item => (
                    <EmployerLogoCard key={item?.id} data={item} />
                ))}
            </div>
            {/* Carousel for Mobile */}
            <Carousel slideInterval={2000} className="sm:hidden carousel w-full h-64 z-0">
                {listCompanies?.length > 0 && listCompanies.map(item => (
                    <img key={item?.id}
                        src={item?.logoUrl}
                        alt="company_logo"
                        className="w-2/3 rounded-lg h-44 object-contain sm:object-cover"
                        onClick={() => navigate(`${path.RECRUITMENT}/detail/${item?.id}/${slugify(item?.name, { lower: true, strict: true })}`)}
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default withErrorBoundary(TopEmployer);