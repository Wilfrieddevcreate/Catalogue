import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import useSWR from "swr";
import axios from "axios";
import { productService } from '../services/product.service';
import { FaWhatsapp } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  galleryImages: string[];
  imageSrc: string;
  price: string;
  count?: number;
  description?: string; 
  category:string;
}

const ProductDetailPage: React.FC = () => {
  const { productName, category } = useParams<{ productName: string; category: string }>();
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const { data: products, error } = useSWR<Product[]>(productService.getProductsUrl(), fetcher);

  if(error){
    console.log(error);
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    if (products && productName && category) {
      const decodedProductName = decodeURIComponent(productName);
      const decodedCategory = decodeURIComponent(category);
      
      const selectedProduct = products.find(p => p.name === decodedProductName && p.category === decodedCategory);
      setProduct(selectedProduct || null);
  
      if (selectedProduct) {
        const savedQuantity = parseInt(localStorage.getItem(`product-${selectedProduct.name}`) || '0', 10);
        if (savedQuantity > 0) setQuantity(savedQuantity);
  
        const storedCart = localStorage.getItem('cart');
        if (storedCart) setCartItems(JSON.parse(storedCart));
      }
    }
  }, [products, productName, category]);

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

  const handleShare = async () => {
    if (product) {
      try {
        const shareUrl = `${window.location.origin}/detail/${encodeURIComponent(product.name)}/${encodeURIComponent(product.category)}`;

        if (navigator.share) {
          await navigator.share({
            title: product.name,
            text: product.description || product.name,
            url: shareUrl,
          });
          console.log('Partager réussi');
        } else {
          alert('La fonctionnalité de partage n\'est pas supportée sur ce navigateur.');
        }
      } catch (error) {
        console.error('Erreur lors du partage:', error);
      }
    }
  };

  if (!product) return(
    <div className="flex items-center justify-center my-6">
      <div className="animate-spin w-8 h-8 border-4 border-green-200 border-t-transparent rounded-full"></div>
    </div>
  );

  const allImages = [product.imageSrc, ...product.galleryImages];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className='container mx-auto px-4 py-6'>
        <div className="relative">
          <Link to={"/"}>
            <div className="absolute top-0 left-0 text-xl text-[#25D366] bg-white flex items-center p-4">
              <IoIosArrowBack className="mr-2" />
            </div>
          </Link>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="relative flex justify-center">
              <div className="overflow-x-auto whitespace-nowrap cursor-pointer space-x-2">
                {allImages.length > 0 ? (
                  allImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="inline-flex w-full h-auto object-contain rounded-lg"
                    />
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
            </div>
            <h1 className="text-2xl font-bold mt-4 text-center text-[#25D366]">{product.name}</h1>
            <div className='flex justify-center items-center my-6'>
              <a
                href="https://wa.me/22961790448"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className='flex items-center space-x-3 py-3 px-6 rounded-full text-white bg-[#25D366]'><FaWhatsapp  className='text-2xl'/>  <span>Envoyez un message à l'entreprise</span></button>
              </a>
            </div>
            <p className="text-xl font-semibold mt-2 text-center text-gray-600">{category}</p>
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
            <div className='flex justify-center items-center mt-6'>
              <button onClick={handleShare} className='space-x-3 py-3 px-6 rounded-full border border-[#25D366]'>
                Partager
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
    </div>
  );
};

export default ProductDetailPage;
