import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
interface Product {
    name: string;
    category: string;
    imageSrc: string;
    price: string;
  }
const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    // Récupérer les articles du panier depuis le localStorage
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
  }, []);

  const handleRemoveItem = (name: string) => {
    // Supprimer l'article du panier
    const updatedItems = cartItems.filter(item => item.name !== name);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  return (

   <>
   <div><Link to={"/"}>
   Ajouter d'autre produit
   </Link></div>
    <div className="container mx-auto px-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">Panier</h1>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between border p-4 mb-4">
              <div className="flex items-center">
                <img src={item.imageSrc} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-500 mt-2">{item.price}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item.name)}
                className="text-red-600 hover:text-red-900 bg-red-200 p-2 rounded-sm"
              >
                Retirer
              </button>
            </div>
          ))}
          {/* Afficher le total des articles ici si besoin */}
        </div>
      )}
    </div>
   </> 
  );
};

export default Cart;
