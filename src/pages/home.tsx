import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import Header from "../components/Header";
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
      <Header cartCount={cartCount} />

  

      {/* Product section */}
      <div>
        <ProductList products={products} updateCartCount={updateCartCount} />
      </div>
      <div className="flex justify-center items-center text-sm ">
        <p>Vous cherchez autre chose? Envoyez un message à ...</p>
      </div>
      <div className="flex justify-center items-center">
        <button className="bg-[#00a884] text-white px-3 text-sm py-1 rounded-full">Message</button>
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
    </>
  );
};

export default Home;
