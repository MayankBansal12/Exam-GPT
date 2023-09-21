import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Test from './Test';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" Component={Home} />
            <Route exact path="/test" Component={Test} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;
