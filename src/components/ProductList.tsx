import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';

// Chargement paresseux de ProductCard
const ProductCard = lazy(() => import('./ProductCard'));

interface Product {
  name: string;
  category: string;
  imageSrc: string;
  price: string;
}

interface ProductListProps {
  products: Product[];
  updateCartCount: (product: Product, change: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, updateCartCount }) => {
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="container mx-auto px-4 mt-5">
      {categories.map((category) => (
        <div key={category} className="mb-10">
          <div className='flex justify-between'>
            <h2 className="text-xl font-bold mb-4">{category}</h2>
            <Link to={`/categorie/${category}`}>
              <p>Tout voir</p>
            </Link>
          </div>
          <div className="space-y-6">
            {products
              .filter(product => product.category === category)
              .map((product, index) => (
                <Suspense key={index} fallback={<div><div className="flex items-center justify-center my-6">
                  <div className="animate-spin w-8 h-8 border-4 border-green-200 border-t-transparent rounded-full"></div>
                </div></div>}>
                  <ProductCard
                    name={product.name}
                    category={product.category}
                    imageSrc={product.imageSrc}
                    price={product.price}
                    updateCartCount={updateCartCount}
                  />
                </Suspense>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
