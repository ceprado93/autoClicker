import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Pages.scss";

const Home = () => {
  const [userName, setUsernName] = useState(undefined);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      document.body.style.zoom = "100%";
    };
  }, []);

  const handleAction = () => {
    let url = "/game/" + userName;
    userName ? navigate(url) : setAlert(true);
  };

  return (
    <>
      <section className="home">
        <h1>Auto clicker</h1>
        <p>Add your player's name below to get started.</p>
        <input type="text" placeholder="User name" name="usernasme" onChange={(e) => setUsernName(e.target.value)} />
        {alert && <p className="alertText">* Add username</p>}
        <button onClick={() => handleAction()}>Start</button>
      </section>
    </>
  );
};

export default Home;
