import axios from '../setup/axios';

const getAllRecruitment = () => {
    return axios.get(`/companies`);
}

const getDetailRecruitment = (id) => {
    return axios.get(`/companies/${id}`);

}

export { getAllRecruitment, getDetailRecruitment };