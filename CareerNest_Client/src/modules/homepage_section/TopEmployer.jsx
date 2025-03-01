import React, { useState } from 'react';
import EmployerLogoCard from '../../components/card/EmployerLogoCard';

const TopEmployer = () => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div className='ct-container'>
            <h1 className='text-2xl mb-10 text-center text-slate-800 font-bold uppercase'>Top nhà tuyển dụng hàng đầu</h1>
            <div className='w-full grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10'>
                <EmployerLogoCard /> <EmployerLogoCard /> <EmployerLogoCard /> <EmployerLogoCard />
                <EmployerLogoCard /> <EmployerLogoCard /> <EmployerLogoCard /> <EmployerLogoCard />
            </div>
        </div>
    );
};

export default TopEmployer;