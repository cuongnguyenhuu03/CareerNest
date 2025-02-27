import React from 'react';
import { Avatar, Dropdown } from "flowbite-react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router';
import { path } from '../../utils/constant';

const DropdownAccount = ({ account = {} }) => {
    return (
        <>
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <div className='flex items-center gap-2'>
                        <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                        <span className='hidden xs:inline-block text-gray-800 font-medium'>Vũ Hoàng Hải</span>
                        <IoIosArrowDown size={13} />
                    </div>
                }
            >
                <Dropdown.Item >
                    <Link to={`${path.ACCOUNT}/${path.ACCOUNT__PROFILE}`}>Thông tin cá nhân</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link to={`${path.ACCOUNT}/${path.ACCOUNT__MY__JOB}`}>Việc làm của tôi</Link>
                </Dropdown.Item>
                <Dropdown.Item>Việc làm phù hợp</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Đăng xuất</Dropdown.Item>
            </Dropdown>
        </>
    );
};

export default DropdownAccount;