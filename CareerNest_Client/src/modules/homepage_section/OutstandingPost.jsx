import React from 'react';
import { Card } from "flowbite-react";

const OutstandingPost = () => {
    return (
        <div className='ct-container py-10 bg-gray-100 dark:bg-gray-800'>
            <h1 className='text-xl mb-10 text-center text-slate-800 font-bold uppercase dark:text-white'>Bài viết nổi bật</h1>
            <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-10'>
                <Card
                    className="max-w-sm"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc="https://itviec.com/blog/wp-content/uploads/2025/01/cau-hoi-phong-van-sql-vippro.jpg"
                >
                    <h5 className="text-sm md:text-base lg:text-xl font-bold tracking-wide text-gray-900 dark:text-white">
                        Top 30+ câu hỏi phỏng vấn SQL phổ biến nhất
                    </h5>
                    <p className="text-[10px] md:text-xs tracking-wide lg:text-sm font-normal text-gray-700 dark:text-gray-400">
                        SQL là một kỹ năng quan trọng trong ngành công nghệ thông tin, đặc biệt khi làm việc với cơ sở dữ liệu. Việc chuẩn bị các câu hỏi phỏng vấn SQL là yếu tố then chốt giúp bạn thành…
                    </p>
                    <a href="#" className='dark:text-white'>Xem thêm</a>
                </Card>
                <Card
                    className="max-w-sm"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc="https://itviec.com/blog/wp-content/uploads/2025/02/cau-hoi-phong-va-html-css-vippro.jpeg"
                >
                    <h5 className="text-sm md:text-base lg:text-xl font-bold tracking-wide   text-gray-900 dark:text-white">
                        Top 50+ câu hỏi phỏng vấn HTML CSS mọi cấp độ phổ biến
                    </h5>
                    <p className="text-[10px] md:text-xs tracking-wide lg:text-sm font-normal text-gray-700 dark:text-gray-400">
                        Trong bài viết này, ITviec tổng hợp 50+ câu hỏi phỏng vấn HTML CSS dành cho HTML/CSS  Developer từ cấp độ đầu vào (Junior) cho đến cấp cao (Senior). Hãy cùng cập nhật bộ câu hỏi và thử trả lời…                    </p>
                    <a href="#" className='dark:text-white'>Xem thêm</a>
                </Card>
                <Card
                    className="max-w-sm"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc="https://itviec.com/blog/wp-content/uploads/2023/04/Artboard-1-950x500.webp"
                >
                    <h5 className="text-sm md:text-base lg:text-xl font-bold tracking-wide text-gray-900 dark:text-white">
                        “Là IT Thì Mình Cứ Viết Đi” – Cuộc thi viết hấp dẫn nhất cho dân IT chính thức trở lại
                    </h5>
                    <p className="text-[10px] md:text-xs tracking-wide lg:text-sm font-normal text-gray-700 dark:text-gray-400">
                        Cuộc thi viết “Là IT Thì Mình Cứ Viết Đi” do ITviec tổ chức từ ngày 26/04/2023 đến 26/06/2023, nhân dịp kỷ niệm 10 năm thành lập. Cuộc thi là sân chơi hấp dẫn cổ vũ tất cả anh em…                    </p>
                    <a href="#" className='dark:text-white'>Xem thêm</a>
                </Card>
            </div>
        </div>
    );
};

export default OutstandingPost;