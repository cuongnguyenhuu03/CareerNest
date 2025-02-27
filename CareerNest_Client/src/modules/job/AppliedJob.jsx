import React from 'react';
import JobCard from '../../components/card/JobCard';

const AppliedJob = ({ listJobs = [] }) => {

    return (
        <div className='w-full flex flex-col gap-y-6'>
            <JobCard className='shadow-md' isApplied />
            <JobCard className='shadow-md' isApplied />
            <JobCard className='shadow-md' isApplied />
        </div>
    );
};

export default React.memo(AppliedJob);