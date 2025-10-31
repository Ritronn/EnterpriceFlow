import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import Billing from './Pages/Billing'; 
import Product from './Pages/Product';
import Finance from './Pages/Finance'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/finance" element={<Finance/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;