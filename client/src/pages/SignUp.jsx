import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '', skills: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    await signup({ ...form, skills: form.skills.split(',') });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <input placeholder="Skills (comma-separated)" onChange={e => setForm({ ...form, skills: e.target.value })} />
      <button>Sign Up</button>
    </form>
  );
}
