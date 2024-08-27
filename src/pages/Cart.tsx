// src/pages/Cart.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header"; 

interface Product {
  name: string;
  category: string;
  imageSrc: string;
  price: string;
  quantity: number; // Ajout de la propriété quantity
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState<number>(0); // Ajout d'un état pour le compteur du panier

  useEffect(() => {
    // Récupérer les articles du panier depuis le localStorage
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
    setCartCount(items.length); // Mettre à jour le compteur du panier
  }, []);

  const handleRemoveItem = (name: string) => {
    // Supprimer l'article du panier
    const updatedItems = cartItems.filter(item => item.name !== name);
    setCartItems(updatedItems);
    setCartCount(updatedItems.length); // Mettre à jour le compteur du panier
    localStorage.setItem('cart', JSON.stringify(updatedItems));

    // Mettre à jour le compteur de ce produit dans le localStorage
    localStorage.removeItem(`product-${name}`);
  };

  // Fonction pour obtenir la quantité depuis le localStorage
  const getProductQuantity = (name: string): number => {
    return parseInt(localStorage.getItem(`product-${name}`) || '0', 10);
  };

  // Fonction pour augmenter la quantité
  const increaseQuantity = (name: string) => {
    const currentQuantity = getProductQuantity(name);
    const newQuantity = currentQuantity + 1;
    localStorage.setItem(`product-${name}`, newQuantity.toString());

    // Mettre à jour les articles du panier
    const updatedItems = cartItems.map(item =>
      item.name === name ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    setCartCount(updatedItems.length); // Mettre à jour le compteur du panier
  };

  // Fonction pour diminuer la quantité
  const decreaseQuantity = (name: string) => {
    const currentQuantity = getProductQuantity(name);
    if (currentQuantity > 0) {
      const newQuantity = currentQuantity - 1;
      localStorage.setItem(`product-${name}`, newQuantity.toString());

      if (newQuantity === 0) {
        // Supprimer l'article du panier si la quantité atteint zéro
        handleRemoveItem(name);
      } else {
        // Mettre à jour les articles du panier
        const updatedItems = cartItems.map(item =>
          item.name === name ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
        setCartCount(updatedItems.length); // Mettre à jour le compteur du panier
      }
    }
  };

  return (
    <>
      <Header cartCount={cartCount} /> {/* Affichage du Header */}
      <div className="container mx-auto px-4 mt-8">
       <div className="flex justify-between"> 


        <h1 className="text-2xl font-bold mb-4">Panier</h1>
        <Link to={"/"}>
          <button className="bg-gray-200 px-2 py-1 mb-2 rounded-sm">Ajouter d'autre produit</button>
        </Link>
       </div>
        {cartItems.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between border p-4 mb-4">
                <div className="flex items-center">
                  <img src={item.imageSrc} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                  <div>
                    <h3 className="lg:text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-500 text-sm mt-2">{item.price}</p>
                    <div className="flex items-center mt-1">
                      <button
                        onClick={() => decreaseQuantity(item.name)}
                        className="bg-gray-200 p-2 rounded-sm text-sm"
                      >
                        -
                      </button>
                      <p className="text-gray-700 text-sm mx-2">{getProductQuantity(item.name)}</p>
                      <button
                        onClick={() => increaseQuantity(item.name)}
                        className="bg-gray-200 p-2 rounded-sm text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.name)}
                  className="text-red-600 hover:text-red-900 bg-red-200 p-2 rounded-sm ml-4"
                >
                  Retirer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
