import { useQuery } from '@tanstack/react-query';
import { getAllComments } from '../services/commentService';

export const useComments = (companyId = null, currentPage = 1) => {
    const { data: res, isLoading, isFetching, error, refetch, } = useQuery({
        queryKey: ['comments', +companyId, currentPage],
        queryFn: () => getAllComments(companyId, currentPage),
        staleTime: 30 * 1000,
        refetchOnWindowFocus: true,
        enabled: companyId !== null,
        placeholderData: (previousData) => previousData, // thường dùng khi Paginate
    });

    return { res, isLoading, isFetching, error, refetch };
};
