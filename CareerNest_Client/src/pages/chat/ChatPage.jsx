import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
    const ref = useRef(null);
    const params = useParams();
    const [isChatListVisible, setIsChatListVisible] = useState(true);


    useEffect(() => {
        if (ref?.current)
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = 'Tin nhắn';
    }, []);

    if (!params?.id) return null;
    return (
        <div ref={ref} className="flex h-full border-b border-gray-300 dark:border-gray-700 pt-14">
            {/* Left Sidebar */}
            <aside className="w-20  flex flex-col items-center py-6 border-r border-gray-300 dark:border-gray-700">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-8">
                    <svg onClick={() => setIsChatListVisible(!isChatListVisible)} className="w-8 h-8 cursor-pointer text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </div>
                <nav className="space-y-6 flex-1">
                    <a href="#" className="block relative">
                        <div className="w-12 h-12 dark:text-white border border-gray-400 rounded-xl flex items-center justify-center text-primary relative">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">48</span>
                        </div>
                    </a>
                    <a href="#" className="block">
                        <div className="w-12 h-12 dark:text-white border border-gray-400 rounded-xl flex items-center justify-center text-primary relative">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">4</span>
                        </div>
                    </a>
                </nav>
                <div className="mt-auto space-y-6">
                    <button className="w-12 h-12 dark:text-white border border-gray-400 rounded-xl flex items-center justify-center text-primary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                    <button className="w-12 h-12 rounded-xl overflow-hidden">
                        <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk3.webp" alt="Profile" className="w-full h-full object-cover" />
                    </button>
                </div>
            </aside>
            {/* Chat List */}
            {isChatListVisible &&
                <aside className="w-80 hidden lg:block border-r border-gray-300 dark:border-gray-700">
                    <div className="p-4">
                        <div className="relative">
                            <input type="search" placeholder="Search" className="w-full border border-gray-300 dark:bg-gray-700 text-black rounded-xl py-2 pl-10 pr-4 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary" />
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="overflow-y-auto h-[calc(100vh-140px)]">
                        <div className="px-2 space-y-5">
                            <div className="p-3 rounded-xl dark:bg-gray-700 bg-primary bg-opacity-20 flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl overflow-hidden">
                                    <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-full h-full object-cover" />
                                </div>                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-primary dark:text-white">Design chat</h3>
                                        <span className="text-xs text-gray-400">4m</span>
                                    </div>
                                    <p className="text-sm text-gray-400 truncate">i love you mahn</p>
                                </div>
                            </div>
                            {/* More chat items */}
                            <div className="p-3 rounded-xl dark:bg-gray-700  flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl overflow-hidden">
                                    <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold dark:text-white">Abhi</h3>
                                        <span className="text-xs text-gray-400">20m</span>
                                    </div>
                                    <p className="text-sm text-gray-400 truncate">Hey! We are ready to start...</p>
                                </div>
                            </div>
                            <div className="p-3 rounded-xl dark:bg-gray-700 bg-primary bg-opacity-20 flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl overflow-hidden">
                                    <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-full h-full object-cover" />
                                </div>                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-primary dark:text-white">Design chat</h3>
                                        <span className="text-xs text-gray-400">4m</span>
                                    </div>
                                    <p className="text-sm text-gray-400 truncate">i love you mahn</p>
                                </div>
                            </div>
                            {/* More chat items */}
                            <div className="p-3 rounded-xl dark:bg-gray-700  flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl overflow-hidden">
                                    <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold dark:text-white">Abhi</h3>
                                        <span className="text-xs text-gray-400">20m</span>
                                    </div>
                                    <p className="text-sm text-gray-400 truncate">Hey! We are ready to start...</p>
                                </div>
                            </div>
                            <div className="p-3 rounded-xl dark:bg-gray-700 bg-primary bg-opacity-20 flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl overflow-hidden">
                                    <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-full h-full object-cover" />
                                </div>                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-primary dark:text-white">Design chat</h3>
                                        <span className="text-xs text-gray-400">4m</span>
                                    </div>
                                    <p className="text-sm text-gray-400 truncate">i love you mahn</p>
                                </div>
                            </div>
                            {/* More chat items */}
                            <div className="p-3 rounded-xl dark:bg-gray-700  flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl overflow-hidden">
                                    <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold dark:text-white">Abhi</h3>
                                        <span className="text-xs text-gray-400">20m</span>
                                    </div>
                                    <p className="text-sm text-gray-400 truncate">Hey! We are ready to start...</p>
                                </div>
                            </div>
                            <div className="p-3 rounded-xl dark:bg-gray-700 bg-primary bg-opacity-20 flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl overflow-hidden">
                                    <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-full h-full object-cover" />
                                </div>                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-primary dark:text-white">Design chat</h3>
                                        <span className="text-xs text-gray-400">4m</span>
                                    </div>
                                    <p className="text-sm text-gray-400 truncate">i love you mahn</p>
                                </div>
                            </div>
                            {/* More chat items */}
                            <div className="p-3 rounded-xl dark:bg-gray-700  flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl overflow-hidden">
                                    <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold dark:text-white">Abhi</h3>
                                        <span className="text-xs text-gray-400">20m</span>
                                    </div>
                                    <p className="text-sm text-gray-400 truncate">Hey! We are ready to start...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            }
            {/* Main Chat */}
            <main className="flex-1 flex flex-col relative">
                {isChatListVisible &&
                    <aside className="w-64 xs:w-80 lg:hidden absolute top-0 left-0 inset-0 z-50 bg-gray-50 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 ">
                        <div className="p-4">
                            <div className="relative">
                                <input type="search" placeholder="Search" className="w-full border border-gray-300 dark:bg-gray-700 text-black rounded-xl py-2 pl-10 pr-4 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary" />
                                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="overflow-y-auto h-[calc(100vh-235px)]">
                            <div className="px-2 space-y-5">
                                <div className="p-3 border border-gray-200 rounded-xl dark:bg-gray-700 bg-primary bg-opacity-20 flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden">
                                        <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-primary dark:text-white">Design chat</h3>
                                            <span className="text-xs text-gray-400">4m</span>
                                        </div>
                                        <p className="text-sm text-gray-400 truncate">i love you mahn</p>
                                    </div>
                                </div>
                                {/* More chat items */}
                                <div className="p-3 border border-gray-200  rounded-xl dark:bg-gray-700  flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden">
                                        <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold dark:text-white">Abhi</h3>
                                            <span className="text-xs text-gray-400">20m</span>
                                        </div>
                                        <p className="text-sm text-gray-400 truncate">Hey! We are ready to start...</p>
                                    </div>
                                </div>
                                <div className="p-3 border border-gray-200 rounded-xl dark:bg-gray-700 bg-primary bg-opacity-20 flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden">
                                        <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-primary dark:text-white">Design chat</h3>
                                            <span className="text-xs text-gray-400">4m</span>
                                        </div>
                                        <p className="text-sm text-gray-400 truncate">i love you mahn</p>
                                    </div>
                                </div>
                                {/* More chat items */}
                                <div className="p-3 border border-gray-200  rounded-xl dark:bg-gray-700  flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden">
                                        <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold dark:text-white">Abhi</h3>
                                            <span className="text-xs text-gray-400">20m</span>
                                        </div>
                                        <p className="text-sm text-gray-400 truncate">Hey! We are ready to start...</p>
                                    </div>
                                </div>
                                <div className="p-3 border border-gray-200 rounded-xl dark:bg-gray-700 bg-primary bg-opacity-20 flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden">
                                        <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-primary dark:text-white">Design chat</h3>
                                            <span className="text-xs text-gray-400">4m</span>
                                        </div>
                                        <p className="text-sm text-gray-400 truncate">i love you mahn</p>
                                    </div>
                                </div>
                                {/* More chat items */}
                                <div className="p-3 border border-gray-200  rounded-xl dark:bg-gray-700  flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden">
                                        <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold dark:text-white">Abhi</h3>
                                            <span className="text-xs text-gray-400">20m</span>
                                        </div>
                                        <p className="text-sm text-gray-400 truncate">Hey! We are ready to start...</p>
                                    </div>
                                </div>
                                <div className="p-3 border border-gray-200 rounded-xl dark:bg-gray-700 bg-primary bg-opacity-20 flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden">
                                        <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-primary dark:text-white">Design chat</h3>
                                            <span className="text-xs text-gray-400">4m</span>
                                        </div>
                                        <p className="text-sm text-gray-400 truncate">i love you mahn</p>
                                    </div>
                                </div>
                                {/* More chat items */}
                                <div className="p-3 border border-gray-200  rounded-xl dark:bg-gray-700  flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden">
                                        <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold dark:text-white">Abhi</h3>
                                            <span className="text-xs text-gray-400">20m</span>
                                        </div>
                                        <p className="text-sm text-gray-400 truncate">Hey! We are ready to start...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                }
                <header className="p-4 border-b border-gray-300 dark:border-gray-600 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold dark:text-white">Design chat</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-xl dark:bg-gray-700 flex items-center justify-center text-primary">
                            <svg className="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </button>
                        <button className="w-10 h-10 rounded-xl dark:bg-gray-700 flex items-center justify-center text-primary">
                            <svg className="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </button>
                    </div>
                </header>
                <div className="overflow-y-auto h-[calc(100vh-230px)] p-4 space-y-6 ">
                    <div className="flex gap-4 max-w-2xl">
                        <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-10 h-10 rounded-xl" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold dark:text-gray-400">ARK</span>
                                <span className="text-xs text-gray-400">09:20</span>
                            </div>
                            <div className="border border-gray-300 dark:bg-gray-700 dark:text-gray-400 rounded-xl p-4">
                                <p>I added new flows to our design system. Now you can use them for your projects!</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <button className="px-2 py-1 border border-gray-300 dark:bg-gray-700 rounded-lg text-xs flex items-center gap-1">
                                    👍 <span>4</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 max-w-2xl ml-auto">
                        <div className="flex-1">
                            <div className="flex items-center justify-end gap-2 mb-1">
                                <span className="font-semibold dark:text-gray-400">You</span>
                                <span className="text-xs text-gray-400">09:27</span>
                            </div>
                            <div className="bg-primary bg-opacity-20 rounded-xl p-4 border border-gray-300 dark:bg-gray-700 dark:text-gray-400">
                                <p>Abhi, my congratulations! I will be glad to work with you on a new project 😊</p>
                            </div>
                        </div>
                        <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk3.webp" alt="You" className="w-10 h-10 rounded-xl" />
                    </div>

                    <div className="flex gap-4 max-w-2xl">
                        <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-10 h-10 rounded-xl" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold dark:text-gray-400">ARK</span>
                                <span className="text-xs text-gray-400">09:20</span>
                            </div>
                            <div className="border border-gray-300 dark:bg-gray-700 dark:text-gray-400 rounded-xl p-4">
                                <p>I added new flows to our design system. Now you can use them for your projects!</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <button className="px-2 py-1 border border-gray-300 dark:bg-gray-700 rounded-lg text-xs flex items-center gap-1">
                                    👍 <span>4</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 max-w-2xl ml-auto">
                        <div className="flex-1">
                            <div className="flex items-center justify-end gap-2 mb-1">
                                <span className="font-semibold dark:text-gray-400">You</span>
                                <span className="text-xs text-gray-400">09:27</span>
                            </div>
                            <div className="bg-primary bg-opacity-20 rounded-xl p-4 border border-gray-300 dark:bg-gray-700 dark:text-gray-400">
                                <p>Abhi, my congratulations! I will be glad to work with you on a new project 😊</p>
                            </div>
                        </div>
                        <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk3.webp" alt="You" className="w-10 h-10 rounded-xl" />
                    </div>

                    <div className="flex gap-4 max-w-2xl">
                        <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp" alt="User" className="w-10 h-10 rounded-xl" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold dark:text-gray-400">ARK</span>
                                <span className="text-xs text-gray-400">09:20</span>
                            </div>
                            <div className="border border-gray-300 dark:bg-gray-700 dark:text-gray-400 rounded-xl p-4">
                                <p>I added new flows to our design system. Now you can use them for your projects!</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <button className="px-2 py-1 border border-gray-300 dark:bg-gray-700 rounded-lg text-xs flex items-center gap-1">
                                    👍 <span>4</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 max-w-2xl ml-auto">
                        <div className="flex-1">
                            <div className="flex items-center justify-end gap-2 mb-1">
                                <span className="font-semibold dark:text-gray-400">You</span>
                                <span className="text-xs text-gray-400">09:27</span>
                            </div>
                            <div className="bg-primary bg-opacity-20 rounded-xl p-4 border border-gray-300 dark:bg-gray-700 dark:text-gray-400">
                                <p>Abhi, my congratulations! I will be glad to work with you on a new project 😊</p>
                            </div>
                        </div>
                        <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk3.webp" alt="You" className="w-10 h-10 rounded-xl" />
                    </div>
                </div>
                <footer className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 absolute bottom-0 left-0 right-0" >
                    <div className="flex dark:text-white items-center gap-2 dark:bg-gray-700 border border-gray-300 rounded-xl p-2">
                        <button className="p-2 hover:bg-gray-700 rounded-lg text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                        </button>
                        <input type="text" placeholder="Your message" className="flex-1 text-xs xs:text-sm bg-transparent focus:outline-none placeholder-gray-400" />
                        <button className="p-2 hover:bg-gray-700 rounded-lg text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </footer >
            </main >
        </div >
    );
};

export default ChatPage;