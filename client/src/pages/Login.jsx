import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.msg || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container fade-in">
      <h2 className="form-title">Welcome Back</h2>
      <p className="text-center mb-4" style={{ color: '#666' }}>
        Sign in to your account to continue
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="email"
            placeholder="Email address" 
            className="form-input"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <input 
            type="password"
            placeholder="Password" 
            className="form-input"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="form-button"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      
      <p className="text-center mt-3" style={{ color: '#666' }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: '#667eea', fontWeight: '600' }}>
          Sign up here
        </Link>
      </p>
    </div>
  );
}