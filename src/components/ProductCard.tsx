import React, { useState, useEffect } from 'react';
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
  updateCartCount: (product: Product, change: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, imageSrc, price, updateCartCount }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Récupérer le compteur depuis localStorage à l'initialisation
    const storedCount = parseInt(localStorage.getItem(`product-${name}`) || '0', 10);
    setCount(storedCount);
  }, [name]);

  const handleAddClick = () => {
    setCount(prevCount => {
      const newCount = prevCount + 1;
      localStorage.setItem(`product-${name}`, newCount.toString());
      updateCartCount({ name, category: 'Catégorie', imageSrc, price }, 1);
      return newCount;
    });
  };
  
  const handleRemoveClick = () => {
    setCount(prevCount => {
      if (prevCount > 0) {
        const newCount = prevCount - 1;
        localStorage.setItem(`product-${name}`, newCount.toString());
        updateCartCount({ name, category: 'Catégorie', imageSrc, price }, -1);
        return newCount;
      }
      return prevCount;
    });
  };
  

  return (
    <div className="flex items-center justify-between border p-4">
      <div className="flex items-center">
        <img src={imageSrc} alt={name} className="w-24 h-24 object-cover rounded-lg mr-4" />
        <div>
          <h3 className="lg:text-xl text-sm font-semibold">{name}</h3>
          <p className="text-gray-500 text-sm mt-2">{price}</p>
        </div>
      </div>

      <div className="flex items-center">
        {count > 0 && (
          <>
            <button onClick={handleRemoveClick} className="text-gray-600 hover:text-gray-900 bg-gray-200 p-1 rounded-sm">
              <FaMinus size={20} />
            </button>
            <span className="mx-2  text-sm">{count}</span>
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
