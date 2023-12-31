import { useContext, useEffect } from 'react';
import './styles/FrontPage.css';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';
import Logout from './modules/logout'; 
import { AuthContext } from './AuthContext';

const FrontPage = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

    return (
        <>
            <div className="Front_Header">
                <h1>Light Novel GPT</h1>
                <p>Generate light novel text with GPT-3.5</p>
                <Header />
                {isLoggedIn ? (  // Conditional rendering based on isLoggedIn state
                    <Logout />
                ) : (
                    <>
                        <Link className="frontPage_login" to="/login">Login</Link>
                        <Link className="frontPage_signUp" to="/signup">Sign Up</Link>
                    </>
                )}
            </div>

            <div className='Front_Container'>
                <Body />
            </div>

            <div className="Front_Footer">
                <Footer />
            </div>
        </>
    );
};

export default FrontPage;
