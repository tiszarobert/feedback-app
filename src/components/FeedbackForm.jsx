
import React, { useState, useContext, useEffect } from "react"
import Button from "./shared/Button";
import Card from "./shared/Card"
import RatingSelect from "./RatingSelect";
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm({handleAdd}) {
    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext);
    let [text, setText] = useState(""); 
    let [rating, setRating] = useState(10); 
    let [btnDisabled, setBtnDisabled] = useState(true); 
    let [message, setMessage] = useState(""); 

    useEffect(() => {
      if(feedbackEdit.edit === true){
        setBtnDisabled(false);
        setText(feedbackEdit.item.text);
        setRating(feedbackEdit.item.rating);
      }
    },[feedbackEdit])

    const handleTextChange = (e) => {
      text = text.trim();
      if(text === ""){
        setBtnDisabled(true);
        setMessage(null);
      }else if(text.length <= 10 && text !== ""){
        setBtnDisabled(true);
        setMessage("Must 10 character!");
      }else{
        setBtnDisabled(false);
        setMessage(null);
      } 
        setText(e.target.value);
    }
    const handleSubmit = (e) => {
      e.preventDefault();

      if(text.trim().length > 10){
        const newFeedback = {
          text,
          rating
        }
        if(feedbackEdit.edit === true){
          updateFeedback(feedbackEdit.item.id, newFeedback);
        }else{
          addFeedback(newFeedback);
        }
        setBtnDisabled(true)
        setText('');
        setRating(10);
      }

     
    }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={setRating} selected={rating}  />
        <div className="input-group">
            <input type="text" onChange={handleTextChange} placeholder="Write a review" value={text} />
            <Button type="submit" isDisabled={btnDisabled}>Send</Button>
        </div>
        {message && <div className="message">{message}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm