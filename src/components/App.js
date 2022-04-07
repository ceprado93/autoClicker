import "./App.scss";
import Navigation from "./Layout/Navigation";
import Footer from "./Layout/Footer";
import PageRoutes from "./routes/Routes";

function App() {
  return (
    <>
      <Navigation />
      <main>
        <PageRoutes />
      </main>
      <Footer />
    </>
  );
}

export default App;
