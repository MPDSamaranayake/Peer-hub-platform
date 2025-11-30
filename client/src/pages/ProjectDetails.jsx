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

  useEffect(() => { 
    api.get(`/projects/${id}`).then((res) => setProject(res.data));}, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <p><b>Skills:</b> {project.skills.join(", ")}</p>
      <p><b>Type:</b> {project.type}</p>

      <button onClick={sendJoin}>Join Project</button>
          
      <h3>Required Skills:</h3>
      <ul>
        {project.requiredSkills.map(s => <li>{s}</li>)}
      </ul>
    </div>
  );
}
