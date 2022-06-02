import React from "react"
import { useContext } from "react"
import { FaTimes, FaEdit } from "react-icons/fa"
import Card from "./shared/Card"
import PropTypes from "prop-types"
import FeedbackContext from '../context/FeedbackContext'


function FeedbackItem({ item }) {
    const { deleteFeedback, editFeedback } = useContext(FeedbackContext);

    return (
        <Card>
            <button className="edit" onClick={() => editFeedback(item)}>
                <FaEdit color="purple" />
            </button>
            <div className="num-display">{item.rating}</div>
            <button className="close" onClick={() => deleteFeedback(item.id)}>
                <FaTimes color="purple" />
            </button>

            <div className="text-display">
                {item.text}
            </div>
        </Card>
    )
}
FeedbackItem.protoTypes = {
    item: PropTypes.object.isRequired,
}
export default FeedbackItem