import React, { useEffect, useRef } from 'react';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { path } from '../../utils/constant';
import { Badge, Button } from 'flowbite-react';
import icons from '../../utils/icons';
import { useNavigate } from 'react-router-dom';
import CVCard from '../../components/card/CVCard';

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
        <div ref={ref} className='w-full py-4 mt-20 px-6 md:px-10 lg:px-[150px] bg-[#f7f7f7]'>
            <Breadcrumbs data={data} />
            <div className='bg-[#fff] px-6 py-3 rounded-lg'>
                <Badge className='py-2 rounded-md' color="gray" size='sm'>Danh sách CV của bạn</Badge>
                <Button className='mt-4' size='sm' gradientDuoTone="cyanToBlue" onClick={() => navigate(`${path.CV}/${path.CV__CREATE}`)}>
                    <CiCirclePlus className='mr-2' size={22} />  Tạo mới
                </Button>
                {/* danh sách cv đã tạo */}
                <div className='w-full mt-6 flex flex-col gap-y-4'>
                    <CVCard className='shadow-md' />
                    <CVCard className='shadow-md' />
                    <CVCard className='shadow-md' />
                </div>
            </div>
        </div>
    );
};

export default CVManagementPage;