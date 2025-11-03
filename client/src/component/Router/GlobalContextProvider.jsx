import React from 'react';
import GlobalContext from './GlobalContext';


const GlobalContextProvider = ({children}) => {



  return (
    <GlobalContext.Provider>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
