import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import './Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [skill, setSkill] = useState("");
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/projects?skill=${skill}`);
      setProjects(res.data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProjects(); }, []);

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>Discover Projects</h1>
        <p>Find exciting projects to collaborate on</p>
      </div>

      <div className="search-section">
        <div className="search-container">
          <input 
            className="search-input"
            placeholder="Search by skill (e.g., React, Python, Design...)" 
            value={skill}
            onChange={e => setSkill(e.target.value)}
          />
          <button className="search-button" onClick={loadProjects}>
            🔍 Filter
          </button>
        </div>
      </div>

      <div className="projects-content">
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading projects...</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="projects-grid">
            {projects.map(p => (
              <Link key={p._id} to={`/project/${p._id}`} className="project-card-link">
                <div className="project-card">
                  <div className="project-header">
                    <h3 className="project-title">{p.title}</h3>
                    <div className="project-author">
                      By {p.createdBy?.name || 'Anonymous'}
                    </div>
                  </div>
                  <p className="project-description">{p.description}</p>
                  {p.requiredSkills && p.requiredSkills.length > 0 && (
                    <div className="project-skills">
                      {p.requiredSkills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                      {p.requiredSkills.length > 3 && (
                        <span className="skill-tag more">+{p.requiredSkills.length - 3} more</span>
                      )}
                    </div>
                  )}
                  <div className="project-footer">
                    <span className="view-details">View Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-projects">
            <div className="no-projects-icon">📋</div>
            <h3>No projects found</h3>
            <p>No projects match your search criteria. Try a different skill or browse all projects.</p>
            {skill && (
              <button 
                className="btn btn-secondary" 
                onClick={() => { setSkill(''); loadProjects(); }}
              >
                Show All Projects
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
