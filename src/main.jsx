import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'flowbite'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AuthContextProvider from './components/Context/AuthContext.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
 <AuthContextProvider>
   <StrictMode>
    <App />
  </StrictMode>
 </AuthContextProvider>,
)
