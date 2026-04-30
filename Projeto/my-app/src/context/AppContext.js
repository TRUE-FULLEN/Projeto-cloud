import { useState, createContext } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loggedUser, setLoggedUser] = useState(() => {
    return JSON.parse(localStorage.getItem('loggedUser'));
  });

  function addToCart(game) {
    const exists = cart.find(item => item.id === game.id);
    if (exists) {
      setCart(cart.map(item =>
        item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...game, quantity: 1 }]);
    }
  }

  function removeFromCart(id) {
    setCart(cart.filter(item => item.id !== id));
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item
      ));
    }
  }

  function addToFavorites(game) {
    const exists = favorites.find(item => item.id === game.id);
    if (!exists) {
      setFavorites([...favorites, game]);
    }
  }

  function removeFromFavorites(id) {
    setFavorites(favorites.filter(item => item.id !== id));
  }

  function login(user) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    setLoggedUser(user);
  }

  function logout() {
    localStorage.removeItem('loggedUser');
    setLoggedUser(null);
  }

  return (
    <AppContext.Provider value={{ cart, favorites, addToCart, removeFromCart, updateQuantity, addToFavorites, removeFromFavorites, loggedUser, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
