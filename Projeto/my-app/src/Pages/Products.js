import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GameCard from '../componentes/GameCard';

function Products() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 6;

  const location = useLocation();
  const searchParam = new URLSearchParams(location.search).get('search') || '';

  useEffect(() => {
    fetch('http://localhost:3030/games')
      .then(response => response.json())
      .then(data => {
        setGames(data);
      })
      .catch(error => console.error('Erro ao carregar jogos:', error));
  }, []);

  useEffect(() => {
    let result = [...games];

    if (searchParam) {
      result = result.filter(game =>
        game.title.toLowerCase().includes(searchParam.toLowerCase())
      );
    }

    if (genre) {
      result = result.filter(game => game.genre === genre);
    }

    if (sortBy === 'price') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredGames(result);
    setCurrentPage(1);
  }, [games, genre, sortBy, searchParam]);

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const currentGames = filteredGames.slice(startIndex, startIndex + gamesPerPage);

  const genres = ['Action', 'RPG', 'Sports', 'Adventure', 'Shooter', 'Strategy'];

  return (
    <div className="container my-5">
      <h2 className="text-white mb-4">🎮 Todos os Jogos</h2>

      {/* Filtros */}
      <div className="row mb-4 g-3">
        <div className="col-12 col-md-4">
          <select
            className="form-select bg-dark text-white border-secondary"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Todos os géneros</option>
            {genres.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-4">
          <select
            className="form-select bg-dark text-white border-secondary"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Ordenar por...</option>
            <option value="price">Preço (mais barato primeiro)</option>
            <option value="rating">Rating (melhor primeiro)</option>
          </select>
        </div>
        {searchParam && (
          <div className="col-12">
            <p className="text-white">
              Resultados para: <strong>"{searchParam}"</strong>
            </p>
          </div>
        )}
      </div>

      {/* Grelha de Jogos */}
      <div className="row g-4">
        {currentGames.length > 0 ? (
          currentGames.map(game => (
            <div className="col-12 col-md-6 col-lg-4" key={game.id}>
              <GameCard game={game} />
            </div>
          ))
        ) : (
          <p className="text-white">Nenhum jogo encontrado.</p>
        )}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                  <button
                    className="page-link bg-dark text-white border-secondary"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Products;
