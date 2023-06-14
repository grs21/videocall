import React from 'react'

function navItem({href, state, navName}) {
    return (
        <li className="nav-item">
            <a className={`nav-link ${state}`} href={href}   data-bs-toggle="tab">{navName}</a>
        </li>
    )
}

export default navItem
