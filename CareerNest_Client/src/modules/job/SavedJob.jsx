import React from 'react';
import JobCard from '../../components/card/JobCard';

const SavedJob = ({ listJobs = [] }) => {

    if (listJobs.length <= 0) return null;
    return (
        <div className='w-full flex flex-col gap-y-6 overflow-y-auto h-[calc(100vh-200px)]'>
            {/* <JobCard className='shadow-md' isSaved isApplied /> */}
            {listJobs.map(job => (
                <JobCard key={job?.id} data={job} className='shadow-md' isSaved />
            ))}
        </div>
    );
};

export default React.memo(SavedJob);