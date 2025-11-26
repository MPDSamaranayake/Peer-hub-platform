import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  const load = async () => {
    const res = await api.get(`/projects/${id}`);
    setProject(res.data);
  };

  const sendJoin = async () => {
    await api.post(`/projects/${id}/join`);
    alert("Request Sent!");
  };

  useEffect(() => { load(); }, []);

  if (!project) return <p>Loading...</p>;

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>

      <button onClick={sendJoin}>Join Project</button>

      <h3>Required Skills:</h3>
      <ul>
        {project.requiredSkills.map(s => <li>{s}</li>)}
      </ul>
    </div>
  );
}
