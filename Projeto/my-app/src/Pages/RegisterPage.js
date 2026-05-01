import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const exists = users.find(u => u.email === signupData.email);
    if (exists) {
      setErro('Este email já está registado.');
      return;
    }

    users.push(signupData);
    localStorage.setItem('users', JSON.stringify(users));

    navigate('/login');
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-5">
          <div className="card bg-dark text-white border-secondary">
            <div className="card-body p-4">
              <h4 className="mb-4">Criar conta</h4>

              {erro && (
                <div className="alert alert-danger">{erro}</div>
              )}

              <form onSubmit={handleSignup}>
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
                <p className="text-center mt-3 text-secondary">
                  Já tens conta?{' '}
                  <span
                    className="text-primary"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/login')}
                  >
                    Faz login aqui
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

export default RegisterPage;
