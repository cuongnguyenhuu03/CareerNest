import axios from '../setup/axios';

const postCreateWorkExperience = (data) => {
    return axios.post('/workExperiences', { ...data });
}


export { postCreateWorkExperience };