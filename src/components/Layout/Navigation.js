import { Link } from "react-router-dom";
import "./Layout.scss";
const Navigation = () => {
  return (
    <>
      <div className="navigation">
        <Link className="logoLink" to="/autoClicker">
          <img src="https://www.bbvanexttechnologies.com/wp-content/themes/bbva/images/logo.png" alt="logo" />
        </Link>
      </div>
    </>
  );
};

export default Navigation;
