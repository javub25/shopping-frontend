import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/*Custom hook to show friendly message, 
it will return showSuccessToast to show success message and showErrorToast 
to show error message*/
const useToastContainer = () => 
{
  const showSuccessToast = (message) => toast.success(message);
  const showErrorToast = (message) => toast.error(message);
  
  return {showSuccessToast, showErrorToast}
}
export default useToastContainer;