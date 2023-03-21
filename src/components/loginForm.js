import React from 'react';
import authStores from '../stores/authStores';
import "../App.css"
import {useNavigate } from 'react-router-dom';

function LoginForm() {
  const store = authStores();
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    await store.submitLogin(e);
    navigate("/")
  }
  return (

    <div>

      <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div>
              <label>Email address <br/></label>
              <input onChange={store.updateLogin} value={store.login.email} type="email" name="email" className="form-control mt-1" placeholder="Enter email"  />
            </div>
            <div>
              <label><br/>Password<br/></label>
              <input onChange={store.updateLogin} value={store.login.password} type="password" name="password" className="form-control mt-1" placeholder="Enter password"/>
              </div>
            <div>
              <button className="Auth-form-login-button" type="submit">Submit</button> 
            </div>
          </div>
        </form>
     
    </div>

    
  );
}

export default LoginForm;