import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import useSWR from "swr";
import axios from "axios";
import { productService } from '../services/product.service';

interface Product {
  id: number;
  name: string;
  galleryImages: string[]; // Assurez-vous que ce champ est bien défini
  price: string;
  count?: number;
  description?: string; 
}

const ProductDetailPage: React.FC = () => {
  const { productName } = useParams<{ productName: string }>();

  console.log("Product Name from URL:", productName);

  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const { data: products, error } = useSWR<Product[]>(productService.getProductsUrl(), fetcher);

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    console.log("Fetched Products:", products);

    if (products && productName) {
      const decodedProductName = decodeURIComponent(productName);
      console.log("Decoded Product Name:", decodedProductName);

      const selectedProduct = products.find(p => p.name === decodedProductName);
      console.log("Selected Product:", selectedProduct);

      setProduct(selectedProduct || null);

      if (selectedProduct) {
        const savedQuantity = parseInt(localStorage.getItem(`product-${selectedProduct.name}`) || '0', 10);
        if (savedQuantity > 0) setQuantity(savedQuantity);

        const storedCart = localStorage.getItem('cart');
        if (storedCart) setCartItems(JSON.parse(storedCart));
      }
    }
  }, [products, productName]);

  // Mise en place du slider d'images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (product?.galleryImages && product.galleryImages.length > 0) {
      const slideInterval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.galleryImages.length);
      }, 3000);

      return () => clearInterval(slideInterval);
    }
  }, [product]);

  const goToNextImage = () => {
    if (product?.galleryImages) {
      setCurrentImageIndex((currentImageIndex + 1) % product.galleryImages.length);
    }
  };

  const goToPreviousImage = () => {
    if (product?.galleryImages) {
      setCurrentImageIndex((currentImageIndex - 1 + (product?.galleryImages.length || 1)) % product.galleryImages.length);
    }
  };

  const updateCart = (newQuantity: number) => {
    if (product) {
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
    }
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCart(newQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCart(newQuantity);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className='container mx-auto px-4 py-6'>
        <Link to={"/"}>
          <div className="text-2xl text-[#25D366] flex items-center mb-6">
            <IoIosArrowBack className="mr-2" />
          </div>
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="relative">
            {product.galleryImages && product.galleryImages.length > 0 ? (
              <>
                <img
                  src={product.galleryImages[currentImageIndex]}
                  alt={`${product.name} ${currentImageIndex + 1}`}
                  className="w-full h-64 object-contain rounded-lg"
                />
                <button
                  onClick={goToPreviousImage}
                  className="absolute top-1/2 left-2 bg-[#25D366] text-white p-2 rounded-full transform -translate-y-1/2"
                >
                  &#10094;
                </button>
                <button
                  onClick={goToNextImage}
                  className="absolute top-1/2 right-2 bg-[#25D366] text-white p-2 rounded-full transform -translate-y-1/2"
                >
                  &#10095;
                </button>
              </>
            ) : (
              <p>No images available</p>
            )}
          </div>
          <h1 className="text-2xl font-bold mt-4 text-center text-[#25D366]">{product.name}</h1>
          <p className="text-xl font-semibold mt-2 text-center text-gray-600"><span dangerouslySetInnerHTML={{ __html: product.price }} /></p>
          <p className="text-gray-800 text-center mt-2">{product.description || 'No description available'}</p>

          <div className="flex justify-center items-center mt-6">
            <button
              onClick={decreaseQuantity}
              className="bg-gray-300 text-gray-800 p-2 rounded-full text-lg"
              disabled={quantity <= 0}
            >
              -
            </button>
            <p className="text-gray-800 text-xl mx-6">{quantity}</p>
            <button
              onClick={increaseQuantity}
              className="bg-gray-300 text-gray-800 p-2 rounded-lg text-lg"
            >
              +
            </button>
          </div>

          <div className="flex justify-center mt-6">
            <Link to={"/panier"}>
              <button className="bg-[#25D366] py-3 px-6 rounded-lg text-white font-semibold hover:bg-green-800">
                Voir le panier ({cartItems.length})
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
