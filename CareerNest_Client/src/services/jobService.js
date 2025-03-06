import axios from '../setup/axios';

const getAllJobs = () => {
    return axios.get(`/jobs`);
}

const getDetailJob = (id) => {
    return axios.get(`/jobs/${id}`);
}

const getJobsByCompany = (companyId) => {
    return axios.get(`/jobs/company/${companyId}`);

}

export { getAllJobs, getDetailJob, getJobsByCompany };