import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TourLocation from './pages/TourLocation/TourLocation.tsx';
import FrontPage from "./pages/FrontPage/FrontPage.tsx";
import TourList from './pages/TourList/TourList.tsx';

import '../global.css'; // Import the global CSS file

function App() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>

        <Router>
            <Routes>
                <Route path="/" element = {<TourList />} />
                {/* This follows the form "localhost:5173/tour/[tour-name]" */}
                <Route path="/tour/:tour" element = {<FrontPage />} />
                {/* This follows the form "localhost:5173/tour/[tour-name]/[location_name]" */}
                <Route path="/tour/:tour/:location" element={<TourLocation />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
        </div>
    )
}

export default App
