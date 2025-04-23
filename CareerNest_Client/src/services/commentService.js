import axios from '../setup/axios';

const getAllComments = (companyId,currentPage) => {
    return axios.get(`/comments?page=${currentPage}`);
}
const postWriteComment = (data) => {
    return axios.post('/comments', { ...data });
}

export { getAllComments, postWriteComment };