// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TourController from './pages/Tour/TourController';
import TourLocation from './pages/Tour/TourLocation';
import VisitorLayout from './components/VisitorLayout';

function App() {
  return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/tour-location" element={<TourController />} />
            {/* Add more routes as needed */}
          </Routes>
        </Layout>
      </Router>
  );
}

export default App;