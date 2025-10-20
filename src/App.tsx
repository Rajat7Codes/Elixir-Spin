import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RandomizerPage from "./pages/RandomizerPage";
import Navbar from "./layout/Navbar";
import SlotMachinePage from "./pages/SlotMachinePage";
import SpinWheelPage from "./pages/SpinWheelPage";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-primary min-h-screen flex flex-col justify-start">
        <Navbar />
        <Routes>
          {/* List of all challenge types */}
          <Route path="/" element={<LandingPage />} />

          {/* Playground for a randomizer subtype */}
          <Route path="/challenge-types/randomizer" element={<RandomizerPage />} />

          {/* Playground for a slot-machine subtype */}
          <Route path="/challenge-types/slot-machine" element={<SlotMachinePage />} />

          {/* Playground for a spin-wheel subtype */}
          <Route path="/challenge-types/spin-wheel" element={<SpinWheelPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
