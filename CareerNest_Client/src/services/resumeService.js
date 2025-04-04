import axios from '../setup/axios';

const getAllResumes = (page = 1) => {
    if (page && page > 1)
        return axios.get(`/companies?page=${page}`);
    return axios.get(`/companies`);
};

const postCreateOnlineCV = (data) => {
    return axios.post('/online-resumes', { ...data });
}


export { postCreateOnlineCV };