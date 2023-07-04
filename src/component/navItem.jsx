import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setMessagesCount, setNotifCState } from '../stores/slices/messagesSlice';
import { chatScroll } from '../helper/videoCallHelper';

function NavItem({ href, state, navName }) {
    const dispatch = useDispatch();
    const { messages, newMessageCount, notifCState, sidebarState } = useSelector(state => state.messages);
    const handleNavClick = (e) => {
        e.preventDefault();
        if (e.target.href.includes('chats_tab')) {
            dispatch(setNotifCState(true))
            dispatch(setMessagesCount(0));
            chatScroll();
        } else {
            console.log(notifCState);
            console.log(sidebarState);
            dispatch(setNotifCState(false))
        }
    }
    return (
        <li className="nav-item  float-end custom-menu">
            <a className={`nav-link ${state}`} href={href} data-bs-toggle="tab" onClick={handleNavClick}>{navName}</a>
            {
                navName === 'Chats' ? (!notifCState && newMessageCount > 0) ? <div className='custom-notification-count' >{newMessageCount}</div> : '' : ''
            }
        </li>
    )
}

export default NavItem
