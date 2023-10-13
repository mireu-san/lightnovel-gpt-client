import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // 사용자 이름과 비밀번호 입력 값을 저장하기 위한 상태
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    // 프로그래밍 방식으로 다른 라우트로 이동하기 위한 훅
    const navigate = useNavigate();

    // 로그인을 처리하기 위한 핸들러 함수
    const handleLogin = () => {
        // 로그인 엔드포인트로 POST 요청을 보냄
        axios.post('http://localhost/api/token/', {
                username: username,
                password: password
        })
        .then((response) => {
                // 로컬 스토리지에 토큰을 저장
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                // 홈 라우트로 이동
                navigate('/'); 
        })
        .catch(() => {
                // 로그인 실패시 경고 메시지 표시
                alert('Login failed');
        });
    };

    return (
        <div>
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
