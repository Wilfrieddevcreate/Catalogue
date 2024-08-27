import React from 'react';

interface ProductDetailProps {
  name: string;
  imageSrc: string;
  price: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ name, imageSrc, price }) => {
  return (
    <div className="container mx-auto p-4 max-w-sm">
      <img src={imageSrc} alt={name} className="w-full h-64 object-cover rounded-lg" />
      <h1 className="text-2xl font-bold mt-4 text-center">{name}</h1>
      <p className="text-xl font-semibold mt-2 text-center text-gray-600">{price}</p>
    </div>
  );
};

export default ProductDetail;
