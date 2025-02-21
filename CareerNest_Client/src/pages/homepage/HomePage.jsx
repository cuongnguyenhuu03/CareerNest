import React from 'react';
import { FloatButton } from "antd";
import Parallax from '../../modules/homepage_section/Parallax';
import Footer from '../../components/footer/Footer';
import FindJob from '../../modules/homepage_section/FindJob';
import SliderBanner from '../../modules/homepage_section/SliderBanner';
import CVSection from '../../modules/homepage_section/CVSection';
import Recruitment from '../../modules/homepage_section/Recruitment';
import TopEmployer from '../../modules/homepage_section/TopEmployer';
import OutstandingPost from '../../modules/homepage_section/OutstandingPost';

const Homepage = () => {

    return (
        <div className='w-full'>
            {/* Section tìm việc */}
            <FindJob />

            {/* Section slider banner*/}
            <SliderBanner />

            {/* Section tạo & Upload CV */}
            <CVSection />

            {/* Section tin tuyển dụng */}
            <Recruitment />

            {/* Section Top nhà tuyển dụng hàng đầu */}
            <TopEmployer />

            {/* Section bài viết nổi bật */}
            <OutstandingPost />

            {/* Parallax */}
            <Parallax />

            <Footer />

            <FloatButton.BackTop tooltip={<div>Scrolling to Top</div>} />
        </div >
    );
};

export default Homepage;