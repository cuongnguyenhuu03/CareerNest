import { useQuery } from '@tanstack/react-query';
import { getJobsByCompany } from '../services/jobService';
import { useSelector } from 'react-redux';

export const useJobsByCompany = (page = 1, companyId = '') => {
    const user = useSelector(state => state?.user?.info);

    const { data: res, isLoading, isFetching, error, refetch, } = useQuery({
        queryKey: ['jobsByCompany', user?.company?.id || companyId, page],
        queryFn: () => getJobsByCompany(+user?.company?.id || companyId, +page),
        enabled: !!user?.company?.id || !!companyId,
        staleTime: 20 * 1000,
        refetchOnWindowFocus: true,
        placeholderData: (previousData) => previousData, // thường dùng khi Paginate
    });

    return { res, isLoading, isFetching, error, refetch };
};
