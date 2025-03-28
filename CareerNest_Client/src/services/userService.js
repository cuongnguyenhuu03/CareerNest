import axios from '../setup/axios';

const postLogin = (data) => {
    return axios.post('/auth/login', { ...data });
}

const postRegister = (data) => {
    return axios.post('/auth/register', { ...data });
}

const postCreateNewUser = (data) => {
    return axios.post('/users', { ...data });
}

const postLogout = () => {
    return axios.post('/auth/logout');
}

const getAllUsers = () => {
    return axios.get(`/users`);
}

const getDetailUser = (id) => {
    return axios.get(`/users/${id}`);
}

const putUpdateUser = (data) => {
    return axios.put(`/users`, { ...data })
};

const deleteUser = (id) => {
    return axios.delete(`/users/${id}`);
}

export { postLogin, postRegister,postCreateNewUser, postLogout, getAllUsers, getDetailUser, putUpdateUser, deleteUser };