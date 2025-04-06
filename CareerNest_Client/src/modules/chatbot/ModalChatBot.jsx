import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdSend } from "react-icons/io";
import { RiRobot2Line } from "react-icons/ri";
import { CiUser, CiImageOn } from "react-icons/ci";
import withErrorBoundary from '../../hoc/withErrorBoundary';
import { askGemini, askGeminiWithPDF } from './gemini';
import { message } from 'antd';
import { Spinner } from "flowbite-react";

const ModalChatBot = ({ setShowChatbot = () => { } }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [input, setInput] = useState("");
    const [file, setFile] = useState(null);

    const handleAsk = async () => {
        if (!input.trim()) {
            message.warning("Vui lòng nhập câu hỏi cho Chatbot.");
            return;
        }

        // Tạo tin nhắn của người dùng
        const userMessage = {
            username: "User",
            message: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        // Thêm tin nhắn người dùng vào lịch sử trò chuyện
        setChatHistory(prevHistory => [
            ...prevHistory,
            userMessage,
            { username: "Chatbot", message: "Loading...", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), } // Thêm "Loading..." vào khi đợi phản hồi
        ]);

        // Sau khi tin nhắn người dùng được thêm, làm sạch input
        setInput("");

        try {
            // Gọi API để lấy câu trả lời từ Gemini
            let answer;
            if (file) {
                answer = await askGeminiWithPDF(file, input); // Gửi cả file và input
            } else {
                answer = await askGemini(input); // Chỉ gửi input nếu không có file
            }
            setFile(null);

            // Tạo tin nhắn của Gemini với phản hồi
            const geminiMessage = {
                username: "Chatbot",
                message: answer,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };

            // Cập nhật lại lịch sử trò chuyện, thay thế "Loading..." bằng câu trả lời
            setChatHistory(prevHistory => {
                const updatedHistory = [...prevHistory];
                updatedHistory[updatedHistory.length - 1] = geminiMessage; // Thay thế tin nhắn "Loading..."
                return updatedHistory;
            });

        } catch (error) {
            console.error("Error fetching the response:", error);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                className="fixed  bottom-20 right-20 z-50"
            >
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg w-80 relative">
                    <button
                        className="absolute top-2 right-2 text-xl text-gray-600 hover:text-red-500"
                        onClick={() => setShowChatbot(false)}
                    >
                        ❌
                    </button>
                    <h2 className="text-lg flex items-center justify-center font-bold mb-3 text-gray-800 dark:text-white ">
                        <RiRobot2Line size={20} className='mr-4' /> ChatBot AI
                    </h2>
                    <hr className='mb-4' />

                    <div className='w-full flex flex-col gap-4 min-h-60 max-h-60 overflow-y-auto'>
                        {chatHistory.map((chat, index) => (
                            chat?.username === 'Chatbot' ?
                                <div key={index} className="flex justify-start">
                                    <div className="max-w-[80%] rounded-lg p-3 bg-gray-200 text-gray-800 rounded-bl-none">
                                        <div className="flex items-center mb-1">
                                            <RiRobot2Line size={18} className='mr-2' />
                                            <span className="text-xs font-medium">{chat?.username}</span>
                                            <span className="text-xs ml-2 opacity-75">{chat?.time}</span>
                                        </div>
                                        {chat?.message === 'Loading...' ? <div className='text-center'><Spinner size="sm" /></div>
                                            :
                                            <div
                                                className="text-[13px]"
                                                dangerouslySetInnerHTML={{ __html: chat?.message }}
                                            />
                                        }

                                    </div>
                                </div>
                                :
                                <div key={index} className="flex justify-end">
                                    <div className="max-w-[80%] rounded-lg p-3 bg-blue-500 text-white rounded-br-none">
                                        <div className="flex items-center mb-1">
                                            <CiUser size={16} className='mr-2' />
                                            <span className="text-xs font-medium">{chat?.username}</span>
                                            <span className="text-xs ml-2 opacity-75">{chat?.time}</span>
                                        </div>
                                        <p className='text-[13px]'>{chat?.message}</p>
                                    </div>
                                </div>
                        ))}
                    </div>

                    {file && (
                        <p className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">
                            📎 {file.name}
                        </p>
                    )}
                    <div className="border-t border-gray-200 pt-4 flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && input.trim()) {
                                    handleAsk();
                                }
                            }}
                            placeholder="Type your message here..."
                            className="flex-1 text-xs border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none"
                        />

                        {/* Nút upload file */}
                        <label className="bg-gray-200 p-2 cursor-pointer hover:bg-gray-300">
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="hidden"
                            />
                            <CiImageOn size={18} />
                        </label>

                        {/* Nút gửi */}
                        <button
                            onClick={handleAsk}
                            disabled={!input.trim() && !file}
                            className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <IoMdSend size={18} />
                        </button>
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default withErrorBoundary(ModalChatBot);