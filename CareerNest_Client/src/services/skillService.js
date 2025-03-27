import axios from '../setup/axios';

const getAllSkills = () => {
    return axios.get(`/skills`);
};

export { getAllSkills };