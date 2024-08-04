
import { useContext, useState } from "react";
import Avatar from "@components/User/Avatar.jsx";
import useStoreFeedback from "@hooks/useStoreFeedback.jsx";
import { FeedbackContext } from "@contexts/FeedbackContext.jsx";


const ShowFeedback = ({productId}) => 
{
  const { FeedbackData, } = useContext(FeedbackContext);
  const [FeedbackMsg, setFeedbackMsg] = useState([]);


  useStoreFeedback(FeedbackData, setFeedbackMsg, productId);
  
  if(FeedbackMsg!=null && FeedbackMsg.length > 0)
  {
    return(
        <div className="mb-12 rounded-md border-2 border-grey-800 py-12 px-4 max-w-sm mx-auto overflow-auto">
            <div className="h-40 mobile:h-64 carousel carousel-vertical rounded-box overflow-visible">
              {
                FeedbackMsg.map((item, i) => {
                    return ( 
                        <div className="block carousel-item h-full" key={i}>
                            <div className="flex w-[130px] mr-auto">
                                <Avatar user={item.user} />
                              <h1 className="text-black font-sans">{item.user}</h1>
                            </div>
                              <h2 className="text-black mt-4 text-left font-sans">{item.feedbackDate}</h2>
                              <h3 className="text-black text-left font-sans">{item.comment}</h3>
                        </div>
                    )
                  }
                )
              }
            </div>
        </div>
    )
  }  
}
export default ShowFeedback;