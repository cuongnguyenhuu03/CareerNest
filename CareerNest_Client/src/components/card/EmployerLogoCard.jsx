import React from 'react';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';
import slugify from 'slugify';
import icons from '../../utils/icons';

const { GrLocation } = icons;

const EmployerLogoCard = ({ data = {} }) => {
    const navigate = useNavigate();

    return (
        <div
            className="dark:bg-gray-700 bg-white rounded-xl shadow-md dark:shadow-lg overflow-hidden border border-gray-200 relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
        //     onClick={() => navigate(`${path.RECRUITMENT}/detail/${data?.id}/${slugify(data?.name, { lower: true, strict: true })}`)}
        >
            {/* Logo */}
            <div className="flex justify-center mt-4">
                <img
                    src="https://rubicmarketing.com/wp-content/uploads/2022/11/y-nghia-logo-mb-bank-2.jpg"
                    alt="company Logo"
                    className="w-36 h-36 object-contain dark:object-cover border border-gray-300  rounded-lg"
                />
            </div>

            {/* Company Name */}
            <div className="text-center px-4 my-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    LG Electronics Development Vietnam (LGEDV)
                </h2>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 px-4">
                {['OOP', 'C++', 'Tester', 'Embedded', 'C++', 'Android'].map((tag, index) => (
                    <span
                        key={index}
                        className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Location + Job Count */}
            <div className="flex items-center p-4 mt-10 bg-[#f7f7f7] dark:bg-gray-700">
                <GrLocation size={18} className='mr-2 text-gray-600 dark:text-white' />
                <span className="text-xs text-gray-600 dark:text-white">
                    Đà Nẵng - Khác - Hà Nội
                </span>
            </div>
        </div>
    );
};

export default EmployerLogoCard;