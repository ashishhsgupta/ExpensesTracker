import React from 'react';
import {SnackbarProvider} from "notistack";
import GlobalContextProvider from '../Router/GlobalContextProvider';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const DefaultLayout = () => {

  return (
    <>
    <SnackbarProvider hideIconVariant autoHideVariant={2000}>
      <GlobalContextProvider>
        <Header />
        <Outlet />
        <Footer />
      </GlobalContextProvider>

    </SnackbarProvider>
    </>
  )
}

export default DefaultLayout
