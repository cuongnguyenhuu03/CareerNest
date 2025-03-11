import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshToken } from '../services/authService';
import { updateUserInfo } from '../redux/slices/userSlice';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const useAppLogic = () => {
    const user = useSelector(state => state.user.info);
    const dispatch = useDispatch();
    const location = useLocation();

    const { data: res, isLoading } = useQuery({
        queryKey: ['refreshToken'],
        queryFn: () => getRefreshToken(),
        enabled: !user?.id,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (location.pathname.includes('/system'))
            document.body.style.overflow = 'hidden'; // Vô hiệu hóa cuộn
        else
            document.body.style.overflow = 'auto'; // Bật lại cuộn

        // Cleanup để đảm bảo không bị ảnh hưởng khi component unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [location.pathname]);

    useEffect(() => {
        if (!isLoading) {
            if (res?.statusCode === 200)
                dispatch(updateUserInfo({ ...res?.data }));
            else {
                // logout
                console.log('Error:', `${res?.data?.error}:${res?.data?.message}`);
                return;
            }
        }
    }, [isLoading]);

};


export default useAppLogic;