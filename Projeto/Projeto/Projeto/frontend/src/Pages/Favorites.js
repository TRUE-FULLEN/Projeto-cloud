import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import GameCard from '../componentes/GameCard';

function Favorites() {
  const { favorites } = useContext(AppContext);

  return (
    <div className="container my-5">
      <h2 className="text-white mb-4">❤️ Os Meus Favoritos</h2>

      {favorites.length === 0 ? (
        <p className="text-white">
          Ainda não adicionaste nenhum jogo aos favoritos.
        </p>
      ) : (
        <div className="row g-4">
          {favorites.map(game => (
            <div className="col-12 col-md-6 col-lg-3" key={game.id}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
