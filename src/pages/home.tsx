import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductList from "../components/ProductList";
import { Link } from "react-router-dom";
interface Product {
  name: string;
  category: string;
  imageSrc: string;
  price: string;
  count?: number; 
}

const Home: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const products: Product[] = [
    {
      name: 'Produit A',
      category: 'Catégorie 1',
      imageSrc: 'https://via.placeholder.com/150',
      price: '$20.00',
    },
    {
      name: 'Produit B',
      category: 'Catégorie 2',
      imageSrc: 'https://via.placeholder.com/150',
      price: '$20.00',
    },
    {
      name: 'Produit C',
      category: 'Catégorie 2',
      imageSrc: 'https://via.placeholder.com/150',
      price: '$25.00',
    },
    {
      name: 'Produit D',
      category: 'Catégorie 3',
      imageSrc: 'https://via.placeholder.com/150',
      price: '$25.00',
    },
  ];

  const updateCartCount = (product: Product, change: number) => {
    const updatedCart = [...cartItems];
    const productIndex = updatedCart.findIndex(item => item.name === product.name && item.price === product.price);
  
    // Récupérer le compteur actuel depuis localStorage
    const currentCount = parseInt(localStorage.getItem(`product-${product.name}`) || '0', 10);
    const newCount = currentCount + change;
  
    if (newCount <= 0) {
      // Supprimer le produit si le compteur est à 0
      if (productIndex !== -1) {
        updatedCart.splice(productIndex, 1);
      }
      localStorage.removeItem(`product-${product.name}`);
    } else {
      if (productIndex !== -1) {
        // Mettre à jour le produit au lieu de l'ajouter à nouveau
        updatedCart[productIndex] = { ...updatedCart[productIndex], count: newCount };
      } else {
        updatedCart.push({ ...product, count: newCount });
      }
      // Enregistrer le nouveau compteur dans localStorage
      localStorage.setItem(`product-${product.name}`, newCount.toString());
    }
  
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const cartCount = cartItems.length;

  return (
    <>
      <div className="container mx-auto px-8">
        {/* Header */}
        <div className="bg-[#00a884] mx-auto container p-4 mr-5 md:p-6 flex items-center justify-between text-white fixed top-0 w-full z-10">
          <div className="text-lg md:text-xl font-bold">
            Catalogue WhatsApp
          </div>
          <div className="text-xl md:text-2xl mr-8 flex items-center">
            <Link to={"/panier"} className="flex items-center gap-x-2">
            {cartCount > 0 && (
              <span className="text-lg flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <FaShoppingCart />
            
            </Link>
          </div>
        </div>

        {/* Background Section */}
        <div className="relative mt-8">
          <div className="w-full h-32 md:h-48 bg-gray-400 object-cover opacity-100">
            {/* Image or background color */}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-2xl md:text-4xl font-bold">Nos produits</h1>
          </div>
        </div>

        {/* Product section */}
        <div>
          <ProductList products={products} updateCartCount={updateCartCount} />
        </div>
        <div className="flex justify-center items-center text-sm ">
          <p>Vous cherchez autre chose? Envoyez un message à ...</p>
        </div>
        <div className="flex justify-center items-center">
          <button className="bg-[#00a884] text-white px-3 text-sm py-1 rounded-full ">Message</button>
          </div>
        {/* Voir le panier Button */}
        {cartCount > 0 && (
          <div className="fixed bottom-4 right-4">
            <Link to={"/panier"}>
            
              <button className="bg-[#00a884] text-white px-4 py-2 rounded-lg shadow-lg">
                Voir le panier
              </button>
            </Link>
            
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
