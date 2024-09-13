
import { HashRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/Scrolltop";
import Home from "./pages/home";
import Cart from "./pages/Cart"
import ShareButton from "./pages/gesr";
import ProductDetailPage from "./pages/ProductDetail";
import CategorieProducts from "./pages/cateogorieProduct";
function App() {
  
  return (
    <>

    <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/panier" element={<Cart />} />
          <Route path="/share" element={<ShareButton />} />

          <Route path={`/detail/:slug`} element={<ProductDetailPage />} />
          <Route path={`/categorie/:categoryName`} element={<CategorieProducts />} />




        </Routes>
      </HashRouter>
    
      </>
  )
}

export default App
