import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css';

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '', skills: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup({ ...form, skills: form.skills.split(',').map(s => s.trim()).filter(s => s) });
      navigate('/');
    } catch (error) {
      alert('Signup failed: ' + (error.response?.data?.msg || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background signup-bg">
        <div className="auth-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>
      
      <div className="auth-container">
        <div className="auth-card fade-in">
          <div className="auth-header">
            <div className="auth-icon">🚀</div>
            <h2 className="auth-title">Join PeerHub</h2>
            <p className="auth-subtitle">
              Create your account and start building amazing projects together
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <div className="input-icon">👤</div>
              <input 
                type="text"
                placeholder="Full Name" 
                className="auth-input"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            
            <div className="input-group">
              <div className="input-icon">📧</div>
              <input 
                type="email"
                placeholder="Email address" 
                className="auth-input"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            
            <div className="input-group">
              <div className="input-icon">🔒</div>
              <input 
                type="password"
                placeholder="Password" 
                className="auth-input"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            
            <div className="input-group">
              <div className="input-icon">🛠️</div>
              <input 
                type="text"
                placeholder="Skills (e.g., React, Python, Design)" 
                className="auth-input"
                value={form.skills}
                onChange={e => setForm({ ...form, skills: e.target.value })}
              />
              <small className="input-help">
                Enter your skills separated by commas
              </small>
            </div>
            
            <button 
              type="submit" 
              className="auth-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>Already have an account?</p>
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
