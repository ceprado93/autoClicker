import { Routes, Route } from "react-router-dom";
import Game from "../pages/Game";
import Home from "../pages/Home";

const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/game/:user" element={<Game />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};

export default PageRoutes;
