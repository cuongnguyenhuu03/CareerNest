import React, { useEffect, useRef } from 'react';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { path } from '../../utils/constant';
import CareerRoadmapForm from '../../modules/chatbot/CareerRoadmapForm';

const data = [
    { text: "Trang chủ", path: path.HOME },
    { text: "Lộ trình nghề nghiệp bởi AI", path: "#" }
]

const RoadmapByAIPage = () => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Xây dựng lộ trình nghề nghiệp bởi AI';
    }, []);

    return (
        <div ref={ref} className='ct-container flex flex-col pt-20 dark:bg-gray-900'>
            <Breadcrumbs data={data} />

            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-lg font-bold uppercase tracking-widest text-gray-700 dark:text-white animate-fadeIn">Roadmap AI</p>
                        <h2 className="mt-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl lg:text-4xl animate-pulse">
                            Xây dựng lộ trình nghề nghiệp với các bước đơn giản
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg font-normal text-gray-700 dark:text-white lg:text-xl lg:leading-8">
                            Định hướng đúng – Thành công nhanh – AI luôn đồng hành.
                        </p>
                    </div>

                    <CareerRoadmapForm />
                </div>
            </section>
        </div>


    );
};

export default RoadmapByAIPage;