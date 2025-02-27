import React from 'react';
import JobCard from '../../components/card/JobCard';

const SavedJob = ({ listJobs = [] }) => {
    return (
        <div className='w-full flex flex-col gap-y-6'>
            <JobCard className='shadow-md' isSaved />
            <JobCard className='shadow-md' isSaved isApplied />
            <JobCard className='shadow-md' isSaved />
        </div>
    );
};

export default React.memo(SavedJob);