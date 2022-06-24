import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contex/authContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const {user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
      e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  
  console.log(user)
  let x = document.getElementById('login');
  let y = document.getElementById('register');
  let z = document.getElementById('btn');

  const moveLogin = () => {
    x.style.left = '50px';
    y.style.left = '450px';
    z.style.left = '0px';
  }
  const moveRegister = () => {
    x.style.left = '-400px';
    y.style.left = '50px';
    z.style.left = '110px';
  }

  let modal = document.getElementById('login-form');
  window.onclick = (event) => {
      if (event.target == modal) {
          modal.style.display = 'none';
      } else {
          console.log("Not working...")
      }
  }

  return (

    <div id="login-form" className="login-page">
            <div className="form-box">
                <div className="button-box">
                    <div id="btn"></div>
                    <button className="toggle-btn" type="button" onClick={moveLogin}>Log In</button>
                    <button type="button" className="toggle-btn" onClick={moveRegister}>Register</button>
                </div>
                <form id="login" className="input-group-login" action="" method="POST"> <br/> <br/>
                <input className="form-control input-field" id="username" type="text" placeholder="Username..."  onChange={handleChange} required/><br/><br/><br/>
                <input className="form-control input-field" id="password" required placeholder="Password..." type="password" onChange={handleChange}/><br/><br/>         
                <input type="checkbox" className="checkbox"/><span>Remember Password</span> 
                <button  disabled={loading} onClick={handleClick} type="submit" className="submit-btn">Log in</button>
                {error && <span>{error.message}</span>}                
            </form>
           <form action="" method="post" id="register" className="input-group-register"> <br/>
                   {/*   <input type="text" placeholder="First Name" required className="input-field" id=""/><br/><br/><br/>
                    <input type="text" placeholder="Last Name" required className="input-field" id=""/><br/><br/><br/>
                    <input type="email" placeholder="Email Id" required className="input-field" id=""/><br/><br/><br/>
                    <input type="password" placeholder="Confirm Password" required className="input-field" id=""/><br/><br/><br/>
                    <input type="checkbox" className="checkbox" id=""/><span>I agree to the terms and conditions.</span>  
                    <button type="submit" className="submit-btn">Register</button>*/}
               </form> 
            </div>
        </div>
        
    //  <div classNameName="login">
      // <div classNameName="lContainer">
        // <input
          // type="text"
          // placeholder="username"
          // id="username"
          // onChange={handleChange}
          // classNameName="lInput"
        // />
        // <input
          // type="password"
          // placeholder="password"
          // id="password"
          // onChange={handleChange}
          // classNameName="lInput"
        // />
        // <button disabled={loading} onClick={handleClick} classNameName="lButton">
          // Login
        // </button>
        // {error && <span>{error.message}</span>}
      // </div>
    // </div> 

  );
};

export default Login;