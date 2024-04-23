// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainView from "./pages/MainView/MainView.tsx";
import TourView from "./pages/TourView/TourView.tsx";
import CreateTour from "./pages/CreateTour/CreateTour.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainView />} />
                <Route path="/tour/:tourId" element={<TourView />} />
                <Route path={"/create-tour"} element={<CreateTour />} />
            </Routes>
        </Router>
    );
};

export default App;