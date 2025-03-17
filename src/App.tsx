import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Compra from './pages/compra/Compra';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/compra" element={<Compra />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;