import axios from "axios"

export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {

    axiosSecure.interceptors.request.use(function (config) {
        // Do something before request is sent
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)

        config.headers.authorization = `Bearer ${token}`

        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    //intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {

        return response;
    }, (error) => {

        console.log('error status in the interceptor', error.response.status)
        return Promise.reject(error);
    });

    return axiosSecure
}

export default useAxiosSecure