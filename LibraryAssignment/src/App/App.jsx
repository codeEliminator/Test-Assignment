import { useState } from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';

function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate()
  localStorage.removeItem('username')
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const response = await fetch('https://localhost:7206/Auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: userName, password: password }),
    });

    if (response.ok) {
      localStorage.setItem('username', userName);
      nav('/page')
    } else {
      const message = `An error occurred: ${response.statusText + ': Wrong Password'}`;
      window.alert(message);
    }
  };

  return (
    <Routes>
      <Route path="/" element={
        <div className='mainContainer'>
          <div className="container">
            <div className="logo">Test Assignment</div>
            <div className="login-item">
              <form className="form form-login" onSubmit={handleSubmit}>
                <div className="form-field">
                  <label className="user">
                    <span className="hidden">Username</span>
                  </label>
                  <input 
                    id="login-username" 
                    type="text" 
                    className="form-input" 
                    placeholder="Username" 
                    required 
                    onChange={(event) => {setUserName(event.target.value)}}
                  />
                </div>

                <div className="form-field">
                  <label className="lock">
                    <span className="hidden">Password</span>
                  </label>
                  <input 
                    id="login-password" 
                    type="password" 
                    className="form-input" 
                    placeholder="Password" 
                    required 
                    onChange={(event) => {setPassword(event.target.value)}}
                  />
                </div>

                <div className="form-field">
                  <input type="submit" value="Log in" />
                </div>
              </form>
            </div>
          </div>
        </div>
      } />
    </Routes>
  );
}

export default App;
