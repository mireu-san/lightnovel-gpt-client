import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import '../styles/signUp.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Initialize useNavigate

    const handleSignup = () => {
        axios.post('http://localhost/users/users/signup/', {
            username: username,
            password: password
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(() => {
            alert('Signup successful! You can now log in with it.');
            navigate('/');
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                if (error.response.data.error === 'user_exists') {
                    alert('이미 등록된 유저입니다.');
                } else {
                    alert('입력하신 정보를 확인해주세요.');  // Updated error message
                }
            } else {
                alert('Signup failed');
            }
        });
    };
    

    return (
        <div className="signup-container">
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
};

export default Signup;
