import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Order from './pages/Order';
import Addsitemanager from './pages/Addsitemanager';
import Ordersupplier from './pages/OrderSupplier'
import Payment from './pages/Payment'
import Supplierreg from './pages/SupplierReg'
import Addsite from './pages/Addsite';
import Place_order from "./pages/Placed_order"
// import Loginfrom from './components/logn';
import Chat from "./pages/Chat";
const App = () => {
  return (
   
    <BrowserRouter>
    
      <Sidebar>
        <Routes>
          <Route path="/" element={<Order />} />
          <Route path="/Addsitemanager" element={<Addsitemanager />} />
          <Route path="/Ordersupplier" element={<Ordersupplier />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Supplierreg" element={<Supplierreg />} />
          <Route path="/Addsite" element={<Addsite/>} />
          <Route path='/placeorder' element={<Place_order/>}/>
          <Route path='/chat' element={<Chat/>}/>
        </Routes>
      </Sidebar>
     
    </BrowserRouter>
    
  );
};

export default App;