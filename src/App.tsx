
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/Scrolltop";
import Home from "./pages/home";
import Cart from "./pages/Cart"
import ProductDetailPage from "./pages/ProductDetail";
function App() {

  return (
    <BrowserRouter>
    <ScrollToTop />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/panier" element={<Cart />} />
    <Route path="/detail" element={<ProductDetailPage />} />


    
    </Routes>
  </BrowserRouter>
  )
}

export default App
