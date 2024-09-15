import React from "react";
import Logo from "../Logo/Logo";
import Styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={Styles.footer}>
      <div className={Styles.footerContent}>
        <Logo />

        <div className={Styles["footer-items"]}>
          Developed by: <a href="https://ajazmiah.info/">Ajaz Miah</a>
        </div>
      </div>
      <div className={Styles["footer-rights"]}>
        <p>&copy; 2024 CodersJournal. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
