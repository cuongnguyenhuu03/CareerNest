import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';
import slugify from 'slugify';

const EmployerLogoCard = ({ data = {} }) => {
    const [isHover, setIsHover] = useState(false);
    const navigate = useNavigate();

    return (
        <div
            style={{ backgroundImage: `url(${data?.logoUrl})` }}
            className='w-full border border-gray-300 h-[130px] md:h-[170px] xl:h-[200px] rounded-md relative bg-contain bg-no-repeat bg-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110'
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => navigate(`${path.RECRUITMENT}/detail/${data?.id}/${slugify(data?.name, { lower: true, strict: true })}`)}
        >
            {isHover && <div className='absolute z-50 transition-all top-0 bottom-0 left-0 right-0 bg-overlay-30 rounded-md' />}
        </div >
    );
};

export default EmployerLogoCard;