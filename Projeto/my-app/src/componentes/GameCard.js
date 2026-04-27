import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function GameCard({ game }) {
  const { addToCart, addToFavorites, favorites } = useContext(AppContext);

  const isFavorite = favorites.find(item => item.id === game.id);

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

  return (
    <div className="card h-100 bg-dark text-white border-secondary">
      <Link to={`/products/${game.id}`}>
        <img src={game.image} className="card-img-top" alt={game.title} />
      </Link>
      <div className="card-body">
        <span className="badge bg-secondary mb-2">{game.genre}</span>
        <h5 className="card-title">
          <Link to={`/products/${game.id}`} className="text-white text-decoration-none">
            {game.title}
          </Link>
        </h5>
        <p className="stars mb-1">{renderStars(game.rating)}</p>
        <p className="fw-bold text-info mb-0">{game.price}€</p>
      </div>
      <div className="card-footer d-flex gap-2">
        <button
          className="btn btn-primary btn-sm flex-grow-1"
          onClick={() => addToCart(game)}
        >
          🛒 Adicionar
        </button>
        <button
          className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
          onClick={() => addToFavorites(game)}
        >
          ❤️
        </button>
      </div>
    </div>
  );
}

export default GameCard;
