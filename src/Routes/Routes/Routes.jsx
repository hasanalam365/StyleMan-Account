import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout/MainLayout";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import SearchDonors from "../../Pages/SearchDonors/SearchDonors";
import Fundings from "../../Pages/Fundings/Fundings/Fundings";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../../Layouts/Dashboard/Dashboard";
import Profile from "../../Pages/Dashboard/Profile/Profile";
import DonorDashboard from "../../Pages/Dashboard/DonorDashboard/DonorDashboard/DonorDashboard";
import CreateDonationRequest from "../../Pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import MyDonationRequest from "../../Pages/Dashboard/MyDonationRequest/MyDonationRequest";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/fundings',
                element: <PrivateRoute>
                    <Fundings></Fundings>
                </PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/searchDonors',
                element: <SearchDonors></SearchDonors>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <Dashboard></Dashboard>
        </PrivateRoute>,
        children: [
            {

                path: '/dashboard',
                element: <DonorDashboard></DonorDashboard>
            },
            {

                path: 'create-donation-request',
                element: <CreateDonationRequest></CreateDonationRequest>
            },
            {

                path: 'my-donation-requests',
                element: <MyDonationRequest></MyDonationRequest>
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            },
        ]

    }
]);