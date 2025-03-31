import axios from '../setup/axios';

const getAllJobs = (page) => {
    if (page && page > 1)
        return axios.get(`/jobs?page=${page}`);
    return axios.get('/jobs');
}

const getDetailJob = (id) => {
    return axios.get(`/jobs/${id}`);
}

const getJobsByCompany = (companyId) => {
    return axios.get(`/jobs/company/${companyId}`);
}

const postCreateNewJob = (data) => {
    return axios.post('/jobs', { ...data });
}

const putUpdateJob = (data) => {
    return axios.put('/jobs', { ...data });
}

const deleteJob = (id) => {
    return axios.delete(`/jobs/${id}`);
}

export { getAllJobs, getDetailJob, getJobsByCompany, postCreateNewJob, putUpdateJob, deleteJob };