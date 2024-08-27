// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

interface HeaderProps {
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  return (
    <>
    
    <div className="bg-[#00a884] fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex items-center justify-between p-4 md:p-6 text-white">
      <Link to={"/"}>
        
        <div className="text-lg md:text-xl font-bold">
          Catalogue WhatsApp
        </div>
        </Link>
        <div className="text-xl md:text-2xl flex items-center gap-x-2">
          <Link to={"/panier"} className="flex items-center">
            {cartCount > 0 && (
              <span className="text-lg flex items-center justify-center mr-2">
                {cartCount}
              </span>
            )}
            <FaShoppingCart />
          </Link>
        </div>
      </div>
    </div>
     
      <div className="relative mt-8">
        <div className="w-full h-32 md:h-48 bg-gray-400 object-cover opacity-100">
          {/* Image or background color */}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-2xl md:text-4xl font-bold">Nom de l'entreprise</h1>
        </div>
      </div>
    </>
  );
};

export default Header;
