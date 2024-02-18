// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TourController from './pages/Tour/TourController';
import TourLocation from './pages/Tour/TourLocation';
import VisitorLayout from './components/ui/VisitorLayout';

function App() {
  return (
      <Router>
        <VisitorLayout>
          <Routes>
            <Route path="/tour-location" element={<TourController />} />
            {/* Add more routes as needed */}
          </Routes>
        </VisitorLayout>
      </Router>
  );
}

export default App;