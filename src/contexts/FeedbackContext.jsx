import {createContext, useState} from "react";
const FeedbackContext = createContext();

const FeedbackProvider = ({children}) => {
    const [FeedbackData, setFeedbackData] = useState({date: new Date(), user: undefined, text: null, added: 0})
    
    return (
        <FeedbackContext.Provider value={{FeedbackData, setFeedbackData}}>
            {children}
        </FeedbackContext.Provider>
    )
}
export {FeedbackProvider, FeedbackContext};
