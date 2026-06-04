import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function LoginPage() {
  const [loginData, setLoginData] = useState({ name: '', password: '' });
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AppContext);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error);
        return;
      }

      login(data.user);
      navigate('/');

    } catch (error) {
      setErro('Erro ao conectar com o servidor.');
    }
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-5">
          <div className="card bg-dark text-white border-secondary">
            <div className="card-body p-4">
              <h4 className="mb-4">Entrar na conta</h4>

              {erro && <div className="alert alert-danger">{erro}</div>}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Nome</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="O teu nome"
                    value={loginData.name}
                    onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="A tua password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Entrar
                </button>
                <p className="text-center mt-3 text-secondary">
                  Não tens conta?{' '}
                  <span
                    className="text-primary"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/register')}
                  >
                    Regista-te aqui
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
