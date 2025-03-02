import React, { useState } from 'react';

const EmployerLogoCard = () => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div style={{ backgroundImage: `url(/employer-1.png)` }}
            className='w-full border border-gray-300 h-[130px] md:h-[170px] xl:h-[200px] rounded-md relative bg-contain bg-no-repeat bg-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110'
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {isHover && <div className='absolute z-50 transition-all top-0 bottom-0 left-0 right-0 bg-overlay-30 rounded-md' />}
        </div >
    );
};

export default EmployerLogoCard;