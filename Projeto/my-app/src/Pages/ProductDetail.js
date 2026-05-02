import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import GameCard from '../componentes/GameCard';
import { Container, Row, Col, Badge, Button, Image } from 'react-bootstrap';

function ProductDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [similarGames, setSimilarGames] = useState([]);
  
  const { addToCart, addToFavorites, removeFromFavorites, favorites } = useContext(AppContext);

  const isFavorite = favorites.find(item => String(item.id) === String(id));

  useEffect(() => {
    fetch(`http://localhost:3030/games/${id}`)
      .then(response => response.json())
      .then(data => {
        setGame(data);
        fetch(`http://localhost:3030/games?genre=${data.genre}`)
          .then(res => res.json())
          .then(similar => {
            const filtered = similar.filter(g => String(g.id) !== String(data.id)).slice(0, 4);
            setSimilarGames(filtered);
          });
      })
      .catch(error => console.error('Erro ao carregar jogo:', error));
  }, [id]);

  function renderStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? '★' : '☆';
    }
    return stars;
  }

  if (!game) {
    return (
      <Container className="my-5 text-white text-center">
        <p>A carregar...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="g-4">
        <Col xs={12} md={5}>
          <Image
            src={game.image}
            alt={game.title}
            fluid
            rounded
            style={{ width: '100%' }}
          />
        </Col>

        <Col xs={12} md={7} className="text-white">
          <Badge bg="secondary" className="mb-2">{game.genre}</Badge>
          <h1>{game.title}</h1>
          <p className="text-warning fs-4 mb-2">{renderStars(game.rating)}</p>
          <p>{game.description}</p>
          <p className="text-secondary">Plataforma: {game.platform}</p>
          <h3 className="text-info">{game.price}€</h3>

          <div className="d-flex gap-3 mt-3 flex-wrap">
            <Button
              variant="primary"
              onClick={() => addToCart(game)}
            >
              🛒 Adicionar ao Carrinho
            </Button>
            
            <Button
              variant={isFavorite ? 'danger' : 'outline-danger'}
              onClick={() => isFavorite ? removeFromFavorites(game.id) : addToFavorites(game)}
            >
              ❤️ {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
            </Button>
          </div>
        </Col>
      </Row>

      {similarGames.length > 0 && (
        <div className="mt-5">
          <h3 className="text-white mb-4">Jogos Similares</h3>
          <Row className="g-4">
            {similarGames.map(g => (
              <Col xs={12} md={6} lg={3} key={g.id}>
                <GameCard game={g} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
}

export default ProductDetail;