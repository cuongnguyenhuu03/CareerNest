import axios from '../setup/axios';

const postLogin = (data) => {
    return axios.post('/auth/login', { ...data });
}

const postCreateOnlineCV = (data) => {
    return axios.post('/online-resumes', { ...data });
}

export { postCreateOnlineCV };