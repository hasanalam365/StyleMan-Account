import axios from "axios"
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {

    const navigate = useNavigate()
    const { signOutUser } = useAuth()

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
    }, async (error) => {

        console.log('error status in the interceptor', error.response.status)
        if (error.response.status === 401 || error.response.status === 403) {
            await signOutUser()
            navigate('/login')
        }
        return Promise.reject(error);
    });

    return axiosSecure
}

export default useAxiosSecure