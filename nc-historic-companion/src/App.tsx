import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExamplePage from './pages/ExamplePage/ExamplePage.tsx';
import TourLocation from './pages/TourLocation/TourLocation.tsx';
import FrontPage from "./pages/FrontPage/FrontPage.tsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element = {<ExamplePage />} />
                <Route path="/tour/:tour" element = {<FrontPage />} />
                <Route path="/tour/:tour/:location" element={<TourLocation />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    )
}

export default App
