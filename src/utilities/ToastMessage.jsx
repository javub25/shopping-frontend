import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/*Showing friendly message, 
it will return showSuccessToast to show success message and showErrorToast 
to show error message*/
const ToastMessage = () => 
{
  const showSuccessToast = (message) => toast.success(message);
  const showErrorToast = (message) => toast.error(message);
  
  return {showSuccessToast, showErrorToast}
}
export default ToastMessage;