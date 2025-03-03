import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployerLogoCard from '../../components/card/EmployerLogoCard';
import { Carousel } from 'flowbite-react';
import slugify from 'slugify';
import './TopEmployer.scss';
import { path } from '../../utils/constant';

const TopEmployer = () => {
    const [isHover, setIsHover] = useState(false);
    const navigate = useNavigate();
    return (
        <div className='ct-container'>
            <h1 className='text-2xl mb-10 text-center text-slate-800 font-bold uppercase'>Top nhà tuyển dụng hàng đầu</h1>
            <div className='w-full hidden sm:grid sm:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10'>
                <EmployerLogoCard /> <EmployerLogoCard /> <EmployerLogoCard /> <EmployerLogoCard />
                <EmployerLogoCard /> <EmployerLogoCard /> <EmployerLogoCard /> <EmployerLogoCard />
            </div>
            {/* Carousel for Mobile */}
            <Carousel slideInterval={2000} className="sm:hidden carousel w-full h-64 z-0">
                <img src={'/employer-1.png'} alt="..." className="w-2/3 rounded-lg h-44 object-contain sm:object-cover"
                    onClick={() => navigate(`${path.RECRUITMENT}/detail/2/${slugify('Công ty TNHH Lumos Việt nam', { lower: true, strict: true })}`)}
                />
                <img src={'/employer-1.png'} alt="..." className="w-2/3 rounded-lg h-44 object-contain sm:object-cover"
                    onClick={() => navigate(`${path.RECRUITMENT}/detail/2/${slugify('Công ty TNHH Lumos Việt nam', { lower: true, strict: true })}`)}
                />
                <img src={'/employer-1.png'} alt="..." className="w-2/3 rounded-lg h-44 object-contain sm:object-cover"
                    onClick={() => navigate(`${path.RECRUITMENT}/detail/2/${slugify('Công ty TNHH Lumos Việt nam', { lower: true, strict: true })}`)}
                />
            </Carousel>
        </div>
    );
};

export default TopEmployer;