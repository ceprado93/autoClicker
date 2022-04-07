import { Link } from "react-router-dom";
import "./Layout.scss";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="leftDiv"></div>
        <div className="centerDiv">
          <Link to="/">
            <img src="https://www.bbvanexttechnologies.com/wp-content/themes/bbva/images/logo.png" alt="logo" />
          </Link>
          <p>© BBVA Next Technologies - 2022</p>
        </div>
        <div className="rightDiv"></div>
      </footer>
    </>
  );
};

export default Footer;
