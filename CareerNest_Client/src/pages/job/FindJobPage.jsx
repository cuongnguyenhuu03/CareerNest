import React, { useEffect, useRef, useState, } from 'react';
import { Link, useParams } from 'react-router-dom';
import _ from 'lodash';
import './DetailJobPage.scss';
import withErrorBoundary from '../../hoc/withErrorBoundary';
import { Button, Dropdown, Pagination, Select, Tooltip } from 'flowbite-react';
import FilterJobModal from '../../modules/job/FilterJobModal';
import { FaFilter, FaDollarSign, FaMapMarkerAlt, FaLaptop, FaClock, FaBuilding } from "react-icons/fa";
import { BsSuitHeart } from 'react-icons/bs';
import { path } from '../../utils/constant';
import slugify from 'slugify';

// Dữ liệu danh sách job
const jobs = [
    {
        id: 1,
        title: "Remote Fullstack Developer (Django (Python), ReactJS)",
        company: "Sekigin LLC.",
        location: "Hà Nội - TP Hồ Chí Minh",
        salary: "Very attractive!!!",
        tags: ["Python", "ReactJS", "NextJS"]
    },
    {
        id: 2,
        title: "Backend Developer (NodeJS, AWS)",
        company: "Tech Corp.",
        location: "Đà Nẵng",
        salary: "10-20 triệu",
        tags: ["NodeJS", "AWS", "MongoDB"]
    },
    {
        id: 3,
        title: "Frontend Developer (ReactJS, Tailwind)",
        company: "Innovate Ltd.",
        location: "Hà Nội",
        salary: "Trên 20 triệu",
        tags: ["ReactJS", "Tailwind", "TypeScript"]
    }
];
const FindJobPage = () => {
    const ref = useRef(null);
    const params = useParams();
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [openModalFilter, setOpenModalFilter] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null); // State lưu job được chọn
    const detailRef = useRef(null); // ref cho thẻ div bên phải
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Tìm việc làm';
    }, []);

    const toggleLevel = (level) => {
        setSelectedLevels((prev) =>
            prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
        );
    };

    const onPageChange = (page) => setCurrentPage(page);

    const handleSelectJob = (id) => {
        setSelectedJob(id);
        // Scroll mượt đến thẻ chi tiết bên phải
        detailRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (!params?.keyword && !params?.city) return null;
    return (
        <>
            <div ref={ref} className='ct-container flex flex-col gap-y-6'>
                <div className='font-semibold text-lg md:text-2xl tracking-wide dark:text-white'>10 việc làm <span className='text-red-500'>nodejs</span> tại TP Hồ Chí Minh</div>
                <div className="hidden w-full md:flex items-center justify-between rounded-md shadow-md dark:shadow-lg p-4">
                    <div className='flex items-center gap-4'>
                        {/* Cấp bậc */}
                        <Dropdown label="Cấp bậc" color='gray' className="border-gray-300">
                            <div className="p-2 w-32 lg:w-40">
                                {["Fresher", "Junior", "Senior", "Manager"].map((level) => (
                                    <label key={level} className="flex items-center gap-2 p-1">
                                        <input
                                            type="checkbox"
                                            checked={selectedLevels.includes(level)}
                                            onChange={() => toggleLevel(level)}
                                            className="w-4 h-4"
                                        />
                                        {level}
                                    </label>
                                ))}
                            </div>
                        </Dropdown>

                        {/* Quận/Huyện */}
                        <Select className="w-36 lg:w-40 rounded-full border-gray-300">
                            <option>Quận/Huyện</option>
                            <option>Quận 1</option>
                            <option>Quận 2</option>
                            <option>Quận 3</option>
                        </Select>

                        {/* Hình thức làm việc */}
                        <Select className="w-44 lg:w-48 rounded-full border-gray-300">
                            <option>Hình thức làm việc</option>
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Freelance</option>
                        </Select>

                        {/* Mức lương */}
                        <Select className="w-32 rounded-full border-gray-300">
                            <option>Mức lương</option>
                            <option>5-10 triệu</option>
                            <option>10-20 triệu</option>
                            <option>Trên 20 triệu</option>
                        </Select>
                    </div>

                    <Button gradientMonochrome="info" className='ml-4'>Lọc</Button>
                </div>
                <div className='w-full md:hidden flex justify-end'>
                    <Button color="light" onClick={() => setOpenModalFilter(true)}>
                        <FaFilter size={18} className='mr-2' /> Bộ lọc
                    </Button>
                </div>

                {/* Hiển thị danh sách jobs và detail job */}
                <div className='hidden w-full md:flex gap-6'>
                    <div className='flex flex-col gap-7'>
                        {jobs.map((job) => (
                            <div
                                key={job?.id}
                                className={`shadow-lg dark:bg-gray-700 rounded-lg p-4 cursor-pointer ${selectedJob === job.id ? "border border-red-300 bg-red-50 transition-all" : ""}`}
                                onClick={() => handleSelectJob(job?.id)} // Cập nhật job được chọn
                            >
                                <p className="text-gray-500 text-sm ">Đăng 18 ngày trước</p>
                                <h2 className="text-lg font-bold mt-1 dark:text-white">{job.title}</h2>

                                <div className="flex items-center gap-2 mt-2">
                                    <img
                                        src="https://images.unsplash.com/photo-1724582980082-6753d3c54ede?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt={job.company}
                                        className="w-10 h-10 rounded"
                                    />
                                    <Link to={`${path.RECRUITMENT}/detail/${job?.company?.id}/${slugify(job?.company, { lower: true, strict: true })}`} className="text-gray-700 font-medium hover:underline hover:text-red-500 hover:transition-all">{job.company}</Link>
                                </div>

                                <p className="flex items-center gap-2 text-green-600 font-semibold mt-2">
                                    <FaDollarSign className="text-xl" /> {job.salary}
                                </p>

                                <div className="mt-2 text-gray-600 space-y-1 dark:text-gray-400">
                                    <p className="flex items-center gap-2 ">
                                        <FaLaptop className="text-gray-500" /> Làm từ xa
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-gray-500" /> {job.location}
                                    </p>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {job.tags.map((tech) => (
                                        <span key={tech} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div ref={detailRef}
                        className="h-fit bg-white rounded-lg shadow-md p-6 border overflow-hidden dark:bg-gray-700"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <img src="https://plus.unsplash.com/premium_photo-1670426500778-80d177da0973?q=80&w=2056&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Company Logo" className="w-16 h-16 object-contain" />
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-1 dark:text-white">
                                        Technical Leader (Java)
                                        <Tooltip content="Mở trong tab khác" style="dark">
                                            <a href="/" target='_blank' className="text-blue-500 text-md hover:underline">↗</a>
                                        </Tooltip>
                                    </h2>
                                    <Link to={'#'} className="text-gray-600 hover:underline dark:text-gray-400 hover:text-red-500 hover:transition-all">Esoft Vietnam, Ltd</Link>
                                    <p className="text-green-600 font-medium mt-1">$ 2,500 - 3,000 USD</p>
                                </div>
                            </div>
                            <button className="text-red-500 text-xl hover:text-red-600">
                                <BsSuitHeart />
                            </button>
                        </div>

                        {/* Apply Button */}
                        <button className="w-full bg-red-500 hover:bg-red-600 hover:transition-colors text-white font-semibold py-2 rounded-lg mt-4">
                            Ứng tuyển
                        </button>
                        <hr className='mt-4' />
                        <div className="max-h-96 overflow-y-auto border-t px-6 py-4 space-y-4">
                            {/* Info */}
                            <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-gray-500" />
                                    <span>
                                        Tòa Hàn Việt, 203 Minh Khai, Phường Minh Khai, Quận Hai Bà Trưng, Hà Nội
                                        <a href="#" className="text-blue-500 ml-1 text-xs hover:underline">↗</a>
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaBuilding className="text-gray-500" />
                                    <span>Tại văn phòng</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaClock className="text-gray-500" />
                                    <span>16 giờ trước</span>
                                </div>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {['Java', 'SQL', 'Automation Test'].map(skill => (
                                        <span key={skill} className="bg-gray-200 px-2 py-1 rounded-md text-xs text-gray-800">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            {/* 3 lý do */}
                            <div className="mt-6">
                                <h3 className="font-bold text-gray-800 mb-2">3 Lý do để gia nhập công ty</h3>
                                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 dark:text-gray-400">
                                    <li><span className="text-red-500">•</span> Competitive salary & benefit package</li>
                                    <li><span className="text-red-500">•</span> Recognition & respect the diversity culture</li>
                                    <li><span className="text-red-500">•</span> Dynamic & international working environment</li>
                                </ul>
                            </div>
                            {/* 3 lý do */}
                            <div className="mt-6">
                                <h3 className="font-bold text-gray-800 mb-2">3 Lý do để gia nhập công ty</h3>
                                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 dark:text-gray-400">
                                    <li><span className="text-red-500">•</span> Competitive salary & benefit package</li>
                                    <li><span className="text-red-500">•</span> Recognition & respect the diversity culture</li>
                                    <li><span className="text-red-500">•</span> Dynamic & international working environment</li>
                                </ul>
                            </div>
                            {/* 3 lý do */}
                            <div className="mt-6">
                                <h3 className="font-bold text-gray-800 mb-2">3 Lý do để gia nhập công ty</h3>
                                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 dark:text-gray-400">
                                    <li><span className="text-red-500">•</span> Competitive salary & benefit package</li>
                                    <li><span className="text-red-500">•</span> Recognition & respect the diversity culture</li>
                                    <li><span className="text-red-500">•</span> Dynamic & international working environment</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='md:hidden flex flex-col gap-8'>
                    {jobs.map((job) => (
                        <div
                            key={job?.id}
                            className={`shadow-lg rounded-lg p-4 cursor-pointer ${selectedJob === job.id ? "border border-red-300 bg-red-50 transition-all" : ""}`}
                            onClick={() => handleSelectJob(job?.id)} // Cập nhật job được chọn
                        >
                            <p className="text-gray-500 text-sm">Đăng 18 ngày trước</p>
                            <h2 className="text-lg font-bold mt-1 dark:text-white">{job.title}</h2>

                            <div className="flex items-center gap-2 mt-2">
                                <img
                                    src="https://images.unsplash.com/photo-1724582980082-6753d3c54ede?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt={job.company}
                                    className="w-10 h-10 rounded"
                                />
                                <p className="text-gray-700 font-medium dark:text-gray-400">{job.company}</p>
                            </div>

                            <p className="flex items-center gap-2 text-green-600 font-semibold mt-2">
                                <FaDollarSign className="text-xl" /> {job.salary}
                            </p>

                            <div className="mt-2 text-gray-600 space-y-1 dark:text-gray-400">
                                <p className="flex items-center gap-2 ">
                                    <FaLaptop className="text-gray-500" /> Làm từ xa
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-gray-500" /> {job.location}
                                </p>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {job.tags.map((tech) => (
                                    <span key={tech} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex overflow-x-auto sm:justify-center mb-8">
                <Pagination currentPage={currentPage} totalPages={6} onPageChange={onPageChange} showIcons />
            </div>
            {openModalFilter && <FilterJobModal isOpen={openModalFilter} setOpenModal={setOpenModalFilter} />}
        </>
    );
};

export default withErrorBoundary(FindJobPage);