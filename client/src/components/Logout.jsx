import React from "react";
import { createBrowserHistory as createHistory } from "history";

const LogoutButton = () => {
  const history = createHistory();

  const handleLogout = () => {
    console.log("Logout button clicked");
    // Perform logout logic (e.g. clear session, destroy token)

    // Redirect to homepage
    history.push("/Home");
  };
};

export default LogoutButton;


