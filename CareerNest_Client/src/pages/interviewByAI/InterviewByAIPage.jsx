import React, { useEffect, useRef, useState } from 'react';
import Breadcrumbs from '../../components/breadcrumb/Breadcrumbs';
import { path } from '../../utils/constant';
import { Input, Button, Spin } from 'antd'; // Import từ antd
import { toast } from 'react-toastify';
import { askGemini } from '../../modules/chatbot/gemini';
import InterviewForm from '../../modules/chatbot/InterviewForm';

const data = [
    { text: "Trang chủ", path: path.HOME },
    { text: "Phỏng vấn bởi AI", path: "#" }
]

const InterviewByAIPage = () => {
    const [position, setPosition] = useState('');
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const ref = useRef(null);

    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Phỏng vấn giả lập bởi AI';
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let res = await askGemini(`Tạo 1 cuộc phỏng vấn thử cho vị trí ${position} giúp tôi`);
            const div = document.createElement('div');
            div.innerHTML = res;
            const lis = div.querySelectorAll('ol li');
            const arr = Array.from(lis).map(li => li.textContent.trim());
            setQuestions(arr);
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
        finally {
            setLoading(false);
        }

    };


    return (
        <div ref={ref} className='ct-container flex flex-col pt-20'>
            <Breadcrumbs data={data} />

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl md:text-2xl font-semibold mb-10 uppercase text-center">Chào mừng đến với trang Phỏng vấn giả lập bởi AI</h2>
                <div className="hidden sm:flex flex-row gap-6">
                    <div className="flex-1">
                        <p className="text-[14px] text-gray-700 text-justify indent-8">
                            Trang này được thiết kế để giúp bạn chuẩn bị cho các cuộc phỏng vấn xin việc thông qua công nghệ trí tuệ nhân tạo (AI).
                            Bạn có thể trải nghiệm các tình huống phỏng vấn thực tế và nhận phản hồi ngay lập tức về cách trả lời của mình.
                        </p>
                        <p className="text-[14px] text-gray-700 mt-4 text-justify indent-8">
                            Với AI, bạn sẽ được phỏng vấn về các câu hỏi phổ biến trong nhiều lĩnh vực công việc, giúp bạn tự tin hơn khi bước vào cuộc phỏng vấn thật sự.
                            Hệ thống sẽ phân tích và đưa ra những lời khuyên, giúp bạn cải thiện kỹ năng giao tiếp và phản ứng của mình.
                        </p>
                        <p className="text-[14px] text-gray-700 mt-4 text-justify indent-8">
                            Để bắt đầu, chỉ cần chọn loại phỏng vấn mà bạn muốn trải nghiệm, và AI sẽ hướng dẫn bạn qua từng bước một.
                        </p>
                    </div>
                    <div className="flex-1">
                        <img src="https://cdn.impossibleimages.ai/wp-content/uploads/2023/04/25130031/AI-Background-Image-Generator-How-It-Works-and-Why-You-Need-It.jpg" alt="AI Interview" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>

                <div className="sm:hidden flex flex-col gap-6">
                    <div className="flex-1">
                        <p className="text-[14px] text-gray-700 text-justify indent-8">
                            Trang này được thiết kế để giúp bạn chuẩn bị cho các cuộc phỏng vấn xin việc thông qua công nghệ trí tuệ nhân tạo (AI).
                            Bạn có thể trải nghiệm các tình huống phỏng vấn thực tế và nhận phản hồi ngay lập tức về cách trả lời của mình.
                        </p>
                        <p className="text-[14px] text-gray-700 mt-4 text-justify indent-8">
                            Với AI, bạn sẽ được phỏng vấn về các câu hỏi phổ biến trong nhiều lĩnh vực công việc, giúp bạn tự tin hơn khi bước vào cuộc phỏng vấn thật sự.
                            Hệ thống sẽ phân tích và đưa ra những lời khuyên, giúp bạn cải thiện kỹ năng giao tiếp và phản ứng của mình.
                        </p>
                        <p className="text-[14px] text-gray-700 mt-4 text-justify indent-8">
                            Để bắt đầu, chỉ cần chọn loại phỏng vấn mà bạn muốn trải nghiệm, và AI sẽ hướng dẫn bạn qua từng bước một.
                        </p>
                    </div>
                    <div className="flex-1">
                        <img src="https://cdn.impossibleimages.ai/wp-content/uploads/2023/04/25130031/AI-Background-Image-Generator-How-It-Works-and-Why-You-Need-It.jpg" alt="AI Interview" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>

                {questions?.length <= 0 &&
                    <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center justify-center">
                        <div className="mb-4 w-full max-w-xs">
                            <label htmlFor="position" className="block text-lg font-medium text-blue-500">Bạn muốn phỏng vấn vị trí nào?</label>
                            <Input
                                id="position"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                placeholder="Nhập vị trí bạn muốn phỏng vấn"
                                required
                                className="mt-2 w-full" // Full width with Tailwind
                            />
                        </div>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="mt-4 w-fit"
                            loading={loading} // Show loading indicator when submitting
                        >
                            Bắt đầu phỏng vấn
                        </Button>
                    </form>
                }

                {loading && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                        <Spin size="large" /> {/* Show spinning indicator */}
                    </div>
                )}

                {questions?.length > 0 &&
                    <div className='mt-16'>
                        <h1 className="text-xl text-center font-semibold mb-4 tracking-wide">Câu hỏi phỏng vấn <span className='text-red-500 uppercase'>{position}</span></h1>
                        <InterviewForm questions={questions} />
                    </div>
                }
            </div>
        </div>
    );
};

export default InterviewByAIPage;
