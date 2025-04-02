import { useQuery } from '@tanstack/react-query';
import { filterJobs } from '../services/jobService';

export const useFilterJobs = (currentPage = 1, name = '', location = [], level = []) => {

    const { data: res, isLoading, isFetching, error, refetch, } = useQuery({
        queryKey: ['filterJobs', currentPage, name, location, level],
        queryFn: () => filterJobs({ page: currentPage, name, location, level }),
        staleTime: 10 * 1000,
        refetchOnWindowFocus: true,
        placeholderData: (previousData) => previousData, // thường dùng khi Paginate
    });

    return { res, isLoading, isFetching, error, refetch };
};
