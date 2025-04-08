import React, { useEffect, useRef } from 'react';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { path } from '../../utils/constant';
import { Badge, Button } from 'flowbite-react';
import icons from '../../utils/icons';
import { useNavigate } from 'react-router-dom';
import CVCard from '../../components/card/CVCard';
import AttachedCV from '../../modules/account/overview/AttachedCV';

const data = [
    { text: "Trang chủ", path: path.HOME },
    { text: "Quản lý CV", path: "#" }
]

const { CiCirclePlus } = icons;

const CVManagementPage = () => {
    const ref = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Quản lý CV';
    }, []);

    return (
        <div ref={ref} className='ct-container py-4 pt-20 bg-[#f7f7f7] dark:bg-slate-800'>
            <Breadcrumbs data={data} />
            <div className='bg-[#fff] dark:bg-gray-700 px-3 xs:px-6 py-4 rounded-lg'>
                <Badge className='py-2 rounded-md' color="gray" size='sm'>Danh sách CV của bạn</Badge>
                <Button className='my-4' size='sm' gradientDuoTone="cyanToBlue" onClick={() => navigate(`${path.CV}/${path.CV__CREATE}`)}>
                    <CiCirclePlus className='mr-2' size={22} />  Tạo mới
                </Button>

                <AttachedCV />

                <Badge className='w-fit mt-20 text-sm sm:text-lg' color="success" size='sm'>CV online của bạn trên CareerNest</Badge>
                {/* danh sách cv đã tạo */}
                <div className='w-full mt-4 flex flex-col gap-y-4'>
                    <CVCard className='border border-gray-200 dark:border-gray-500' />
                    <CVCard className='border border-gray-200 dark:border-gray-500' />
                </div>
            </div>
        </div>
    );
};

export default CVManagementPage;