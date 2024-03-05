import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExamplePage from './pages/ExamplePage/ExamplePage.tsx';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element = {<ExamplePage />} />
                <Route path="/path1" element = {<ExamplePage />} />
                <Route path="/path2">
                    {/* Component for path2 */}
                </Route>
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    )
}

export default App
