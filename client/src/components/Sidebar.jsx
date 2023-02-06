import React from 'react';
import '../App.css'
import { SidebarContent } from '../pages/SidebarContent';

function Sidebar () {
    return (
        <>
            <div className='Sidebar-container'>
                <ul className="Sidebar-list">
                    {SidebarContent.map((val, key) => { 
                    return (
                        <li className="li-row" key={key} id={window.location.pathname === val.link ? "active" : ""} 
                        onClick={() =>{window.location.pathname = val.link}}>

                            <div id="icon">{val.icon}</div><div id="title">{val.title}</div>
                        </li>
                    );
                })}
                </ul>
            </div>
        </>
    );
}

export default Sidebar;