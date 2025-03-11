import React from 'react';
import { Avatar, Dropdown } from "flowbite-react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router';
import { dropdownAdmin } from '../../utils/menu';
import { useSelector } from "react-redux";

const DropdownAdmin = () => {
    const user = useSelector(state => state?.user?.info);
    return (
        <>
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <div className='flex items-center gap-2'>
                        <Avatar
                            alt="User settings"
                            img={user?.avatar ?? ''}
                            rounded
                        />
                        <span className='hidden xs:inline-block text-gray-800 font-medium'>{`${user?.lastName ?? ''} ${user?.firstName ?? ''}`}</span>
                        <IoIosArrowDown size={13} />
                    </div>
                }
            >
                {dropdownAdmin?.length > 0 && dropdownAdmin.map(item => (
                    <Dropdown.Item key={item?.path}>
                        <Link to={item?.path}>{item?.text ?? ''}</Link>
                    </Dropdown.Item>
                ))}
                <Dropdown.Divider />
                <Dropdown.Item>Đăng xuất</Dropdown.Item>
            </Dropdown>
        </>
    );
};

export default React.memo(DropdownAdmin);