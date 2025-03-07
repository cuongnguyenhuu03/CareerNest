import axios from '../setup/axios';

const getAllJobs = (page) => {
    if (page && page > 1)
        return axios.get(`/jobs?page=${page}`);
    return axios.get('/jobs?page=1');
}

const getDetailJob = (id) => {
    return axios.get(`/jobs/${id}`);
}

const getJobsByCompany = (companyId) => {
    return axios.get(`/jobs/company/${companyId}`);

}

export { getAllJobs, getDetailJob, getJobsByCompany };