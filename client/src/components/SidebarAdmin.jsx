import React, { useState } from 'react';
import '../App.css'
import { SidebarContentAdmin } from './SidebarContentAdmin';
import {FiLogOut} from 'react-icons/fi';

function SidebarAdmin() {
    const handleLogout = () => {
        localStorage.removeItem('user.token')
        localStorage.removeItem('user.user_id')
        window.location = "/"
    }

    const [activeIndex, setActiveIndex] = useState(-1);

    const handleSubMenuClick = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };
    
    return (
        <>
            <div className='Sidebar-container'>
                <h2 style={{ 
                            marginLeft: "22px",
                            marginTop: "30px",
                        
                        }}>BballPro</h2>
                <ul className="Sidebar-list">
                    {SidebarContentAdmin.map((item, index) => {
                    return (
                        <li
                            className="li-row"
                            key={index}
                            id={window.location.pathname === item.link ? "active" : ""}
                            onClick={() => {
                                if (item.subMenu) {
                                    handleSubMenuClick(index);
                                } else {
                                    window.location.href = item.link;
                                }
                            }}
                        >
                            <div id="icon">{item.icon}</div>
                            <div id="title">{item.title}</div>
                            {item.subMenu && activeIndex === index && (
                                <ul className="sub-menu">
                                    {item.subMenu.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <a href={subItem.link}>{subItem.title}</a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
                    <div className='row-logout' id='logout'>
                        <FiLogOut style={{
                            color: "red",
                            fontSize: "30px",
                            marginTop: "60px"
                        }}/>
                        <a href='#Home' id="button-logout" onClick={handleLogout}>Logout</a>
                    </div>
                </ul>
            </div>
        </>
    );
}

export default SidebarAdmin;