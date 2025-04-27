import axios from '../setup/axios';

const getAllResumesByUser = () => {
    return axios.get(`/online-resumes-user`);
};

const getMainResumeUpload = (fileName = '', folder = '') => {
    return axios.get(`/files`, {
        params: { fileName, folder },
        responseType: 'blob'  // 👈 Giúp axios trả về file dưới dạng blob
    });
};

const postCreateOnlineCV = (data) => {
    return axios.post('/online-resumes', { ...data });
}

const deleteOnlResume = (id) => {
    return axios.delete(`/online-resumes/${id}`);
}


export { getAllResumesByUser, getMainResumeUpload, postCreateOnlineCV, deleteOnlResume };