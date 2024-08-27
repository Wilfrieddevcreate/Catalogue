import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

interface Product {
  name: string;
  category: string;
  imageSrc: string;
  price: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
  }, []);

  const handleRemoveItem = (name: string) => {
    const updatedItems = cartItems.filter(item => item.name !== name);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));

    localStorage.removeItem(`product-${name}`);
  };

  const getProductQuantity = (name: string): number => {
    return parseInt(localStorage.getItem(`product-${name}`) || '0', 10);
  };

  const increaseQuantity = (name: string) => {
    const currentQuantity = getProductQuantity(name);
    const newQuantity = currentQuantity + 1;
    localStorage.setItem(`product-${name}`, newQuantity.toString());

    const updatedItems = cartItems.map(item =>
      item.name === name ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  const decreaseQuantity = (name: string) => {
    const currentQuantity = getProductQuantity(name);
    if (currentQuantity > 0) {
      const newQuantity = currentQuantity - 1;
      localStorage.setItem(`product-${name}`, newQuantity.toString());

      if (newQuantity === 0) {
        handleRemoveItem(name);
      } else {
        const updatedItems = cartItems.map(item =>
          item.name === name ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
      }
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 mt-8">
        <Link to={"/"}>
        
        <div className="mb-6 text-2xl">
          <IoIosArrowBack />
        </div>
        </Link>
        <div className="flex justify-between"> 
          <h1 className="text-2xl font-bold mb-4">Panier</h1>
          <Link to={"/"}>
            <button className="bg-gray-200 px-2 py-1 mb-2 rounded-sm">
              Ajouter d'autre produit
            </button>
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <>
            <p className="font-semibold">
              Ajouter des articles dans votre panier.
            </p>
            <p className="text-sm mt-3">
              Regroupez ici les articles qui vous intéressent et envoyez-les ensuite à l’entreprise. Utilisez votre panier pour vous renseigner sur l’achat, la personnalisation, la livraison ou tout ce que vous souhaitez.
            </p>
          </>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between border p-4 mb-4">
                <div className="flex items-center">
                  <img
                    src={item.imageSrc}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <Link to={"/detail"}>
                    
                    <h3 className="lg:text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-500 text-sm mt-2">{item.price}</p>
                    </Link>
                    <div className="flex items-center mt-1">
                      <button
                        onClick={() => decreaseQuantity(item.name)}
                        className="bg-gray-200 p-2 rounded-sm text-sm"
                      >
                        -
                      </button>
                      <p className="text-gray-700 text-sm mx-2">
                        {getProductQuantity(item.name)}
                      </p>
                      <button
                        onClick={() => increaseQuantity(item.name)}
                        className="bg-gray-200 p-2 rounded-sm text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.name)}
                  className="text-red-600 hover:text-red-900 bg-red-200 p-2 rounded-sm ml-4"
                >
                  Retirer
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          {cartItems.length > 0 ? (
            <p className="mt-3 bg-[#00a884] px-2 py-2 w-auto rounded-sm text-white">
              Passer la commande
            </p>
          ) : (
           <Link to={"/"}>
           
            <p className="mt-3 bg-[#00a884] px-2 py-2 w-auto rounded-sm text-white">
              Voir le catalogue
            </p>
           </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
