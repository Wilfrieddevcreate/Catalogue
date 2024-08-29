
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/Scrolltop";
import Home from "./pages/home";
import Cart from "./pages/Cart"
import ProductDetailPage from "./pages/ProductDetail";
import CategorieProducts from "./pages/cateogorieProduct";
function App() {

  return (
    <BrowserRouter>
    <ScrollToTop />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/panier" element={<Cart />} />
    
    <Route path={`/detail/:productName`} element={<ProductDetailPage />} />
    <Route path={`/categorie/:categoryName`} element={<CategorieProducts />} />



    
    </Routes>
  </BrowserRouter>
  )
}

export default App
