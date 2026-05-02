import { useState, createContext } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState(() => {
    return JSON.parse(localStorage.getItem('loggedUser'));
  });

  const [cart, setCart] = useState(() => {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    if (user) {
      return JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
    }
    return [];
  });

  const [favorites, setFavorites] = useState(() => {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    if (user) {
      return JSON.parse(localStorage.getItem(`favorites_${user.email}`)) || [];
    }
    return [];
  });

  function addToCart(game) {
    const exists = cart.find(item => item.id === game.id);
    let newCart;
    if (exists) {
      newCart = cart.map(item =>
        item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...game, quantity: 1 }];
    }
    setCart(newCart);
    if (loggedUser) {
      localStorage.setItem(`cart_${loggedUser.email}`, JSON.stringify(newCart));
    }
  }

  function removeFromCart(id) {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    if (loggedUser) {
      localStorage.setItem(`cart_${loggedUser.email}`, JSON.stringify(newCart));
    }
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      const newCart = cart.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item
      );
      setCart(newCart);
      if (loggedUser) {
        localStorage.setItem(`cart_${loggedUser.email}`, JSON.stringify(newCart));
      }
    }
  }

  function addToFavorites(game) {
    const exists = favorites.find(item => item.id === game.id);
    if (!exists) {
      const newFavorites = [...favorites, game];
      setFavorites(newFavorites);
      if (loggedUser) {
        localStorage.setItem(`favorites_${loggedUser.email}`, JSON.stringify(newFavorites));
      }
    }
  }

  function removeFromFavorites(id) {
    const newFavorites = favorites.filter(item => item.id !== id);
    setFavorites(newFavorites);
    if (loggedUser) {
      localStorage.setItem(`favorites_${loggedUser.email}`, JSON.stringify(newFavorites));
    }
  }

  function login(user) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    setLoggedUser(user);

    const savedCart = JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
    const savedFavorites = JSON.parse(localStorage.getItem(`favorites_${user.email}`)) || [];
    setCart(savedCart);
    setFavorites(savedFavorites);
  }

  function logout() {
    localStorage.removeItem('loggedUser');
    setLoggedUser(null);

    setCart([]);
    setFavorites([]);
  }

  return (
    <AppContext.Provider value={{
      cart, favorites, loggedUser,
      addToCart, removeFromCart, updateQuantity,
      addToFavorites, removeFromFavorites,
      login, logout
    }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
