import Axios from 'axios';

const axiosBaseURL = Axios.create({
    baseURL: 'http://localhost:5000/'
});

export const getUnSplash = async () => {
    try {
        let res = await axiosBaseURL.get('/getUnSplash');
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const addUnSplash = async (label, url) => {
    try {
        let dataObj = {
            label,
            url,
        }
        let res = await axiosBaseURL.post('/addUnSplash', dataObj);
        console.log(res.data.msg);
    } catch (error) {
        window.alert('Something went wrong, Please try again')
        console.log(error);
    }
}

export const deleteUnSplash = async (id) => {
    try {
        let res = await axiosBaseURL.delete(`/deleteUnSplash/${id}`);
        console.log(res.data.msg);
    } catch (error) {
        window.alert('Something went wrong, Please try again')
        console.log(error);
    }
}

export default axiosBaseURL