import axios from '../setup/axios';

const postCreateWorkExperience = (data) => {
    return axios.post('/workExperiences', { ...data });
}

const deleteWorkExperience = (id) => {
    return axios.delete(`/workExperiences/${id}`);
}

export { postCreateWorkExperience, deleteWorkExperience };