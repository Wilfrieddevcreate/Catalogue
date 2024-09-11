import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; // Assurez-vous d'avoir ce composant
import Header from '../components/Header';
export interface Product {
  name: string;
  category: string;
  imageSrc: string;
  price: string;
  slug: string
  count?: number; 
}

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://showroomdepotcostume.com/wp-json/custom-api/v1/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0 && categoryName) {
      const filtered = products.filter(product => product.category === decodeURIComponent(categoryName));
      setFilteredProducts(filtered);
    }
  }, [products, categoryName]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const updateCartCount = (product: Product, change: number) => {
    const updatedCart = [...cartItems];
    const productIndex = updatedCart.findIndex(item => item.name === product.name && item.price === product.price);

    const currentCount = parseInt(localStorage.getItem(`product-${product.name}`) || '0', 10);
    const newCount = currentCount + change;

    if (newCount <= 0) {
      if (productIndex !== -1) {
        updatedCart.splice(productIndex, 1);
      }
      localStorage.removeItem(`product-${product.name}`);
    } else {
      if (productIndex !== -1) {
        updatedCart[productIndex] = { ...updatedCart[productIndex], count: newCount };
      } else {
        updatedCart.push({ ...product, count: newCount });
      }
      localStorage.setItem(`product-${product.name}`, newCount.toString());
    }

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (loading) return (
    <div className="flex items-center justify-center my-6">
      <div className="animate-spin w-8 h-8 border-4 border-green-200 border-t-transparent rounded-full"></div>
    </div>
  );
  
  if (error) return <div>{error}</div>;
  const cartCount = cartItems.length;

  return (
   <>
    <Header cartCount={cartCount} />

<div className="container mx-auto px-4 mt-5">
  <h1 className="text-2xl font-bold mb-4"> {categoryName ? (
        <h1 className="text-2xl font-bold mb-4">
          {decodeURIComponent(categoryName)}
        </h1>
      ) : (
        <p>Catégorie non spécifiée</p>
      )}</h1>
  <div className="space-y-6">
    {filteredProducts.length > 0 ? (
      filteredProducts.map((product, index) => (
        <ProductCard
          key={index}
          name={product.name}
          category={product.category}
          imageSrc={product.imageSrc}
          price={product.price}
          slug={product.slug}
          updateCartCount={updateCartCount}
        />
      ))
    ) : (
      <p>No products available in this category.</p>
    )}
  </div>
</div>  
   </> 
   
  );
};

export default CategoryPage;
