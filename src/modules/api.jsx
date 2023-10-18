import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


// API의 기본 URL 설정
const baseURL = `http://localhost/chatbot/api/chat/`;

// 커스텀 훅 정의
export const useApi = () => {
  // 리액트 라우터의 useNavigate 훅을 사용하여 페이지 이동을 관리
  const navigate = useNavigate();

  // API에 POST 요청을 보내는 함수
  const apiPost = async (data) => {
    // 로컬 스토리지에서 토큰을 가져옴
    const token = localStorage.getItem('access_token');

    try {
      const result = await axios.post(baseURL, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        maxBodyLength: Infinity,
      });
      return result.data;
    } catch (error) {
      // 오류 발생 시 처리
      if (error.response && error.response.status === 401) {
        console.log("Token has expired. Redirecting to login page...");
        navigate('/login'); // 토큰이 만료된 경우 로그인 페이지로 리다이렉트
      } else {
        throw error; // 그 외의 오류는 상위로 전파
      }
    }
  };

  // JWT 토큰의 유효성을 확인하는 함수
  const checkTokenExpiration = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!accessToken || !refreshToken) {
        console.log("No access_token or refresh_token found in localStorage.");
        return;
    }

    const decodedToken = jwtDecode(accessToken);
    const expirationDate = new Date(decodedToken.exp * 1000);
    const now = new Date();

    if (now > expirationDate) {
        console.log("Token has expired. Trying to refresh...");

        try {
            const response = await axios.post('http://localhost/users/api/token/refresh/', {
                refresh: refreshToken
            });
            
            localStorage.setItem('access_token', response.data.access);
            console.log("Token refreshed successfully.");

        } catch (error) {
            console.log("Error refreshing token:", error);
            navigate('/login');  // Redirect to login page if token refresh fails
        }
    } else {
        console.log("Token is still valid. Expires at:", expirationDate);
    }
}

  // apiPost와 checkTokenExpiration 함수를 반환
  return {
    apiPost,
    checkTokenExpiration
  };  
}
