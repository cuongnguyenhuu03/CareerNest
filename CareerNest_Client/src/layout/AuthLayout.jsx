import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthLayout = ({ children = <> </> }) => {
    const navigate = useNavigate();
    const location = useLocation();
    // const user = useSelector(state => state.user.info);

    // useEffect(() => {
    //     if (user?._id)
    //         navigate(location?.state ?? '/');
    // }, [user?._id]);

    // if (user?._id) return null;
    return (
        <>
            {children}
        </>
    );
};

export default AuthLayout;