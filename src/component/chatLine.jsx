import React from 'react'

function chatLine({ date }) {
    return (
        <div className="chat-line">
            <span className="chat-date">{date}</span>
        </div>
    )
}
chatLine.defaultProps = {
    date: 'default date',
}

export default chatLine
