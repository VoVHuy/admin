import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard/Darhboard';
import Food from './pages/foodPage/Food';
import Store from './pages/storePage/Store';
import AddFood from './components/Food/AddFood';
import UpdateFood from './components/Food/UpdateFood';
import Login from './pages/login/Login';
import UpdateStore from './components/Store/UpdateStore';
import { AuthContext } from './auth/AuthContext';
import Voucher from './pages/voucherPage/Voucher';
import AddVoucher from './components/Voucher/AddVoucher';
import UpdateVoucher from './components/Voucher/UpdateVoucher';

function App() {
  const currentUser = useContext(AuthContext)
  const RequireAuth = ({children}) => {
    return currentUser.currentUser ? (children) : <Navigate to="/login"/>
  };
  console.log(currentUser.currentUser ,);

  return (
    <div>
      <Router>
        <Routes>
            <Route  path='/food'  element={<RequireAuth> <Food/> </RequireAuth>} />
            <Route path='/food/add' element={<RequireAuth> <AddFood/> </RequireAuth>}/>
            <Route path='/food/update/:id' element={<RequireAuth><UpdateFood/></RequireAuth>}/>
            <Route  path='/voucher'  element={<RequireAuth> <Voucher/> </RequireAuth>} />
            <Route path='/voucher/add' element={<RequireAuth> <AddVoucher/> </RequireAuth>}/>
            <Route path='/voucher/update/:id' element={<RequireAuth><UpdateVoucher/></RequireAuth>}/>
            <Route path='/store' element={<RequireAuth><Store/></RequireAuth>}/>
            <Route path='/store/update' element={<RequireAuth><UpdateStore/></RequireAuth>}/>
            <Route path='/login' element={<Login/>}/>
            <Route index path='/'  element={<RequireAuth><Dashboard/></RequireAuth>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
