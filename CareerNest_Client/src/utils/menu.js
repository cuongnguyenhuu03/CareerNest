import { path } from "./constant";

export const headerMenu = [
    { path: path.HOME, text: 'Trang chủ' },
    { path: '/resume', text: 'Hồ sơ & CV' },
    { path: '/find-job/all', text: 'Tìm việc làm' },
    { path: '/interview-by-AI', text: 'AI Interview' },
    { path: path.RECRUITMENT, text: 'Nhà tuyển dụng' },
];

export const dropdownAccount = [
    { path: `${path.ACCOUNT}/${path.ACCOUNT__OVERVIEW}`, text: 'Tổng quan hồ sơ' },
    { path: `${path.CHAT}/${path.DETAIL__CHAT}`, text: 'Tin nhắn' },
    { path: `${path.ACCOUNT}/${path.ACCOUNT__MY__JOB}`, text: 'Việc làm của tôi' },
    { path: `${path.ACCOUNT}/${path.ACCOUNT__GET__JOB__VIA__MAIL}`, text: 'Đăng ký nhận email' },

];

export const dropdownAdmin = [
    { path: `${path.SYSTEM}/${path.SYSTEM__DASHBOARD}`, text: 'Trang quản trị' },
    { path: `${path.ACCOUNT}/${path.ACCOUNT__PROFILE}`, text: 'Thông tin cá nhân' },
    { path: `${path.CHAT}/${path.DETAIL__CHAT}`, text: 'Tin nhắn' },
];