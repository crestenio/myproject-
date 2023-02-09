import React from "react";
import { createBrowserHistory as createHistory } from "history";

const LogoutButton = () => {
  const history = createHistory();

  const handleLogout = () => {
    console.log("Logout button clicked");
    // Perform logout logic (e.g. clear session, destroy token)
        localStorage.removeItem('user.token')
        localStorage.removeItem('user.user_id')
        window.location = "/"

    // Redirect to homepage
    history.push("/Home");
  };
  return (
    <>
        {/* <button className="btn btn-primary" onClick={handleLogout}> Log Out</button> */}
    </>
  )
};

export default LogoutButton;


