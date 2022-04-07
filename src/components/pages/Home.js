import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pages.scss";

const Home = () => {
  const [userName, setUsernName] = useState(undefined);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const handleAction = () => {
    let url = "/game/" + userName;
    setAlert(false);
    console.log(window.location.pathname);

    userName ? navigate(url) : setAlert(true);
  };

  return (
    <>
      <section className="home">
        <h1>Auto clicker</h1>
        <p>Add your player's name</p>
        <input type="text" placeholder="User name" name="usernasme" onChange={(e) => setUsernName(e.target.value)} />
        {alert && <p className="alertText">* Add username</p>}
        <button onClick={() => handleAction()}>Join</button>
      </section>
    </>
  );
};

export default Home;
