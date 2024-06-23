
import {useState} from "react";
import {Redirect} from "wouter";
import close from "@assets/icons/close.svg";
import { UpdateFeedbackIfExists } from "@services/ProductFeedback_service.jsx";

//Component to write feedback for a product and send it to Strapi
const Feedback = ({productId, user}) =>
{
    //State stores the date, a feedback was published, user and the text of the feedback
    const [Feedback, setFeedback] = useState({date: new Date(), user: user, text: null});
    //State to open/close modal
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    
    const SendFeedback = (e) => 
    {
        e.preventDefault();
        setFeedback(oldValue => ({...oldValue, text: document.querySelector(".rating").value}));    
    } 
    const OpenFeedback = () => 
    {
        {user!=='not logged in' && document.getElementById('my_modal_1').showModal();}
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
            {Feedback.text!==null &&
                <UpdateFeedbackIfExists Feedback={Feedback} productId={productId} />
            }
            
            <>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box p-[2rem] bg-[#F0EEEC] border-0">
                        <h1 className="text-black text-xl font-bold font-sans mb-8">{user}</h1>
                            
                            <form onSubmit={(e) => SendFeedback(e)} noValidate className="w-full flex flex-col">
                                <textarea rows="3" className="rating bg-[#F0EEEC] p-4 text-gray-500 rounded-xl resize-none"
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