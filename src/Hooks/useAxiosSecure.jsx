import axios from "axios"
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
    baseURL: 'https://reddrop-bdserver.vercel.app'
})

const useAxiosSecure = () => {

    const navigate = useNavigate()
    const { signOutUser } = useAuth()

    axiosSecure.interceptors.request.use(function (config) {
        // Do something before request is sent
        const token = localStorage.getItem('access-token')
        //  ('request stopped by interceptors', token)

        config.headers.authorization = `Bearer ${token}`

        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });


    axiosSecure.interceptors.response.use(function (response) {

        return response;
    }, async (error) => {

        //  ('error status in the interceptor', error.response.status)

        //for 401 or 403 logout the user and move the user to the login page
        if (error.response.status === 401 || error.response.status === 403) {
            // await signOutUser()
            navigate('/')
        }
        return Promise.reject(error);
    });

    return axiosSecure
}

export default useAxiosSecure