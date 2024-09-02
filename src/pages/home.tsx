import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';
import { productService } from '../services/product.service';

// Chargement paresseux de ProductList
const ProductList = lazy(() => import('../components/ProductList'));

interface Product {
  name: string;
  category: string;
  imageSrc: string;
  price: string;
  count?: number;
}

// Fonction fetcher pour SWR
const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Home: React.FC = () => {
  const { data: products, error } = useSWR<Product[]>(productService.getProductsUrl(), fetcher);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const updateCartCount = (product: Product, change: number) => {
    const updatedCart = [...cartItems];
    const productIndex = updatedCart.findIndex(item => item.name === product.name && item.price === product.price);

    const currentCount = parseInt(localStorage.getItem(`product-${product.name}`) || '0', 10);
    const newCount = currentCount + change;

    if (newCount <= 0) {
      if (productIndex !== -1) {
        updatedCart.splice(productIndex, 1);
      }
      localStorage.removeItem(`product-${product.name}`);
    } else {
      if (productIndex !== -1) {
        updatedCart[productIndex] = { ...updatedCart[productIndex], count: newCount };
      } else {
        updatedCart.push({ ...product, count: newCount });
      }
      localStorage.setItem(`product-${product.name}`, newCount.toString());
    }

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const cartCount = cartItems.length;

  return (
    <>
      <Header cartCount={cartCount} />

      {/* Section des produits */}
      <div>
        {!products && !error && (
          <div className="flex items-center justify-center my-6">
            <div className="animate-spin w-8 h-8 border-4 border-green-200 border-t-transparent rounded-full"></div>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center my-6">
            <p>Erreur lors de la récupération des produits</p>
          </div>
        )}
        {products && (
          <Suspense fallback={<div>Chargement des produits...</div>}>
            <ProductList products={products} updateCartCount={updateCartCount} />
          </Suspense>
        )}
      </div>

      <div className="flex justify-center container sm:ml-6 md:ml-5 items-center text-center mb-2 text-sm">
        <p>Vous cherchez autre chose? Envoyez un message à ...</p>
      </div>
      <div className="flex justify-center items-center mb-2">
        <a
          href="https://wa.me/22961790448?text=Bonjour,%20je%20suis%20intéressé%20par%20le%20produit%20T-shirt%20Cool%20à%2020€.%20Voici%20l'image%20du%20produit:%20https://example.com/images/tshirt-cool.jpg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-[#25D366] text-white px-3 text-sm py-1 rounded-full">
            Message
          </button>
        </a>
      </div>

      {/* Voir le panier Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 right-4">
          <Link to={"/panier"}>
            <button className="bg-[#25D366] text-white px-4 py-2 rounded-lg shadow-lg">
              Voir le panier
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
