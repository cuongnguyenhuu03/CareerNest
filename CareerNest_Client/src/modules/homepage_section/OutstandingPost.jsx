import React from 'react';
import { Card } from "flowbite-react";

const OutstandingPost = () => {
    return (
        <div className='ct-container py-10 bg-gray-100'>
            <h1 className='text-2xl mb-10 text-center text-slate-800 font-bold uppercase'>Bài viết nổi bật</h1>
            <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-10'>
                <Card
                    className="max-w-sm"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc="/post.png"
                >
                    <h5 className="text-sm md:text-base lg:text-xl font-bold tracking-wide text-gray-900 dark:text-white">
                        Làm sao để có được 1 CV thu hút các nhà tuyển dụng trong năm 2025 ?
                    </h5>
                    <p className="text-[10px] md:text-xs tracking-wide lg:text-sm font-normal text-gray-700 dark:text-gray-400">
                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    </p>
                    <a href="#">Xem thêm</a>
                </Card>
                <Card
                    className="max-w-sm"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc="/post.png"
                >
                    <h5 className="text-sm md:text-base lg:text-xl font-bold tracking-wide   text-gray-900 dark:text-white">
                        Làm sao để có được 1 CV thu hút các nhà tuyển dụng trong năm 2025 ?
                    </h5>
                    <p className="text-[10px] md:text-xs tracking-wide lg:text-sm font-normal text-gray-700 dark:text-gray-400">
                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    </p>
                    <a href="#">Xem thêm</a>
                </Card>
                <Card
                    className="max-w-sm"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc="/post.png"
                >
                    <h5 className="text-sm md:text-base lg:text-xl font-bold tracking-wide text-gray-900 dark:text-white">
                        Làm sao để có được 1 CV thu hút các nhà tuyển dụng trong năm 2025 ?
                    </h5>
                    <p className="text-[10px] md:text-xs tracking-wide lg:text-sm font-normal text-gray-700 dark:text-gray-400">
                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    </p>
                    <a href="#">Xem thêm</a>
                </Card>
            </div>
        </div>
    );
};

export default OutstandingPost;