import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import GlobalContextProvider from './component/Router/GlobalContextProvider.jsx';
import router from './component/Router/router.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import { store } from './store';


function App(){
  return <RouterProvider router={router} />
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalContextProvider>
      <Provider store={store}>
    <App />
    </Provider>
    </GlobalContextProvider>
  </StrictMode>,
)
