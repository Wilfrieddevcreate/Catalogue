
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/Scrolltop";
import Home from "./pages/home";
import Cart from "./pages/Cart"
function App() {

  return (
    <BrowserRouter>
    <ScrollToTop />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="panier" element={<Cart />} />

    
    </Routes>
  </BrowserRouter>
  )
}

export default App
