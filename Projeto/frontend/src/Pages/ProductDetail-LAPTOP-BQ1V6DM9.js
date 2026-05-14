import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import GameCard from '../componentes/GameCard';

function ProductDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [similarGames, setSimilarGames] = useState([]);
  const { addToCart, addToFavorites, favorites } = useContext(AppContext);

  const isFavorite = favorites.find(item => item.id === parseInt(id));

  useEffect(() => {
    fetch(`http://localhost:3030/games/${id}`)
      .then(response => response.json())
      .then(data => {
        setGame(data);
        fetch(`http://localhost:3030/games?genre=${data.genre}`)
          .then(res => res.json())
          .then(similar => {
            const filtered = similar.filter(g => g.id !== data.id).slice(0, 4);
            setSimilarGames(filtered);
          });
      })
      .catch(error => console.error('Erro ao carregar jogo:', error));
  }, [id]);

  function renderStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars += '★';
      } else {
        stars += '☆';
      }
    }
    return stars;
  }

  if (!game) {
    return (
      <div className="container my-5 text-white text-center">
        <p>A carregar...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Imagem */}
        <div className="col-12 col-md-5">
          <img
            src={game.image}
            alt={game.title}
            className="img-fluid rounded"
            style={{ width: '100%' }}
          />
        </div>

        {/* Detalhes */}
        <div className="col-12 col-md-7 text-white">
          <span className="badge bg-secondary mb-2">{game.genre}</span>
          <h1>{game.title}</h1>
          <p className="stars fs-4">{renderStars(game.rating)}</p>
          <p>{game.description}</p>
          <p className="text-secondary">Plataforma: {game.platform}</p>
          <h3 className="text-info">{game.price}€</h3>

          <div className="d-flex gap-3 mt-3 flex-wrap">
            <button
              className="btn btn-primary"
              onClick={() => addToCart(game)}
            >
              🛒 Adicionar ao Carrinho
            </button>
            <button
              className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => addToFavorites(game)}
            >
              ❤️ {isFavorite ? 'Nos Favoritos' : 'Adicionar aos Favoritos'}
            </button>
          </div>
        </div>
      </div>

      {/* Jogos Similares */}
      {similarGames.length > 0 && (
        <div className="mt-5">
          <h3 className="text-white mb-4">Jogos Similares</h3>
          <div className="row g-4">
            {similarGames.map(g => (
              <div className="col-12 col-md-6 col-lg-3" key={g.id}>
                <GameCard game={g} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
