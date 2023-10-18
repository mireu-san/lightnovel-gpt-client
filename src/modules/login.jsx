import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/logIn.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');  // Add password state
    
    const navigate = useNavigate();

    const handleLogin = () => {
        axios.post('http://localhost/users/api/token/', {
            username: username,
            password: password  // Send password data
        })
        .then((response) => {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            navigate('/'); 
        })
        .catch(() => {
            alert('Login failed');
        });
    };

    return (
        <div className="login-container">
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
