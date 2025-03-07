import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshToken } from '../services/authService';
import { toast } from 'react-toastify';
import { updateUserInfo } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { path } from '../utils/constant';
import { useQuery } from '@tanstack/react-query';

const useAppLogic = () => {
    const user = useSelector(state => state.user.info);
    const dispatch = useDispatch();

    const { data: res, isLoading } = useQuery({
        queryKey: ['refreshToken'],
        queryFn: () => getRefreshToken(),
        enabled: !user?.id,
        refetchOnWindowFocus: false,
    })

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