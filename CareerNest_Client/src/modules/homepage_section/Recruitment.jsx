import React from 'react';
import JobCard from '../../components/card/JobCard';
import { getAllJobs } from '../../services/jobService';
import _ from 'lodash';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Button } from 'flowbite-react';
import withErrorBoundary from '../../hoc/withErrorBoundary';
import JobCardSkeleton from '../../components/skeleton/JobCardSkeleton';

const Recruitment = () => {
    const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['jobs'],
        queryFn: ({ pageParam = 1 }) => getAllJobs(pageParam),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.result?.length === 6)
                return allPages.length + 1;
            return undefined;
        },
        staleTime: 10 * 1000,
        refetchOnWindowFocus: true,
    });

    const listJobs = _.orderBy(data?.pages?.flatMap(page => page.result) ?? [], ['createdAt'], ['desc']);

    if (listJobs.length <= 0) return null;
    if (isLoading)
        return (
            <div className='ct-container mt-20'>
                <div className='w-full border border-gray-300 rounded-lg sm:border-none sm:w-full flex flex-nowrap overflow-x-auto sm:grid sm:grid-cols-2 xl:grid-cols-3 xs:gap-4 xl:gap-8'>
                    <JobCardSkeleton />   <JobCardSkeleton />   <JobCardSkeleton />
                </div>
            </div>
        );
    return (
        <div className='ct-container py-10 bg-[#f7f7f7] flex flex-col items-center dark:bg-gray-800'>
            <h1 className='text-base sm:text-lg xs:text-xl mb-10 text-slate-800 font-bold uppercase dark:text-white'>Tin tuyển dụng mới nhất</h1>
            <div className='w-full xs:w-2/3 border border-gray-300 rounded-lg sm:border-none sm:w-full flex flex-nowrap overflow-x-auto sm:grid sm:grid-cols-2 xl:grid-cols-3 xs:gap-4 xl:gap-8'>
                {listJobs.length > 0 && listJobs.map(item => (
                    <JobCard key={item?.id} data={item} className="min-w-full sm:min-w-0 dark:text-white" />

                ))}
            </div>
            {hasNextPage && (
                <div className='flex items-center justify-center mt-8'>
                    {listJobs?.length < 12 ?
                        <Button isProcessing={isFetchingNextPage} color='light' onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                            {isFetchingNextPage ? 'Đang tải...' : 'Xem thêm'}
                        </Button>
                        :
                        <Button isProcessing={isFetchingNextPage} color='light' onClick={() => fetchNextPage()}>
                            {isFetchingNextPage ? 'Đang tải...' : 'Xem các công việc khác'}
                        </Button>
                    }

                </div>
            )}
        </div>
    );
};

export default withErrorBoundary(Recruitment);
