import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout/MainLayout";

import DailyIncome from "../../Pages/DailyIncome";
import DailyExpense from "../../Pages/DailyExpense";
import Dashboard from "../../Pages/Dashboard";
import ErrorPage from "../../Pages/ErrorPage";
import MonthlyIncome from "../../Pages/MonthlyIncome";
import MonthlyExpense from "../../Pages/MonthlyExpense";






export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dailyIncome',
                element: <DailyIncome></DailyIncome>
            },
            {
                path: '/dailyExpense',
                element: <DailyExpense></DailyExpense>
            },
            {
                path: '/monthlyIncome',
                element: <MonthlyIncome></MonthlyIncome>
            },
            {
                path: '/monthlyExpense',
                element: <MonthlyExpense></MonthlyExpense>
            }
          

        ]
    },
  
]);