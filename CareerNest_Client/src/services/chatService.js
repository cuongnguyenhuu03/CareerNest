import axios from '../setup/axiosChat';

const getUsersConnected = (id) => {
    return axios.get(`/users-connected?id=${id}`);
};

export { getUsersConnected };