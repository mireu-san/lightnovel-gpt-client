import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    // 사용자 이름과 비밀번호를 저장하기 위한 상태
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    // 네비게이션을 위한 훅
    const navigate = useNavigate();

    // 회원가입 처리를 위한 함수
    const handleSignUp = () => {
        // 회원가입 API에 POST 요청을 보냄
        axios.post('http://127.0.0.1:8000/users/', {
                username: username,
                password: password
        })
        .then(() => {
                // 회원가입 성공 알림 메시지 표시 후 로그인 페이지로 이동
                alert('회원가입이 성공적으로 완료되었습니다! 로그인 페이지로 이동합니다...');
                navigate('/login');
        })
        .catch(() => {
                // 회원가입 실패 알림 메시지 표시
                alert('회원가입에 실패하였습니다');
        });
    };

    return (
        <div>
            <label>
                사용자 이름:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                비밀번호:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button onClick={handleSignUp}>회원가입</button>
        </div>
    );
};

export default SignUp;
