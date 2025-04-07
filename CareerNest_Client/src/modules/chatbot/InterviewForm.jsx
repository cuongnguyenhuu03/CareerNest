import { Spin } from 'antd';
import React, { useRef, useState } from 'react';
import { FaRegQuestionCircle } from "react-icons/fa";
import { toast } from 'react-toastify';
import { askGemini } from './gemini';

const InterviewForm = ({ questions }) => {
    const answerRefs = useRef([]);
    const [loading, setLoading] = useState(false);
    const [answerFromAI, setAnswerFromAI] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const answers = answerRefs.current.map(ref => ref?.value || '');
            // Duyệt qua từng câu trả lời và format lại
            const formattedAnswers = answers.map((ans, i) => `Câu trả lời ${i + 1}: ${ans}`).join('\n');
            let res = await askGemini(formattedAnswers);
            setAnswerFromAI(res ?? "");
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!answerFromAI ?
                <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
                    {questions.map((question, index) => (
                        <div key={index}>
                            <p className="font-semibold text-slate-600 mb-2 flex"><FaRegQuestionCircle size={25} className='mr-2' /> {question}</p>
                            <textarea
                                ref={(el) => (answerRefs.current[index] = el)}
                                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                rows={4}
                                placeholder={`Nhập câu trả lời cho câu hỏi ${index + 1}`}
                                required
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 hover:transition-all"
                    >
                        Nộp
                    </button>
                </form>
                :
                <div
                    className="mt-8 text-base text-wrap text-gray-800 text-justify overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: answerFromAI }}
                />
            }
            {loading && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <Spin size="large" /> {/* Show spinning indicator */}
                </div>
            )}
        </>
    );
};

export default InterviewForm;
