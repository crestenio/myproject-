import React from "react";


import { FaDiscord, FaSlack, FaFacebookMessenger} from "react-icons/fa";

const Footer = () => {
  return (
    <>

      {/* footer section  */}

      <footer>
        <div className="footer-container">
          <div className="footer-about">
            <h3>Technical Problem?</h3>
            <p>Don't hesitate to contact us.</p>
          </div>

          {/* 2nd column */}
          <div className="footer-subscribe">
            <h3>Subscribe to Us</h3>
            <p>To get more updates</p>
            <form action="#">
              <input className="input-subscribe"
                type="email"
                required
                placeholder="Email"
              />
              <input className="submit-subscribe" type="submit" value="Subscribe" />
            </form>
          </div>

          {/* 3rs column  */}
          <div className="footer-social">
            <h3>Message Us</h3>
            <div className="footer-social--icons">
              <div className="discord-icons">
                <FaDiscord  />
              </div>
              <div className="slack-icons">
                <FaSlack  />
              </div>
              <div className="messenger-icons">
                  <FaFacebookMessenger /> 
              </div>
            </div>
          </div>

          {/* 4th column  */}
          <div className="footer-contact">
             
            <h3>Phone</h3>
            <p>+63 9206123830</p>
            
            <h3>Support Email</h3>
            <p>support@sportsmatch.ph</p>
          </div>
        </div>

        {/* bottom section  */}
        <div className="footer-bottom">
          <hr />
          <div className="footer-bottom-section">
            <p>
               Sportsmatch @{new Date().getFullYear()} || All Rights Reserved
            </p>
            <div>
              <p> PRIVACY POLICY</p>
              <p> TERMS & CONDITIONS</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};



export default Footer;