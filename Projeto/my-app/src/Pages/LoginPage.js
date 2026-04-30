import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function LoginPage() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AppContext);

  function handleLogin(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(
      u => u.email === loginData.email && u.password === loginData.password
    );

    if (!user) {
      setErro('Email ou password incorretos.');
      return;
    }

    login(user);
    navigate('/');
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-5">
          <div className="card bg-dark text-white border-secondary">
            <div className="card-body p-4">
              <h4 className="mb-4">Entrar na conta</h4>

              {erro && (
                <div className="alert alert-danger">{erro}</div>
              )}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="email@exemplo.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
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
