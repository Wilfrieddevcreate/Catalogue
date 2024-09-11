import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Product {
  name: string;
  category: string;
  imageSrc: string;
  price: string;
  slug: string;
  count: number; // Ajout du champ count
}

interface ProductCardProps {
  name: string;
  category: string;
  imageSrc: string;
  price: string;
  slug: string;
  updateCartCount: (product: Product, change: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, category, imageSrc, price, slug, updateCartCount }) => {
  const [count, setCount] = useState(0);

  // Charger les données du localStorage lors du premier rendu
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const productInCart = storedCart.find((item: Product) => item.slug === slug);
    if (productInCart) {
      setCount(productInCart.count);
    }
  }, [slug]);

  const handleAddClick = () => {
    const newCount = count + 1;
    setCount(newCount);

    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = storedCart.map((item: Product) => 
      item.slug === slug ? { ...item, count: newCount } : item
    );

    // Si le produit n'est pas déjà dans le panier, l'ajouter
    if (!updatedCart.some((item: Product) => item.slug === slug)) {
      updatedCart.push({ name, category, imageSrc, price, slug, count: newCount });
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount({ name, category, imageSrc, price, slug, count: newCount }, 1);
  };

  const handleRemoveClick = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);

      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = storedCart
        .map((item: Product) => item.slug === slug ? { ...item, count: newCount } : item)
        .filter((item: Product) => item.count > 0); // Supprimer les produits avec count = 0

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      updateCartCount({ name, category, imageSrc, price, slug, count: newCount }, -1);
    }
  };

  // Transformer le nom pour qu'il affiche seulement les deux premiers mots
  const truncatedName = name.split(' ').slice(0, 2).join(' ');

  return (
    <div className="flex items-center justify-between border p-4">
      <div className="flex items-center">
        <Link to={`/detail/${slug}`} className="flex items-center">
          <img src={imageSrc} alt={name} className="w-24 h-24 object-cover rounded-lg mr-4" />
          <div>
            <h3 className="text-xl font-semibold">{truncatedName}</h3>
            <p className="text-gray-500 mt-2"><span dangerouslySetInnerHTML={{ __html: price }} /></p>
          </div>
        </Link>
      </div>

      <div className="flex items-center">
        {count > 0 && (
          <>
            <button onClick={handleRemoveClick} className="text-gray-600 hover:text-gray-900 bg-gray-200 p-1 rounded-sm">
              <FaMinus size={20} />
            </button>
            <span className="mx-2 text-lg">{count}</span>
          </>
        )}
        <button onClick={handleAddClick} className="text-gray-600 hover:text-gray-900 bg-gray-200 p-1 rounded-sm">
          <FaPlus size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
