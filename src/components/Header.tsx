import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "../assets/logo.jpg";
import { FaWhatsapp } from "react-icons/fa";
import { CgMoreVerticalAlt } from "react-icons/cg";

interface HeaderProps {
  cartCount: number;
}
const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}`;

      if (navigator.share) {
        await navigator.share({
          title: "Costumes Élegants pour Toutes Occasions",
          text: "Costumes Élegants pour Toutes Occasions Commandez maintenant et bénéficiez de conseils personnalisés pour un look impeccable.",
          url: shareUrl,
        });
        console.log('Partager réussi');
      } else {
        alert('La fonctionnalité de partage n\'est pas supportée sur ce navigateur.');
      }
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  
};
const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  return (
    <>
      <div className="bg-[#25D366] fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto flex items-center justify-between p-4 md:p-6 text-white">
          {/* Espace vide pour centrer le texte */}
          <div className="w-1/3 text-2xl">
          
          
          </div>
          
          
          <Link to={"/"} className="text-lg md:text-xl font-bold w-1/3 text-center flex items-center justify-center space-x-3">
  
  <span className="text-2xl"><FaWhatsapp /></span>
  <span>Catalogue WhatsApp</span>
</Link>          
          {/* Icône du panier alignée à droite */}
          <div className="w-1/3 flex justify-end">
            <Link to={"/panier"} className="flex items-center text-2xl">
              {cartCount > 0 && (
                <span className="text-lg flex items-center justify-center mr-2">
                  {cartCount}
                </span>
              )}
              <FaShoppingCart />
            </Link> 
            <span className="ml-2 text-2xl mt-1"><button onClick={handleShare}><CgMoreVerticalAlt /></button></span>
            
          </div>
        </div>
      </div>

      <div className="relative mt-20">
        <div className="w-full h-32 md:h-48 bg-gray-400 object-cover opacity-100">
          <img src={Logo} alt="Notre Logo" className="h-48 w-full" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-2xl md:text-4xl font-bold"></h1>
        </div>
      </div>
    </>
  );
};

export default Header;
