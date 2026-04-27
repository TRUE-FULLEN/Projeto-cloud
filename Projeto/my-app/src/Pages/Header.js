import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Header() {
  const { cart, favorites } = useContext(AppContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          🎮 Feira do Jogo
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Jogos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/favorites">
                ❤️ Favoritos
                {favorites.length > 0 && (
                  <span className="badge bg-danger ms-1">{favorites.length}</span>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                🛒 Carrinho
                {cart.length > 0 && (
                  <span className="badge bg-primary ms-1">{cart.length}</span>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
