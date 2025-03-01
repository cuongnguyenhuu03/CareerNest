import React, { useEffect, useRef } from 'react';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { path } from '../../utils/constant';
import { Badge } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import './CVCreatePage.scss';
import FormCreateCV from '../../modules/cv/FormCreateCV';

const data = [
    { text: "Trang chủ", path: path.HOME },
    { text: "Quản lý CV", path: path.CV + '/' + path.CV__MANAGE },
    { text: "Tạo CV", path: '#' },
]
const CVCreatePage = () => {
    const ref = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Tạo CV';
    }, []);

    return (
        <div ref={ref} className='ct-container py-4 mt-20  bg-[#f7f7f7]'>
            <Breadcrumbs data={data} />
            <div className='bg-[#fff] px-6 py-3 rounded-lg'>
                <Badge className='py-2 rounded-md mb-4 tracking-wider text-base' color="gray" size='sm'>Thông tin tạo hồ sơ xin việc</Badge>
                <FormCreateCV />
            </div>
        </div>
    );
};

export default CVCreatePage;