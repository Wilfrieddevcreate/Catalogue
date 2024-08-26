import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface Product {
  name: string;
  category: string;
  imageSrc: string;
  price: string;
}

interface ProductCardProps {
  name: string;
  category: string;
  imageSrc: string;
  price: string;
  updateCartCount: (product: Product, change: number) => void; // Mettre à jour ici
}

const ProductCard: React.FC<ProductCardProps> = ({ name, imageSrc, price, updateCartCount }) => {
  const [count, setCount] = useState(0);

  const handleAddClick = () => {
    setCount(count + 1);
    updateCartCount({ name, category: 'Catégorie', imageSrc, price }, 1); // Ajouter 1 au panier
  };

  const handleRemoveClick = () => {
    if (count > 0) {
      setCount(count - 1);
      updateCartCount({ name, category: 'Catégorie', imageSrc, price }, -1); // Retirer 1 du panier
    }
  };

  return (
    <div className="flex items-center justify-between border p-4">
      <div className="flex items-center">
        <img src={imageSrc} alt={name} className="w-24 h-24 object-cover rounded-lg mr-4" />
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-gray-500 mt-2">{price}</p>
        </div>
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
