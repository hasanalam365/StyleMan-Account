import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout/MainLayout";

import DailyIncome from "../../Pages/DailyIncome";
import DailyExpense from "../../Pages/DailyExpense";
import Dashboard from "../../Pages/Dashboard";
import ErrorPage from "../../Pages/ErrorPage";
import MonthlyIncome from "../../Pages/MonthlyIncome";
import MonthlyExpense from "../../Pages/MonthlyExpense";
import UpdatedIncome from "../../components/UpdatedIncome";
import UpdatedExpense from "../../components/UpdatedExpense";
import UnpaidIncome from "../../Pages/UnpaidIncome";
import AllUnpaidIncome from "../../Pages/AllUnpaidIncome";
import PrivateRoute from "../PrivateRoute";
import Register from "../../Pages/Register";
import Login from "../../Pages/Login";
import UpdateUnpaid from "../../components/UpdateUnpaid";






export const router = createBrowserRouter([
    {
        path: "/",
        element:
            <MainLayout></MainLayout>
      ,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute> 
            },
            {
                path: '/dailyIncome',
                element:  <PrivateRoute><DailyIncome></DailyIncome></PrivateRoute> 
            },
            {
                path: '/dailyExpense',
                element:     <PrivateRoute> <DailyExpense></DailyExpense> </PrivateRoute> 
            },
            {
                path: '/monthlyIncome',
                element: <PrivateRoute> <MonthlyIncome></MonthlyIncome> </PrivateRoute>
            },
            {
                path: '/monthlyExpense',
                element: <PrivateRoute><MonthlyExpense></MonthlyExpense> </PrivateRoute>
            },
            {
                path: '/updatedIncome/:id',
                element: <PrivateRoute><UpdatedIncome></UpdatedIncome></PrivateRoute> 
            },
            {
                path: '/update-expense/:id',
                element: <PrivateRoute><UpdatedExpense></UpdatedExpense></PrivateRoute> 
            },
            {
                path: "/un-paid-income",
                element:<PrivateRoute><UnpaidIncome></UnpaidIncome></PrivateRoute> 
            },
            {
                path: "/all-unpaid-income",
                element:<PrivateRoute> <AllUnpaidIncome></AllUnpaidIncome></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            // {
            //     path: "/register",
            //     element: <Register></Register>
            // },
            {
                path: '/unPaid-Update/:id',
                element: <UpdateUnpaid></UpdateUnpaid>
            }
          

        ]
    },
  
]);