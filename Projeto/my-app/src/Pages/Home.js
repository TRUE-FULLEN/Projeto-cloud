import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from '../componentes/GameCard';

function Home() {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3030/games')
      .then(response => response.json())
      .then(data => {
        const top8 = data.sort((a, b) => b.rating - a.rating).slice(0, 8);
        setFeaturedGames(top8);
      })
      .catch(error => console.error('Erro ao carregar jogos:', error));
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim() !== '') {
      navigate(`/products?search=${search}`);
    }
  }

  return (
    <div>
      {/* Secção Hero */}
      <div className="hero text-white text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">🎮 Feira do Jogo</h1>
          <p className="lead">Os melhores jogos ao melhor preço</p>
          <form onSubmit={handleSearch} className="d-flex justify-content-center gap-2 mt-4">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Pesquisar jogos por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              🔍 Pesquisar
            </button>
          </form>
        </div>
      </div>

      {/* Jogos em Destaque */}
      <div className="container my-5">
        <h2 className="text-white mb-4">⭐ Jogos em Destaque</h2>
        <div className="row g-4">
          {featuredGames.map(game => (
            <div className="col-12 col-md-6 col-lg-3" key={game.id}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
