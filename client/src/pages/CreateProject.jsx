import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CreateProject() {
  const [data, setData] = useState({
    title: "",
    description: "",
    requiredSkills: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/projects", {
        ...data,
        requiredSkills: data.requiredSkills.split(",").map(s => s.trim()).filter(s => s)
      });
      alert("Project Created Successfully!");
      navigate(`/project/${response.data._id}`);
    } catch (error) {
      alert('Error creating project: ' + (error.response?.data?.msg || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container fade-in">
      <h2 className="form-title">Create New Project</h2>
      <p className="text-center mb-4" style={{ color: '#666' }}>
        Share your project idea and find collaborators
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="text"
            placeholder="Project Title" 
            className="form-input"
            value={data.title}
            onChange={e => setData({ ...data, title: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <textarea 
            placeholder="Project Description - Describe what you want to build, the goals, and what kind of help you need..." 
            className="form-textarea"
            value={data.description}
            onChange={e => setData({ ...data, description: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <input 
            type="text"
            placeholder="Required Skills (e.g., React, Node.js, UI/UX Design)" 
            className="form-input"
            value={data.requiredSkills}
            onChange={e => setData({ ...data, requiredSkills: e.target.value })}
          />
          <small style={{ color: '#666', fontSize: '0.9rem' }}>
            Enter the skills you're looking for, separated by commas
          </small>
        </div>
        
        <button 
          type="submit" 
          className="form-button"
          disabled={loading}
        >
          {loading ? 'Creating Project...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
}
