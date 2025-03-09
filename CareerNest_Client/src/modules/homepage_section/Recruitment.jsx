import React from 'react';
import JobCard from '../../components/card/JobCard';
import { getAllJobs } from '../../services/jobService';
import _ from 'lodash';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Button } from 'flowbite-react';
import withErrorBoundary from '../../hoc/withErrorBoundary';

const Recruitment = () => {
    const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['jobs'],
        queryFn: ({ pageParam = 1 }) => getAllJobs(pageParam),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage?.result?.length === 3)
                return allPages.length + 1;
            return undefined;
        },
        refetchOnWindowFocus: false,
    });

    const listJobs = _.orderBy(data?.pages?.flatMap(page => page.result) ?? [], ['createdAt'], ['desc']);

    if (listJobs.length <= 0) return null;
    if (isLoading)
        return (
            <div className='ct-container flex flex-col gap-8 mt-20'>
                <div role="status" className="w-full animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    return (
        <div className='ct-container py-10 bg-[#f7f7f7] flex flex-col items-center'>
            <h1 className='text-lg xs:text-2xl mb-10 text-slate-800 font-bold uppercase'>Tin tuyển dụng mới nhất</h1>
            <div className='w-full xs:w-2/3 border border-gray-300 rounded-lg sm:border-none sm:w-full flex flex-nowrap overflow-x-auto sm:grid sm:grid-cols-2 xl:grid-cols-3 xs:gap-4 xl:gap-8'>
                {listJobs.length > 0 && listJobs.map(item => (
                    <JobCard key={item?.id} data={item} className="min-w-full sm:min-w-0" />
                ))}
            </div>
            {hasNextPage && (
                <div className='flex items-center justify-center mt-8'>
                    <Button isProcessing={isFetchingNextPage} color='light' onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                        {isFetchingNextPage ? 'Đang tải...' : 'Xem thêm'}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default withErrorBoundary(Recruitment);
