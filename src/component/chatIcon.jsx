import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setMessagesCount, setSidebarState } from '../stores/slices/messagesSlice';

function CharIcon() {
    const { messages, newMessageCount, notifCState, sidebarState } = useSelector(state => state.messages);
    const messageIconHandler = (e) => {
        const sideBar = document.getElementById('task_window');
        if (sideBar !== null && sideBar !== undefined) {
            //When the sidebar is opened and the chat bar is open,
            //the notification on the chat bar is reset.
            if (notifCState) dispatch(setMessagesCount(0));
            dispatch(setSidebarState(!sidebarState));
        }
    }
    const dispatch = useDispatch();
    return (
        <ul className="nav float-end custom-menu" onClick={messageIconHandler}>
            <li className="nav-item">
                <a href="#task_window" id="task_chat" className="task-chat profile-rightbar float-end" data-bs-toggle="collapse">
                    <i className="fa fa-comments" />
                </a>
            </li>
            <li className='notification-count'>
                {/* If the sidebar is closed and there is a new unread message */}
                {(!sidebarState && newMessageCount > 0) ? newMessageCount : ''}
            </li>
        </ul>
    )
}

export default CharIcon
