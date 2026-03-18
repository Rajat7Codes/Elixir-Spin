import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./layout/Navbar";

// Lazy load pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const RandomizerPage = lazy(() => import("./pages/RandomizerPage"));
const SlotMachinePage = lazy(() => import("./pages/SlotMachinePage"));
const SpinWheelPage = lazy(() => import("./pages/SpinWheelPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <BrowserRouter>
      <div className="bg-primary min-h-screen flex flex-col justify-start">
        <Navbar />

        <Suspense
          fallback={
            <div className="flex flex-1 items-center justify-center text-white text-lg">
              Loading...
            </div>
          }
        >
          <Routes>
            {/* Landing */}
            <Route path="/" element={<LandingPage />} />

            {/* Challenge types */}
            <Route path="/challenge-types/randomizer" element={<RandomizerPage />} />
            <Route path="/challenge-types/slot-machine" element={<SlotMachinePage />} />
            <Route path="/challenge-types/spin-wheel" element={<SpinWheelPage />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;