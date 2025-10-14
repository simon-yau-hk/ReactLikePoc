import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '~/context/AuthContext';
import { loginApi } from '~/API';

function Login() {
  console.log('123');
  console.log('Environment:', import.meta.env);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { checkAuth } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginApi.login(username, password);
      await checkAuth(); // Update auth state
      navigate('/'); // Redirect to landing page
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const checkVersion = async () => {
    navigate('/version');
  }
 
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <button onClick={(e) => checkVersion()}>check version</button>
      Enviornment: {import.meta.env.VITE_ENV}
    </div>
  );
}

export default Login; 