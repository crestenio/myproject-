import './App.css';
import React,{ useState} from 'react';
import {useRoutes} from 'react-router-dom'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
 
} from "react-router-dom"

import AdminDash from './dashboard/AdminDash';
//import UserDash from './dashboard/UserDash';
import Events from './crud/admin/Events';
import Teams from './crud/admin/Teams';
import Players from './crud/admin/Players';
import Schedule from './crud/admin/Schedule';
import Submission from './crud/admin/Submission';
import Logout from './components/Logout';
import SidebarAdmin from './components/SidebarAdmin';
import SidebarUser from './components/SidebarUser';
import Home from "./pages/Home";
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './pages/Footer';
import FAQ from './pages/FAQ';
import Reports from './crud/admin/Reports';
import AccountSettings from './components/AccountSettings';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = boolean => {

    setIsAuthenticated(boolean)

  }
//authenticated ? renderApp() : renderLogin();
 
  //console.log("Added a new feature")
  return (
    //router to redirect and check authentication
    <>  
    
     <div className="App">
    
      <Router>
        
        <Routes>
          
          <Route path='/' element={<Home/>} />
          <Route path='/Home' element={<Home/>} />
        </Routes>
          <div>
            <Routes>
            
              <Route path='/Login' element={!isAuthenticated ? (<Login setAuth={setAuth}/> ): (
                <Navigate to='/Dashboard'/>
              ) } ></Route>
              <Route path='/Signup' element={!isAuthenticated ? (<Signup setAuth={setAuth}/> ): (
                <Navigate to='/Signup'/>
              ) } ></Route>
              <Route path='/Logout' element={!isAuthenticated ? (<Logout setAuth={setAuth}/> ): (
                <Navigate to='/Home'/>
              ) } ></Route>
              <Route path='/Footer' element={<Footer/>} /> 
              <Route path='/AdminDash' element={<AdminDash/>} /> 
              <Route path='/SidebarAdmin' element={<SidebarAdmin/>} /> 
              <Route path='/Events' element={<Events/>} />
              <Route path='/Teams' element={<Teams/>} />
              <Route path='/Players' element={<Players/>} />
              <Route path='/Schedule' element={<Schedule/>} />
              <Route path='/Submission' element={<Submission/>} /> 
              <Route path='/Reports' element={<Reports/>} /> 
              <Route path='/AccountSettings' element={<AccountSettings/>} /> 
              <Route path='/FAQ' element={<FAQ/>} /> 
            </Routes>
          </div>
        </Router>
      
    
    </div>
      
      
    </>
  );
}

export default App;

