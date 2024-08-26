import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  name: string;
  category: string;
  imageSrc: string;
  price: string;
}

interface ProductListProps {
  products: Product[];
  updateCartCount: (product: Product, change: number) => void; // Mettre à jour ici
}

const ProductList: React.FC<ProductListProps> = ({ products, updateCartCount }) => {
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="container mx-auto px-4 mt-5">
      {categories.map((category) => (
        <div key={category} className="mb-10">
          <div className='flex justify-between'>
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <p>Tout voir</p>
          </div>
          <div className="space-y-6">
            {products
              .filter(product => product.category === category)
              .map((product, index) => (
                <ProductCard
                  key={index}
                  name={product.name}
                  category={product.category}
                  imageSrc={product.imageSrc}
                  price={product.price}
                  updateCartCount={updateCartCount}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
