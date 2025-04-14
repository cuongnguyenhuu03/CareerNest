import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd'
import SockJS from "sockjs-client/dist/sockjs"
import { Stomp } from '@stomp/stompjs';
import { getFirebaseImageUrl } from '../../utils/getFirebaseImageURL.js';
import { useUsersConnected } from '../../hooks/useUsersConnected.jsx';
import { useLocation } from 'react-router-dom';
import { getAllMessages } from '../../services/chatService.js';
import { toast } from 'react-toastify';

const ChatPage = () => {
    const location = useLocation();
    const user = useSelector(state => state?.user?.info);

    const [isChatListVisible, setIsChatListVisible] = useState(true);
    const [stompClient, setStompClient] = useState(null);
    const [userSelected, setUserSelected] = useState(location?.state?.receiver ?? {});
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const userSelectedRef = useRef(userSelected);

    const { res: resUsersConnected, refetch: refetchUsersConnected } = useUsersConnected();

    useEffect(() => {
        document.title = 'Tin nhắn';
        userSelectedRef.current = userSelected;
    }, [userSelected]);

    const onMessageReceived = (payload) => {
        const msg = JSON.parse(payload.body);
        if (msg.receiverId === +user?.id && !userSelectedRef.current?.id) {
            message.info("Có ai đó gửi tin nhắn!");
        }
        setMessages(prevMessages => [...prevMessages, { type: 'receiver', content: msg?.content }])
    };

    function formatDate(createdAt) {
        const date = new Date(typeof createdAt === 'number' ? createdAt * 1000 : createdAt);

        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }

        const now = new Date();

        const isToday =
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();

        if (isToday) {
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        } else {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
    }

    const buildDataMessage = (dataMessages = []) => {
        const userId = +user?.id;
        const results = dataMessages.map(data => ({
            type: data?.sender?.id === userId ? 'sender' : 'receiver',
            content: data?.content,
            time: formatDate(data?.createdAt)
        }));
        setMessages(results);
        return;
    };

    const fetchAllMessages = useCallback(async () => {
        try {
            const res = await getAllMessages(+user?.id, +userSelected?.id);
            if (+res?.statusCode === 200) {
                buildDataMessage(res?.data ?? []);
            } else {
                toast.error(res?.em ?? 'Fetching users active failed!');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }, [+userSelected?.id]);

    useEffect(() => {
        let client = null;

        if (user?.email) {
            const socket = new SockJS('http://localhost:8080/ws');
            client = Stomp.over(socket);

            client.connect({}, () => {
                client.subscribe(`/user/${user?.email}/queue/messages`, onMessageReceived);

                // ✅ Gửi trạng thái ONLINE khi kết nối thành công
                client.send("/app/user.addUser", {}, JSON.stringify({
                    email: user?.email,
                    status: "ONLINE"
                }));

                setStompClient(client);
            }, (error) => {
                console.error('Connection error:', error);
            });
        }

        // ✅ Gửi trạng thái OFFLINE trước khi reload/thoát tab
        const handleBeforeUnload = () => {
            if (client && client.connected) {
                try {
                    client.send("/app/user.disconnectUser", {}, JSON.stringify({
                        email: user?.email,
                        status: "OFFLINE"
                    }));
                    client.disconnect(() => {
                        console.log('Disconnected from WebSocket (beforeunload)');
                    });
                } catch (err) {
                    console.error('Error during beforeunload disconnect:', err);
                }
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // ✅ Cleanup khi component unmount
        return () => {
            if (client && client.connected) {
                try {
                    client.send("/app/user.disconnectUser", {}, JSON.stringify({
                        email: user?.email,
                        status: "OFFLINE"
                    }));
                    client.disconnect(() => {
                        console.log('Disconnected from WebSocket (component unmount)');
                    });
                } catch (err) {
                    console.error('Error during unmount disconnect:', err);
                }
            }
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [user?.email]);

    useEffect(() => {
        if (stompClient && userSelected?.id)
            fetchAllMessages();
    }, [stompClient, userSelected?.id]);

    const handleInputChange = useCallback((e) => {
        setInputMessage(e.target.value);
    }, []);

    const handleSendMessage = (e) => {

        if (inputMessage.trim() && stompClient) {
            const receiver = {
                id: userSelected?.id
            };
            const sender = {
                id: +user?.id
            };
            const chatMessage = {
                sender,
                receiver,
                content: inputMessage.trim(),
                timeStamp: new Date()
            };
            stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
            setMessages(prevMessages => [...prevMessages, { type: 'sender', content: inputMessage.trim() }]);
            setInputMessage('');
        }
    };


    if (!user?.id) return null;
    return (
        <div className="flex h-full border-b border-gray-300 dark:border-slate-700 pt-16">
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
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">{resUsersConnected?.data?.length ?? 0}</span>
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

                </div>
            </aside>
            {/* Chat List history */}
            {isChatListVisible &&
                <>
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
                            {resUsersConnected?.data?.length > 0 && resUsersConnected?.data?.map(user => (
                                <div
                                    key={user?.id}
                                    className="px-2 mb-3 space-y-5 hover:bg-slate-100 hover:rounded-md dark:hover:bg-gray-600 hover:cursor-pointer hover:transition-all"
                                    onClick={() => setUserSelected(user)}
                                >
                                    <div className="p-3 bg-opacity-20 flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden">
                                            <img
                                                src={
                                                    user?.role?.id === 2
                                                        ? getFirebaseImageUrl(user?.avatar, "companies")
                                                        : getFirebaseImageUrl(user?.avatar, "users")
                                                }
                                                alt="User"
                                                className="w-full h-full object-cover"
                                            />

                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-semibold text-wrap text-justify text-primary dark:text-white">
                                                    {user?.firstName?.length > 55
                                                        ? user.firstName.slice(0, 54) + "..."
                                                        : user?.firstName}
                                                </h3>
                                            </div>
                                            <p className="text-sm mt-1 text-gray-400 truncate">(Xem đầy đủ tin nhắn)</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </aside>
                </>

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
                            {resUsersConnected?.data?.length > 0 && resUsersConnected?.data?.map(user => (
                                <div
                                    key={user?.id}
                                    className="px-2 space-y-5 hover:bg-slate-100 hover:rounded-md dark:hover:bg-gray-600 hover:cursor-pointer hover:transition-all"
                                    onClick={() => setUserSelected(user)}
                                >
                                    <div className="p-3 bg-opacity-20 flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden">
                                            <img
                                                src={
                                                    user?.role?.id === 2
                                                        ? getFirebaseImageUrl(user?.avatar, "companies")
                                                        : getFirebaseImageUrl(user?.avatar, "users")
                                                }
                                                alt="User"
                                                className="w-full h-full object-cover"
                                            />

                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xs xs:text-sm text-wrap text-justify font-semibold text-primary dark:text-white">
                                                    {user?.firstName?.length > 55
                                                        ? user.firstName.slice(0, 54) + "..."
                                                        : user?.firstName}
                                                </h3>
                                            </div>
                                            <p className="text-xs xs:text-sm mt-1 text-gray-400 truncate">(Xem đầy đủ tin nhắn)</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>
                }
                {userSelected?.id ?
                    <>
                        <header className="p-4 border-b border-gray-300 dark:border-gray-600 flex items-center justify-between">
                            <div className="flex flex-col items-start gap-2">
                                <h1 className="text-xs sm:text-sm md:text-base text-wrap text-justify font-bold dark:text-white">
                                    {userSelected?.firstName}
                                </h1>
                                {userSelected?.status === 'ONLINE' ?
                                    <span className="flex items-center text-sm font-medium text-green-500">
                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                                        Online
                                    </span>
                                    :
                                    <span className="flex items-center text-sm font-medium text-red-500">
                                        <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>
                                        Ofline
                                    </span>
                                }

                            </div>
                            <div className="flex items-center gap-4">
                                <button className="w-10 h-10 rounded-xl dark:bg-gray-700 flex items-center justify-center text-primary">
                                    <svg className="w-3 h-3 sm:w-5 sm:h-5 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                </button>
                            </div>
                        </header>
                        <div className="overflow-y-auto h-[calc(100vh-230px)] p-4 space-y-6 ">
                            {messages.map((message, index) => {
                                const isSender = message?.type === 'sender';
                                const avatarUrl = userSelected?.role?.id === 2
                                    ? getFirebaseImageUrl(userSelected?.avatar, "companies")
                                    : getFirebaseImageUrl(userSelected?.avatar, "users");
                                const name = isSender ? "Bạn" : userSelected?.firstName;
                                const containerClass = isSender ? "ml-auto" : "";
                                const alignmentClass = isSender ? "justify-end" : "";

                                const bubbleBgClass = isSender
                                    ? "bg-primary bg-opacity-20 dark:bg-primary dark:bg-opacity-30"
                                    : "bg-gray-100 dark:bg-gray-800";

                                return (
                                    <div key={index} className={`flex gap-4 max-w-2xl ${containerClass}`}>
                                        {!isSender && (
                                            <img src={avatarUrl} alt={name} className="w-10 h-10 rounded-xl" />
                                        )}

                                        <div className="flex-1 mb-4">
                                            <div className={`flex items-center gap-2 mb-1 ${alignmentClass}`}>
                                                <span className="font-semibold text-wrap dark:text-gray-400">{name}</span>
                                                <span className="text-xs text-gray-400">{message?.time}</span>
                                            </div>
                                            <div
                                                className={`rounded-xl p-4 border border-gray-300 dark:border-gray-600 
                                            ${isSender ? 'dark:text-gray-400' : 'dark:text-white dark:bg-gray-900'}
                                            ${bubbleBgClass}`}
                                            >
                                                <p>{message?.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}


                        </div>
                        <footer className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 absolute bottom-0 left-0 right-0" >
                            <div className="flex dark:text-white items-center gap-2 dark:bg-gray-700 border border-gray-300 rounded-xl p-2">
                                <button className="p-2 hover:bg-gray-700 rounded-lg text-primary">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                </button>
                                <input
                                    type="text"
                                    placeholder="Your message"
                                    className="flex-1 text-xs xs:text-sm bg-transparent focus:outline-none placeholder-gray-400"
                                    value={inputMessage}
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSendMessage();
                                        }
                                    }}
                                />
                                <button className="p-2 hover:bg-gray-700 rounded-lg text-primary"
                                    onClick={handleSendMessage}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        </footer >
                    </>
                    : <></>
                }

            </main >
        </div >
    );
};

export default ChatPage;