import axios from '../setup/axios';

const postCreateOnlineCV = (data) => {
    return axios.post('/online-resumes', { ...data });
}

export { postCreateOnlineCV };