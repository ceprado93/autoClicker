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
  const [ranking, setRanking] = useState(undefined);
  const [seeRanking, setSeeRanking] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    setUserName(params.user);
  }, [params]);

  useEffect(() => {
    let initialState = JSON.parse(localStorage.getItem(userName));
    initialState?.count && setCount(initialState.count);
    initialState?.autoClickers && setAutoClickers(initialState.autoClickers);
  }, [userName]);

  useEffect(() => {
    let values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      let key = keys[i];
      key != "undefined" && values.push({ [key]: JSON.parse(localStorage.getItem(key)).count });
    }
    values.sort((a, b) => parseFloat(Object.values(b)[0]) - parseFloat(Object.values(a)[0]));
    setRanking(values);
  }, [count]);

  useInterval(
    () => {
      setCount(count + 1 * autoClickers);
    },
    autoClickers === 0 ? null : 100
  );

  useEffect(() => {
    localStorage.setItem(userName, JSON.stringify({ count, autoClickers }));
  }, [count, userName, autoClickers]);

  const handleRanking = () => {
    seeRanking ? setSeeRanking(false) : setSeeRanking(true);
  };

  const handleScore = () => {
    setCount(count + 1);
  };
  const handleAutoCliker = () => {
    setAutoClickers(autoClickers + 1);
    autoClickers === 0 ? setCount(count - 40) : setCount(count - 40 * autoClickers);
  };

  return (
    <>
      <Link className="exitLink" to="/autoClicker">
        Exit
      </Link>
      <section className="game">
        <div className="playerColumn">
          <div>🕵️ {userName}</div>
          <div data-testid="counter-title">💰 {count} total coins</div>
          <div>🤖 {autoClickers} bot</div>
          <div className="instructionsDiv">
            1. Each time you click on the "Add Coins" button, you will earn 1 coins.<br></br>
            <br></br>2. When you reach enough coins, 40, you will be able to buy one bot.<br></br>
            <br></br>3. The price for each bot will be proportional to the numer of bots you own.<br></br>
            <br></br>4. Each bot will earn you coins every 100ms.
          </div>
          <div className="ranking" onClick={() => handleRanking()}>
            See ranking v
            {seeRanking &&
              ranking?.map((elm, idx) => (
                <article key={idx}>
                  <p>{idx + 1 > 3 ? idx + 1 : idx + 1 === 1 ? "🥇" : idx + 1 === 2 ? "🥈" : "🥉"}</p>
                  <p>{Object.keys(elm)[0]}</p>
                  <p>{Object.values(elm)[0]}</p>
                </article>
              ))}
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
