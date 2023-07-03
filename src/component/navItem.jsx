import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, initializeMessages, setMessagesCount, setNotifCState } from '../stores/slices/messagesSlice';

function NavItem({href, state, navName}) {
    const dispatch = useDispatch();
    const { messages, newMessageCount, notifCState } = useSelector(state => state.messages);
    const handleNavClick = (e)=>{
        e.preventDefault();
        if (e.target.href.includes('chats_tab')) {
            dispatch(setNotifCState(!notifCState))
            dispatch(setMessagesCount(0));
        }
    }
    return (
        <li className="nav-item">
            <a className={`nav-link ${state}`} href={href} data-bs-toggle="tab"  onClick = {handleNavClick}>{navName}</a>
        </li>
    )
}

export default NavItem
