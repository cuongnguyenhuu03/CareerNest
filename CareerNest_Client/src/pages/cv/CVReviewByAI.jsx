import React, { useEffect, useRef, useState } from 'react';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { path } from '../../utils/constant';
import { Badge, Pagination, Spinner } from "flowbite-react";
import { toast } from 'react-toastify';
import { askGeminiWithPDF } from '../../modules/chatbot/gemini';
import { filterJobs } from '../../services/jobService';
import { useQuery } from '@tanstack/react-query';
import JobCard from '../../components/card/JobCard';

const data = [
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Trang chủ" : "Home", path: path.HOME },
    { text: localStorage.getItem('i18nextLng') === 'vi' ? "Đánh giá CV qua AI" : "CV Evaluation", path: "#" }
]
const CVReviewByAI = () => {

    const ref = useRef(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [jobTypes, setJobTypes] = useState([]);
    const [percent, setPercent] = useState([]);


    const extractLastPContent = (text) => {
        // Dùng regex để tìm tất cả nội dung trong các thẻ <p>...</p>
        const matches = [...text.matchAll(/<p>(.*?)<\/p>/gs)];

        if (matches.length === 0) {
            return [[], []]; // Không có thẻ <p>
        }

        // Lấy nội dung trong thẻ <p> cuối cùng
        const lastContent = matches[matches.length - 1][1].trim();

        // Loại bỏ dấu [ và ] nếu có
        const cleaned = lastContent.replace(/^\[|\]$/g, '');

        // Tách thành các phần tử key:value
        const pairs = cleaned
            .split(',')
            .map(item => item.trim())
            .filter(item => item.length > 0);

        const keys = [];
        const values = [];

        for (const pair of pairs) {
            const [key, value] = pair.split(':').map(s => s.trim());
            if (key && value !== undefined) {
                keys.push(key);
                values.push(value);
            }
        }

        return [keys, values];
    };


    const { data: res } = useQuery({
        queryKey: ['filterJobs_reviewCV', currentPage, jobTypes],
        queryFn: () => filterJobs({
            page: currentPage,
            pageSize: 6,
            name: '',
            location: '',
            level: [],
            jobType: jobTypes,
            salary: ''
        }),
        enabled: jobTypes.length > 0,
        staleTime: 30 * 1000,
        refetchOnWindowFocus: true,
        placeholderData: (previousData) => previousData,
    });
    const meta = res?.meta ?? {};

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Đánh giá CV bởi AI';
    }, []);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setLoading(true);
            setResult(""); // reset kết quả cũ nếu có
            try {
                let res = await askGeminiWithPDF(file, "review cv giúp tôi");
                let res2 = await askGeminiWithPDF(file, `Dựa vào file cv này, cùng với các keyword việc làm như:
                DEVELOPER,TESTER,DATA_ENGINEER,DATA_ANALYST,DATA_SCIENTIST,AI_ENGINEER,DEVOPS_ENGISYSTEM_ADMINISTRATOR,
                SECURITY_ENGINEER,NETWORK_ENGINEER,DATABASE_ADMINISTRATOR,EMBEDDED_ENGINEER,ERP_SPECIALIST,GAME_DEVELOPER,UI_UX_DESIGNER,PROJECT_MANAGER,
                BUSINESS_ANALYST,SCRUM_MASTER,BLOCKCHAIN_DEVELOPER,CLOUD_ENGINEER,IT_HELP_DESK,
                hãy phân tích thật kĩ CV và trả về duy nhất 1 mảng các keyword (dựa trên 21 keyword mà tôi đưa ra) và độ phần trăm phù hợp của từng keyword nhé (tổng cả 3 độ phần trăm là 100).
                (lưu ý: chỉ trả về [] chứa các keyword kèm mức độ phần trăm phù hợp, không trả bất kì text nào khác, tối đa 3 keyword trong mảng, đừng trả thêm &quot; trong [], đừng đặt keyword trong cặp dấu nháy nhé.)`);
                setJobTypes(extractLastPContent(res2)[0]);
                setPercent(extractLastPContent(res2)[1]);
                setResult(res ?? "");
            } catch (error) {
                console.log(error);
                toast.error("Có lỗi xảy ra trong quá trình phân tích!");
            }
            finally {
                setLoading(false);
            }
        } else {
            alert("Vui lòng chọn file PDF hợp lệ!");
        }
    };

    return (
        <div ref={ref} className='ct-container py-4 pt-20 bg-[#f7f7f7] dark:bg-slate-900'>
            <Breadcrumbs data={data} />
            <div className={`bg-[#fff] ${result ? 'dark:bg-gray-900' : 'dark:bg-slate-800'} px-3 xs:px-6 py-8 rounded-lg flex items-center justify-center min-h-[350px]`}>
                <div className="text-center max-w-2xl">
                    <h1 className="text-2xl font-bold mb-8 dark:text-white">
                        {localStorage.getItem('i18nextLng') === 'vi' ? "Đánh giá CV bởi AI CareerNest" : "CV Evaluation by AI"}
                    </h1>
                    {!loading && !result && (
                        <label className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
                            {localStorage.getItem('i18nextLng') === 'vi' ? "Chọn file CV (PDF)" : "Select pdf file"}
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    )}

                    {loading && (
                        <div className="flex flex-col items-center justify-center gap-4">
                            <Spinner size='xl' color='info' />
                            <p className="text-lg font-medium animate-pulse dark:text-white">
                                {localStorage.getItem('i18nextLng') === 'vi' ? "Đang phân tích CV..." : "Reviewing CV..."}
                            </p>
                        </div>
                    )}

                    {!loading && result && (
                        <>
                            <div
                                className="mt-8 dark:p-4 dark:rounded-lg text-base text-gray-800 text-justify dark:bg-white"
                                dangerouslySetInnerHTML={{ __html: result }}
                            />
                            {percent?.length > 0 &&
                                <div className='mt-12 mb-4 w-full text-lg sm:text-xl text-slate-800 uppercase animate-pulse dark:text-white font-semibold'>
                                    {localStorage.getItem('i18nextLng') === 'vi' ? "Độ phù hợp từng công việc" : "Suitability for each position."}
                                </div>
                            }
                            <div className="flex flex-col w-full sm:w-2/3 mx-auto space-y-3">
                                {percent?.length > 0 && percent.map((item, index) => (
                                    <div key={item} className="flex items-center gap-2">
                                        {/* Progress Custom */}
                                        <span className='dark:text-gray-400'>{jobTypes[index]}</span>
                                        <div className="relative flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-orange-400 rounded-full"
                                                style={{ width: `${item}%` }}
                                            />
                                        </div>
                                        <span className="w-10 text-sm text-right dark:text-gray-300 font-semibold">{item}%</span>
                                    </div>
                                ))}
                            </div>
                            <div className='mt-12 w-full flex flex-col gap-y-4 overflow-y-auto h-fit max-h-[calc(100vh-300px)]'>
                                {
                                    res?.result?.length <= 0 ?
                                        <Badge color="gray" size="sm" className='w-fit uppercase tracking-wide'>
                                            {localStorage.getItem('i18nextLng') === 'vi' ? "Chưa có công việc phù hợp với CV của bạn" : "There are no jobs that match your CV yet."}
                                        </Badge>
                                        :
                                        <>
                                            {
                                                res?.result?.map(item => (
                                                    <div key={item?.id} className='shadow-lg'>
                                                        <JobCard data={item} className="min-w-full xs:min-w-0" />
                                                    </div>
                                                ))
                                            }
                                        </>

                                }
                            </div>
                            {meta?.pages > 1 &&
                                <div className="flex overflow-x-auto justify-center mt-8">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={meta?.pages}
                                        onPageChange={(page) => setCurrentPage(+page)}
                                        showIcons
                                    />
                                </div>
                            }
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CVReviewByAI;
