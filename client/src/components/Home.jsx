import React from 'react';
import Navbar from './Navbar';
import Footer from '../pages/Footer';
const Home = () => {
    return(
        <>
            <Navbar/>
            <div className="header-content">
            
                <h1>Sportsmatch</h1>
                <h2>“Manage your teams and events like a pro”</h2>
                <p>
                    A basketball management system <br/>that allows for the efficient organization <br/>and management of basketball events, teams, and schedules.<br/> This system streamlines the process of creating and managing events,<br/> assigning teams to games, submitting and reviewing team rosters.

                </p>
                <a href='Signup'><button  className="header-btn"
                    >Sign Up 
                </button></a>
                
            </div>
            <Footer/>
        </>
    )
}
export default Home;