import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {/* children prop을 사용하여 하위 컴포넌트들을 렌더링합니다 */}
      {children}  
    </AuthContext.Provider>
  );
};

// AuthProvider에 대해 children prop을 검증하기 위해 propTypes를 추가합니다
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,  // children은 필수 prop이며 React 노드여야 함을 나타냅니다
};

// typescript 쓰는게 좋지만, 예외적으로 prop-types 적용.