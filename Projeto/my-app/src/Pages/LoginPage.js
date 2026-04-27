import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });

  function handleLogin(e) {
    e.preventDefault();
    navigate('/');
  }

  function handleSignup(e) {
    e.preventDefault();
    setIsLogin(true);
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-5">
          <div className="card bg-dark text-white border-secondary">
            <div className="card-body p-4">

              {/* Botões Login / Registar */}
              <div className="d-flex mb-4 gap-2">
                <button
                  className={`btn flex-grow-1 ${isLogin ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button
                  className={`btn flex-grow-1 ${!isLogin ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setIsLogin(false)}
                >
                  Registar
                </button>
              </div>

              {/* Formulário Login */}
              {isLogin ? (
                <form onSubmit={handleLogin}>
                  <h4 className="mb-4">Entrar na conta</h4>
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
                </form>

              ) : (
                /* Formulário Registar */
                <form onSubmit={handleSignup}>
                  <h4 className="mb-4">Criar conta</h4>
                  <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                      type="text"
                      className="form-control bg-dark text-white border-secondary"
                      placeholder="O teu nome"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control bg-dark text-white border-secondary"
                      placeholder="email@exemplo.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control bg-dark text-white border-secondary"
                      placeholder="Escolhe uma password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Criar Conta
                  </button>
                </form>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
