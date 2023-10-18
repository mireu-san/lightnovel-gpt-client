// import { useState } from 'react'
import './styles/FrontPage.css'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'
import { Link } from 'react-router-dom';

const FrontPage = () => {
  return (
    <>
      <div className="Front_Header">
        <h1>Light Novel GPT</h1>
        <p>Generate light novel text with GPT-3.5</p>
        <Header />
        <Link className="frontPage-login" to="/login">Login</Link>
        <Link className="frontPage-signUp" to="/signup">Sign Up</Link>
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


export default FrontPage
