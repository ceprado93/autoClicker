import { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import "./Pages.scss";
import coins from "../assets/coins.png";
import chatbot from "../assets/chatbot.png";

const Game = () => {
  const params = useParams();
  const [userName, setUserName] = useState(undefined);
  const [count, setCount] = useState(0);
  const [autoClickers, setAutoClickers] = useState(0);

  useLayoutEffect(() => {
    setUserName(params.user);
  }, [params]);

  useEffect(() => {
    let initialState = JSON.parse(localStorage.getItem(userName));
    initialState?.count && setCount(initialState.count);
    initialState?.autoClickers && setAutoClickers(initialState.autoClickers);
  }, [userName]);

  useInterval(
    () => {
      setCount(count + 1 * autoClickers);
    },
    autoClickers === 0 ? null : 100
  );

  useEffect(() => {
    localStorage.setItem(userName, JSON.stringify({ count, autoClickers }));
  }, [count, userName, autoClickers]);

  const handleScore = () => {
    setCount(count + 1);
  };
  const handleAutoCliker = () => {
    setAutoClickers(autoClickers + 1);
    autoClickers === 0 ? setCount(count - 40) : setCount(count - 40 * autoClickers);
  };

  return (
    <>
      <Link className="exitLink" to="/">
        Salir
      </Link>
      <section className="game">
        <div className="playerColumn">
          <div>🪖 {userName}</div>
          <div data-testid="counter-title">💰 {count} total coins</div>
          <div>🤖 {autoClickers} bot</div>
          <div className="instructionsDiv">
            1. Each time you click on the "add" button, you will earn 1 coins.<br></br>
            <br></br>2. When you reach enough coins, you will be able to buy one bot.<br></br>
            <br></br>3. The price for each bot will be proportional to the numer of bots you own.<br></br>
            <br></br>4. When you reach enough coins, you will be able to buy one bot.<br></br>
            <br></br>5. Each bot will earn you coins every 100ms.
          </div>
        </div>
        <div className="game_column">
          <div className="count_box">
            <img src={coins} alt="coins" />
            <button name="counter-add-button" className="countButton" onClick={() => handleScore()}>
              Add Coins
            </button>
          </div>
          <div className="auto_box">
            <img src={chatbot} alt="chatbot" />
            <button disabled={count >= 40 + 40 * autoClickers ? false : true} className={count < 40 + 40 * autoClickers ? "disabled" : ""} onClick={() => handleAutoCliker()}>
              Add Bot
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default Game;
