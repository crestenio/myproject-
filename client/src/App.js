import './App.css';
import React,{ useState} from 'react';
import {useRoutes} from 'react-router-dom'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
 
} from "react-router-dom"

//import SignInOutContainer from './containers/index';
import Dashboard from './components/Dashboard';
import Events from './pages/Events';
import Teams from './pages/Teams';
//import Players from './pages/Players';
import Schedule from './pages/Schedule.jsx';
import Submission from './pages/Submission.jsx';
import Logout from './components/Logout';
import Sidebar from './components/Sidebar';
import Home from "./components/Home";
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './pages/Footer';
import Reports from './pages/Reports';
import AccountSettings from './pages/AccountSettings';



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
                <Navigate to='/Sidebar'/>
              ) } ></Route>
              <Route path='/Signup' element={!isAuthenticated ? (<Signup setAuth={setAuth}/> ): (
                <Navigate to='/Signup'/>
              ) } ></Route>
              <Route path='/Logout' element={!isAuthenticated ? (<Logout setAuth={setAuth}/> ): (
                <Navigate to='/Home'/>
              ) } ></Route>
              <Route path='/Footer' element={<Footer/>} /> 
              <Route path='/Dashboard' element={<Dashboard/>} /> 
              <Route path='/Sidebar' element={<Sidebar/>} /> 
              <Route path='/Events' element={<Events/>} />
              <Route path='/Teams' element={<Teams/>} />
             
              <Route path='/Schedule' element={<Schedule/>} />
              <Route path='/Submission' element={<Submission/>} /> 
              <Route path='/Reports' element={<Reports/>} /> 
              <Route path='/AccountSettings' element={<AccountSettings/>} /> 
            </Routes>
          </div>
        </Router>
      
    
    </div>
      
      
    </>
  );
}

export default App;

