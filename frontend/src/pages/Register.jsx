import {useState} from "react";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const register=async(ev) => {
    ev.preventDefault();
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      alert('registration successful');
    } else {
      alert('registration failed');
    }
  }
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button>Register</button>
    </form>
  );
}