import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Contact Us</h4>
        <p>serviceathome2000@gmail.com</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>InstantService</h1>
        <h3><p>"Your Requirments are our duties."</p></h3>

        <p>Copyrights 2021 &copy;InstantService</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="#">Instagram</a>
        <a href="#">Twitter</a>
        <a href="#">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
