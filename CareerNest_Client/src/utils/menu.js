import { path } from "./constant";

export const headerMenu = [
    { path: path.HOME, text: 'Trang chủ' },
    { path: '/resume', text: 'Hồ sơ & CV' },
    { path: '/find-job', text: 'Tìm việc làm' },
    { path: path.RECRUITMENT, text: 'Nhà tuyển dụng' },
];

export const dropdownAccount = [
    { path: `${path.ACCOUNT}/${path.ACCOUNT__OVERVIEW}`, text: 'Tổng quan hồ sơ' },
    { path: `${path.ACCOUNT}/${path.ACCOUNT__MY__JOB}`, text: 'Việc làm của tôi' },
    { path: '#', text: 'Việc làm phù hợp' },
];