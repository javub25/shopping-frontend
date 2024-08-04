
import {useState, useContext, useRef} from "react";
import {Redirect} from "wouter";
import close from "@assets/icons/close.svg";
import { FeedbackContext } from "@contexts/FeedbackContext.jsx";
import { UpdateFeedback } from "@services/ProductFeedback_service.jsx";
import { CheckFeedback } from "@utilities/FormValidator.jsx";
import ToastMessage from "@utilities/ToastMessage.jsx";

//Component to write feedback for a product and send it to Strapi
const Feedback = ({productId, user}) =>
{
    //State stores the date, a feedback was published, user and the text of the feedback
    const {FeedbackData, setFeedbackData} = useContext(FeedbackContext);
    //State to open/close modal
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    //Refs to access feedback and modal value
    const FeedbackRef = useRef();
    const ModalRef = useRef();

    const SendFeedback = (e) => 
    {
        e.preventDefault();
        //We remove white spaces from start and end
        FeedbackRef.current.value = FeedbackRef.current.value.trim();
        const {showSuccessToast, showErrorToast} = ToastMessage();

        const FeedbackStatus = CheckFeedback(FeedbackRef.current.value);

        if(FeedbackStatus) {
            setFeedbackData(oldValue => ({...oldValue, user: user, text: FeedbackRef.current.value, added: oldValue.added+1}));   
            showSuccessToast("Thanks for your feedback 😊");
        } 
        else showErrorToast("Please write a valid feedback 🤯");
    } 
    const OpenFeedback = () => 
    {
        {user!=='not logged in' && ModalRef.current.showModal();}
        setIsFeedbackOpen(!isFeedbackOpen);
    }

    return (
        <>
            <button className="btn text-white font-sans font-normal bg-black border-0 hover:bg-white hover:text-black hover:border-2 hover:border-black" onClick={OpenFeedback}>Write your feedback</button>
            {/*If user tries to open feedback without being logged in, it will redirect to login*/}
            {isFeedbackOpen && 
                user === 'not logged in' && (
                    <Redirect to="/login" />
                )
            }
            {/*If Feedback has been written we will update the product  */}
            {FeedbackData.text!==null &&
                <UpdateFeedback Feedback={FeedbackData} productId={productId} />
            }
            
            <>
                <dialog id="my_modal_1" ref={ModalRef} className="modal">
                    <div className="modal-box p-[2rem] bg-[#F0EEEC] border-0">
                        <h1 className="text-black text-xl font-bold font-sans mb-8">{user}</h1>
                            
                            <form onSubmit={(e) => SendFeedback(e)} noValidate className="w-full flex flex-col">
                                <textarea rows="3" ref={FeedbackRef} className="bg-[#F0EEEC] p-4 text-gray-500 rounded-xl resize-none"
                                placeholder="Leave a message">
                                </textarea>
                                <button className="mx-auto w-[230px] py-3 my-8 text-md bg-[#ffc371] rounded-md text-black font-sans hover:text-black hover:bg-[#ffcf8d]">Comment now</button>
                            </form>
                            <div className="modal-action mt-0">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn" style={{backgroundColor: 'transparent', border: 'transparent', boxShadow: 'none'}}>
                                        <img src={close} className="w-6 h-6" />
                                    </button>
                                </form>
                            </div>
                        </div>
                </dialog>
            </>
        </>
    )
}
export default Feedback;