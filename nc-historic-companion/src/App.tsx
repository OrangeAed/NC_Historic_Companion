import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExamplePage from './pages/ExamplePage/ExamplePage.tsx';
import TourLocation from './pages/TourLocation/TourLocation.tsx';
import FrontPage from "./pages/FrontPage/FrontPage.tsx";
import CreateTour from "./pages/CreateTour/CreateTour.tsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element = {<ExamplePage />} />
                {/* This follows the form "localhost:5173/tour/[tour-name]" */}
                <Route path="/tour/:tour" element = {<FrontPage />} />
                {/* This follows the form "localhost:5173/tour/[tour-name]/[location_name]" */}
                <Route path="/tour/:tour/:location" element={<TourLocation />} />
                <Route path="/create" element={<CreateTour />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    )
}

export default App
