import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import History from "./pages/History";
import { Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/contact" element={<Contact/>}></Route>
      </Routes>
    </>
  );
}

export default App;
