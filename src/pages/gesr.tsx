
const ShareButton = () => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Titre du partage',
          text: 'Texte à partager',
          url: 'https://example.com', // URL à partager
        });
        console.log('Partager réussi');
      } else {
        alert('La fonctionnalité de partage n\'est pas supportée sur ce navigateur.');
      }
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  };

  return (
    <button onClick={handleShare}>
      Partager
    </button>
  );
};

export default ShareButton;
