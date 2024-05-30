
import useToastContainer from "@hooks/useToastContainer.jsx";
import { ToastContainer } from 'react-toastify';

//Provider to render globally ToastContainer message in all aplication
const ToastProvider = ({ children }) => 
    {
        useToastContainer();
            return (
                <>
                    {children}
                    <ToastContainer
                        position='top-right'
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme='light'
                    />
                </>
            );
    }
    export default ToastProvider;