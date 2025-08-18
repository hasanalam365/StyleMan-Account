import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes/Routes.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient()
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from '../src/provider/AuthProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
       <AuthProvider>
      <QueryClientProvider client={queryClient}>
   
          <RouterProvider router={router} />
          <ToastContainer></ToastContainer>
       
        </QueryClientProvider>
        </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
