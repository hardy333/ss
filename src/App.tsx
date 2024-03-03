import "./App.css";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import History from "./pages/history/History";
import { Route, Routes } from "react-router-dom";
import ImagesContextProvider from "./context/ImagesContext";
import Modal from "./components/Modal.tsx";
import ModalContextProvider from "./context/ModalContext.tsx";

function App() {
  return (
    <>
      <Navbar />
      <ModalContextProvider>
        <ImagesContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
          </Routes>
          <Modal />
        </ImagesContextProvider>
      </ModalContextProvider>
    </>
  );
}

export default App;
