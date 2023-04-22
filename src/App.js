import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Darhboard';
import Food from './pages/foodPage/Food';
import Store from './pages/storePage/Store';
import AddFood from './components/Food/AddFood';
import UpdateFood from './components/Food/UpdateFood';

function App() {
  return (
    <div>
      <Router>
        <Routes>
            <Route index path='/'  element={<Dashboard/>} />
            <Route  path='/food'  element={<Food/>} />
            <Route path='/food/add' element={<AddFood/>}/>
            <Route path='/food/update/:id' element={<UpdateFood/>}/>
            <Route path='/store' element={<Store/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
