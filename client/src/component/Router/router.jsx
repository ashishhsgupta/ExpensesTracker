import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import DefaultLayout from '../CustomPage/DefaultLayout';
import { DASHBOARD_PATH, VIEWTRANSACTION_PATH, HOME_PATH, REPORT_PATH, SAVING_PATH, TRANSACTION_PATH } from './router_constant';
import Home from '../Header/Home.jsx';
import Dashboard from '../Header/Dashboard';
import Report from '../Pages/Report.jsx';
import Saving from '../Pages/Saving.jsx';
import Transaction from '../Pages/Transaction.jsx';
import ViewTransaction from '../Pages/ViewTransaction.jsx';


const router = createBrowserRouter([

    {
        path:'/',
        element: <DefaultLayout />,
        children:[
            {
              index:true,
              element:<Navigate to={DASHBOARD_PATH} replace />
            },
            {
                path:HOME_PATH,
                element:<Home />
            },
            {
                path:DASHBOARD_PATH,
                element:<Dashboard />
            },
            {
                path:TRANSACTION_PATH,
                element:<Transaction />
            },
            {
                path:VIEWTRANSACTION_PATH,
                element:<ViewTransaction />
            },
            {
                path: REPORT_PATH,
                element:<Report />
            },
            {
                path: SAVING_PATH,
                element:<Saving />
            }
        ]
    }
])

export default router;