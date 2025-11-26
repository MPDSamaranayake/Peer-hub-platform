import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Home.css';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to PeerHub</h1>
          <p className="hero-subtitle">
            Connect, collaborate, and create amazing projects together
          </p>
          <p className="hero-description">
            Join a community of developers, designers, and innovators. 
            Find the perfect project to contribute to or start your own and find collaborators.
          </p>
          
          {user ? (
            <div className="hero-buttons">
              <Link to="/projects" className="btn btn-primary">
                Browse Projects
              </Link>
              <Link to="/create-project" className="btn btn-secondary">
                Create Project
              </Link>
            </div>
          ) : (
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose PeerHub?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Find Collaborators</h3>
              <p>Connect with like-minded developers who share your passion and complement your skills.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Innovative Projects</h3>
              <p>Work on cutting-edge projects that challenge you and help you grow as a developer.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Skill Building</h3>
              <p>Learn new technologies and improve your existing skills through real-world collaboration.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Global Community</h3>
              <p>Join developers from around the world and build projects that make a difference.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="container">
          <h2>Ready to Start Collaborating?</h2>
          <p>Join thousands of developers already building amazing projects together.</p>
          {!user && (
            <Link to="/signup" className="btn btn-large">
              Join PeerHub Today
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}