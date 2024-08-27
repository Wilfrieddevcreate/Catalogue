import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

interface Product {
  name: string;
  imageSrc: string;
  price: string;
  count?: number;
}

const ProductDetailPage: React.FC = () => {
  
  // Détails du produit
  const product: Product = {
    name: 'Produit A',
    imageSrc: 'https://via.placeholder.com/150', // Remplace par l'URL de ton image
    price: '100 €',
  };

  // État pour la quantité
  const [quantity, setQuantity] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    // Vérifier si le produit est déjà dans le panier
    const savedQuantity = parseInt(localStorage.getItem(`product-${product.name}`) || '0', 10);
    
    if (savedQuantity > 0) {
      setQuantity(savedQuantity);
    }

    // Récupérer le panier du localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, [product.name]);

  const updateCart = (newQuantity: number) => {
    const updatedCart = [...cartItems];
    const productIndex = updatedCart.findIndex(item => item.name === product.name);

    if (newQuantity > 0) {
      if (productIndex !== -1) {
        updatedCart[productIndex] = { ...updatedCart[productIndex], count: newQuantity };
      } else {
        updatedCart.push({ ...product, count: newQuantity });
      }
      localStorage.setItem(`product-${product.name}`, newQuantity.toString());
    } else if (productIndex !== -1) {
      updatedCart.splice(productIndex, 1);
      localStorage.removeItem(`product-${product.name}`);
    }

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Fonction pour augmenter la quantité
  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCart(newQuantity);
  };

  // Fonction pour diminuer la quantité
 const decreaseQuantity = () => {
  if (quantity > 0) {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    updateCart(newQuantity);
  }
};

  return (
    <div>
      <Header cartCount={cartItems.length} />
      
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="container mx-auto p-4 max-w-sm">
          <img src={product.imageSrc} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
          <h1 className="text-2xl font-bold mt-4 text-center">{product.name}</h1>
          <p className="text-xl font-semibold mt-2 text-center text-gray-600">{product.price}</p>

          <div className="flex justify-center items-center mt-4">
            <button
              onClick={decreaseQuantity}
              className="bg-gray-200 p-2 rounded-sm text-sm"
              disabled={quantity <= 0}
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
          <Link to={"/panier"}>
            <button  className='bg-green-700 py-2 px-1 rounded-sm text-white'>
              Voir le panier
            </button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
