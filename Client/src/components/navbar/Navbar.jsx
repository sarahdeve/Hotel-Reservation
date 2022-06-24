import { faFaceKissWinkHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contex/authContext';
import "./navbar.css"

const Navbar = () => {
  const {user} = useContext(AuthContext);
  console.log(user)

  const click = () => {
    document.getElementById('login-form').style.display='block'
    
  }

  return (
    <div className='navbar'>
      <div className='navContainer'>
        <span className='logo'>
          {/* 08153631985 */}
          <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
            <FontAwesomeIcon icon={faFaceKissWinkHeart}></FontAwesomeIcon> ZaraR
          </Link>
  
          </span>
        {
          user ? "Welcome," + " " + user.username : (
            <div className='navItems'>
            {/* <button className='navButton'>Register</button> */}
            <Link to="/login" >
              {/* <button className='navButton'>Login</button> */}
            <button type="submit" className="navButton" onClick={click}  >Login</button>
            </Link>
        </div>
          )
        }
      </div>
    </div>
  )
}

export default Navbar