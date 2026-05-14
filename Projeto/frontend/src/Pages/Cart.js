import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(AppContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container my-5">
      <h2 className="text-white mb-4">🛒 Carrinho de Compras</h2>

      {cart.length === 0 ? (
        <p className="text-white">O teu carrinho está vazio.</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Jogo</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Subtotal</th>
                  <th>Remover</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.price}€</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{(item.price * item.quantity).toFixed(2)}€</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-end text-white">
            <h4>Total: {total.toFixed(2)}€</h4>
            <button className="btn btn-success mt-2">
              ✅ Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
