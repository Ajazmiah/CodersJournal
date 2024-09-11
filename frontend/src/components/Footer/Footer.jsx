import React from "react";
import Logo from "../Logo/Logo";
import Styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={Styles.footer}>
      <div className={Styles.footerContent}>
        <Logo />

        <div className={Styles["footer-items"]}>
          <ul class="footer-column">
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Contact</li>
          </ul>

          <ul class="footer-column">
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
            <li>Security</li>
          </ul>

          <ul className={Styles["footer-column"]}>
            <li>Help Center</li>
            <li>FAQs</li>
            <li>Community Guidelines</li>
            <li>Support</li>
          </ul>
        </div>
      </div>
      <div className={Styles["footer-rights"]}>
        <p>&copy; 2024 CodersJournal. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
