import React from "react";
import playStore from "../../../images/playstore.png";
import Appstore from "../../../images/Appstore.png";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id={"footer"}>
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download app form android as well as Mobile Phone</p>
        <img src={playStore} alt="playstore logo" />
        <img src={Appstore} alt="appstore logo" />
      </div>
      <div className="midFooter">
        <h1>Ecommerce</h1>
        <p>We Are Building On Your Belief</p>
      </div>
      <div className="rightFooter">
        <h4>Follow us</h4>
        <Link className="footer-link" to={"/"}>
          Instagram
        </Link>
        <Link className="footer-link" to={"/"}>
          YouTube
        </Link>
        <Link className="footer-link" to={"/"}>
          Facebook
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
