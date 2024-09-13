
import { HashRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/Scrolltop";
import Home from "./pages/home";
import Cart from "./pages/Cart"
import ProductDetailPage from "./pages/ProductDetail";
import CategorieProducts from "./pages/cateogorieProduct";
import { HelmetProvider } from 'react-helmet-async';
function App() {
  
  return (
    <>
      <HelmetProvider>
          <HashRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/panier" element={<Cart />} />
                <Route path={`/detail/:slug`} element={<ProductDetailPage />} />
                <Route path={`/categorie/:categoryName`} element={<CategorieProducts />} /> 
              </Routes>
          </HashRouter>
      </HelmetProvider>
    
      </>
  )
}

export default App
