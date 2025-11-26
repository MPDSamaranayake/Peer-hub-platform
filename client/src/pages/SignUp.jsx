import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

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
    <div className="form-container fade-in">
      <h2 className="form-title">Join PeerHub</h2>
      <p className="text-center mb-4" style={{ color: '#666' }}>
        Create your account and start collaborating
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="text"
            placeholder="Full Name" 
            className="form-input"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        
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
        
        <div className="form-group">
          <input 
            type="text"
            placeholder="Skills (e.g., React, Python, Design)" 
            className="form-input"
            value={form.skills}
            onChange={e => setForm({ ...form, skills: e.target.value })}
          />
          <small style={{ color: '#666', fontSize: '0.9rem' }}>
            Enter your skills separated by commas
          </small>
        </div>
        
        <button 
          type="submit" 
          className="form-button"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      
      <p className="text-center mt-3" style={{ color: '#666' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#667eea', fontWeight: '600' }}>
          Sign in here
        </Link>
      </p>
    </div>
  );
}
