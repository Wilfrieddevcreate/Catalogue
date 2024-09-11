import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";

interface Product {
  name: string;
  category: string;
  imageSrc: string;
  price: string;
  quantity: number;
  slug:string
  selectedSizes: string[]; // Ajout de la propriété pour les tailles sélectionnées
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
  
    // Assure que chaque produit a une propriété selectedSizes initialisée
    const initializedItems = items.map((item: Product) => ({
      ...item,
      selectedSizes: item.selectedSizes || [], // Initialise selectedSizes si non défini
    }));
  
    setCartItems(initializedItems);
  }, []);
  

  const handleRemoveItem = (name: string) => {
    const updatedItems = cartItems.filter((item) => item.name !== name);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    localStorage.removeItem(`product-${name}`);
  };

  const getProductQuantity = (name: string): number => {
    return parseInt(localStorage.getItem(`product-${name}`) || "0", 10);
  };

  const increaseQuantity = (name: string) => {
    const currentQuantity = getProductQuantity(name);
    const newQuantity = currentQuantity + 1;
    localStorage.setItem(`product-${name}`, newQuantity.toString());
    const updatedItems = cartItems.map((item) =>
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
        const updatedItems = cartItems.map((item) =>
          item.name === name ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
      }
    }
  };

  const extractPriceText = (htmlPrice: string): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlPrice;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const toggleSizeSelection = (productName: string, size: string) => {
    const updatedItems = cartItems.map((item) =>
      item.name === productName
        ? {
            ...item,
            selectedSizes: item.selectedSizes ? (
              item.selectedSizes.includes(size)
                ? item.selectedSizes.filter((s) => s !== size)
                : [...item.selectedSizes, size]
            ) : [size], // Initialiser selectedSizes si non défini
          }
        : item
    );
    setCartItems(updatedItems);
  };
  

  const generateWhatsAppLink = () => {
    const phoneNumber = "22961790448";
    let message = "Voici les produits que je souhaite commander:\n\n";

    cartItems.forEach((item) => {
        const priceText = extractPriceText(item.price);
        message += `Nom du produit: ${item.name}\nPrix: ${priceText}\nQuantité :${getProductQuantity(item.name)}\nTailles sélectionnées: ${item.selectedSizes.join(", ")}\n\n`;
    });

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

const handleShare = async () => {
  try {
      if (cartItems.length === 0) {
          alert('Votre panier est vide. Ajoutez des produits avant de partager.');
          return;
      }

      let message = "Voici les produits ajoutés dans mon panier :\n\n";

      cartItems.forEach((item) => {
          const priceText = extractPriceText(item.price);
          message += `Nom: ${item.name}\nPrix: ${priceText}\nQuantité: ${getProductQuantity(item.name)}\nTailles sélectionnées: ${item.selectedSizes.join(", ")}\n\n`;
      });

      const firstProduct = cartItems[0];
      const shareUrl = `${window.location.origin}/detail/${firstProduct.slug}`;

      if (navigator.share) {
          await navigator.share({
              title: "Mon panier de produits",
              text: message,
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

  const sizes = Array.from({ length: 31 }, (_, i) => (40 + i).toString());
  return (
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
          {cartItems.map((item, index) => {
            const truncatedName = item.name.split(" ").slice(0, 2).join(" ");

            return (
              <div key={index} className="flex items-center justify-between border p-4 mb-4">
                <div className="flex items-center">
                  <img
                    src={item.imageSrc}
                    alt={item.name}
                    className="w-24 h-32 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <Link to={`/detail/${item.slug}`}>
                      <h3 className="lg:text-xl font-semibold">{truncatedName}</h3>
                      <p className="text-gray-500 text-sm mt-2">
                        <span dangerouslySetInnerHTML={{ __html: item.price }} />
                      </p>
                    </Link>

                    <div className="flex items-center mt-1">
                      <button
                        onClick={() => decreaseQuantity(item.name)}
                        className="bg-gray-200 p-1 rounded-sm text-sm"
                      >
                        -
                      </button>
                      <p className="text-gray-700 text-sm mx-2">
                        {getProductQuantity(item.name)}
                      </p>
                      <button
                        onClick={() => increaseQuantity(item.name)}
                        className="bg-gray-200 p-1 rounded-sm text-sm"
                      >
                        +
                      </button>
                    </div>

         <div className="my-4 w-48">
  {/* Conteneur des tailles avec overflow horizontal */}
  <div className="flex space-x-4 overflow-x-auto max-w-full scrollbar-hide">
    {sizes.map((size) => (
      <button
        key={size}
        onClick={() => toggleSizeSelection(item.name, size)}
        className={`min-w-[40px] rounded-lg ${
          item.selectedSizes?.includes(size) ? "bg-[#25D366] text-white" : "bg-gray-200"
        }`}
      >
        {size}
      </button>
    ))}
  </div>
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
            );
          })}
        </div>
      )}
<div className="">
          {cartItems.length > 0 ? (
            <>
              <div className="flex justify-center">
                <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <button className="bg-[#25D366] text-white px-3 text-sm py-2 rounded-sm flex items-center space-x-2">
                    <FaWhatsapp />
                    <span>Passer la commande</span>
                  </button>
                </a>
              </div>
              <div className="mt-12 flex justify-center">
                <button
                  onClick={handleShare}
                  className="bg-[#25D366] text-white px-3 text-sm py-2 rounded-sm flex items-center space-x-2"
                >
                  <span>Partager</span>
                </button>
              </div>
            </>
          ) : (
                <>
                  <div className="flex justify-center">
                    <Link to={"/"}>
                      <p className="mt-3 bg-[#25D366] px-2 py-2 w-auto rounded-sm text-white">
                        Voir le catalogue
                      </p>
                    </Link>
                  </div>
                </>
          )}
        </div>
    </div>
  );
};

export default Cart;
