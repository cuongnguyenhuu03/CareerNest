import axios from '../setup/axios';

const postCreateNewSubscriber = (data) => {
    return axios.post('/subscribers', { ...data });
}

export { postCreateNewSubscriber };