import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppProvider from './context/AppContext';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import Home from './Pages/Home';
import Products from './Pages/Products';
import ProductDetail from './Pages/ProductDetail';
import Favorites from './Pages/Favorites';
import Cart from './Pages/Cart';
import LoginPage from './Pages/LoginPage';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AppProvider>
  );
}

export default App;
