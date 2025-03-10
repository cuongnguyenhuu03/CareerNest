import axios from '../setup/axios';

const postLogin = (data) => {
    return axios.post('/auth/login', { ...data });
}

const postRegister = (data) => {
    return axios.post('/auth/register', { ...data });
}

const postLogout = () => {
    return axios.post('/logout');
}

const getAllUsers = () => {
    return axios.get(`/users`);
}

const getDetailUser = (id) => {
    return axios.get(`/users/${id}`);
}

const putUpdateUser = (data) => {
    return axios.put(`/users/update`, { ...data })
};

const deleteUser = (userId) => {
    return axios.delete(`/users/delete`, { data: { id: userId } })
};

export { postLogin, postRegister, postLogout, getAllUsers, getDetailUser, putUpdateUser, deleteUser };