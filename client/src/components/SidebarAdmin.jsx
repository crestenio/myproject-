import React from 'react';
import '../App.css'
import { SidebarContentAdmin } from './SidebarContentAdmin';
import {FiLogOut} from 'react-icons/fi';


function SidebarAdmin () {
    const handleLogout = () => {
        localStorage.removeItem('user.token')
        localStorage.removeItem('user.user_id')
        window.location = "/"
    }
    
    return (
        <>
            <div className='Sidebar-container'>
                <ul className="Sidebar-list">
                    {SidebarContentAdmin.map((val, key) => { 
                    return (
                        <li className="li-row" key={key} id={window.location.pathname === val.link ? "active" : ""} 
                        onClick={() =>{window.location.pathname = val.link}}>

                            <div id="icon">{val.icon}</div><div id="title">{val.title}</div>
                        </li>
                    );
                })}
                <div className='row-logout' id='logout'>
                    <FiLogOut style={{ color: "red",
                                        fontSize: "30px",
                                        marginTop: "60px"
                                        }}/>
                    <a href='#Home' id="button-logout"  onClick={handleLogout}>Logout</a>
                    </div>
                </ul>
            </div>
        </>
    );
}

export default SidebarAdmin;