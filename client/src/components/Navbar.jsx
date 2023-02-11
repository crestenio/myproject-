import React from 'react';
//import logo from './images/logo';
const Navbar = () => {
    return(
        <>

            <nav className="navbar">
                <a><h1>Sportsmatch.</h1></a>
                <div>
                    <ul>
    
                        <li><a href='Home'>Home</a></li>
                        <li><a href='Footer'>Support</a></li>
                        <li><a href='Footer'>Contact</a></li>
                            <a href='Login'><button className='btn-sign' >Sign In</button></a>
                    </ul>
                 
                </div>
            </nav>
            
        </>
    )
}
export default Navbar;






