import { format } from 'date-fns';

export const convertTimeStampToString = (timestamp, isShowTime = false) => {
    if (!timestamp) return '';
    try {
        const date = new Date(timestamp * 1000);
        return isShowTime ? format(date, 'dd/MM/yyyy HH:mm:ss') : format(date, 'dd/MM/yyyy');
    } catch (error) {
        console.error('Error converting timestamp:', error);
        return '';
    }
};
