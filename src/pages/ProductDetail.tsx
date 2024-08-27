import React, { useState, useEffect } from 'react';
import Header from '../components/Header'; // Ajuste ce chemin en fonction de la structure de ton projet

const ProductDetailPage: React.FC = () => {
  // Détails du produit
  const product = {
    name: 'Produit Exemple',
    imageSrc: 'https://via.placeholder.com/150', // Remplace par l'URL de ton image
    price: '100 €',
  };

  // État pour la quantité
  const [quantity, setQuantity] = useState(1); // Quantité par défaut (1)
  const [cartCount, setCartCount] = useState(0); // Compteur pour le panier

  // Utilisation de useEffect pour récupérer la quantité depuis le localStorage
  useEffect(() => {
    const savedQuantity = parseInt(localStorage.getItem(`product-${product.name}`) || '1', 10);
    setQuantity(savedQuantity);
    setCartCount(savedQuantity); // Initialiser le compteur de panier
  }, [product.name]);

  // Fonction pour augmenter la quantité
  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    localStorage.setItem(`product-${product.name}`, newQuantity.toString());
    setCartCount(newQuantity); // Mettre à jour le compteur de panier
  };

  // Fonction pour diminuer la quantité
  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      localStorage.setItem(`product-${product.name}`, newQuantity.toString());
      setCartCount(newQuantity); // Mettre à jour le compteur de panier
    }
  };

  return (
    <div>
      {/* Inclusion du Header */}
      <Header cartCount={cartCount} />
      
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="container mx-auto p-4 max-w-sm">
          {/* Image du produit */}
          <img src={product.imageSrc} alt={product.name} className="w-full h-64 object-cover rounded-lg" />

          {/* Nom du produit */}
          <h1 className="text-2xl font-bold mt-4 text-center">{product.name}</h1>

          {/* Prix du produit */}
          <p className="text-xl font-semibold mt-2 text-center text-gray-600">{product.price}</p>

          {/* Sélection de la quantité */}
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={decreaseQuantity}
              className="bg-gray-200 p-2 rounded-sm text-sm"
              disabled={quantity <= 1}
            >
              -
            </button>
            <p className="text-gray-700 text-lg mx-4">{quantity}</p>
            <button
              onClick={increaseQuantity}
              className="bg-gray-200 p-2 rounded-sm text-sm"
            >
              +
            </button>
          </div>
          <div className='flex justify-center mt-5'>

          <button className='bg-green-700 py-2 px-1 rounded-sm text-white'>Voir le panier</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
