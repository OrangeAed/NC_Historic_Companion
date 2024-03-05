import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExamplePage from './pages/ExamplePage/ExamplePage.tsx';
import FrontPage from "./pages/FrontPage/FrontPage.tsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element = {<ExamplePage />} />
                <Route path="/path1" element = {<ExamplePage />} />
                <Route path="/tour" element={<FrontPage title={"Title"} description={"Description"} first_location={{"a": "a"}} image={"image.path"}/>}>
                    {/* Component for path2 */}
                </Route>
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    )
}

export default App
