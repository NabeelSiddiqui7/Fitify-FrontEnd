import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from './Pages/Main';
import Login from './Pages/Login'
import Register from './Pages/Register';
import axios from 'axios';

export const UserContext = React.createContext<[{ accesstoken: string, id: number, email: string, username: string }, React.Dispatch<React.SetStateAction<{ accesstoken: string, id: number, email: string, username: string }>>]>({} as any);

function App() {
  const [user, setUser] = useState({ accesstoken: '', id: -1, email: '', username: '' });

  const logoutCallback = async () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/logout`;
    const res = await axios.post(url, null, {
      withCredentials: true,
    }).then((resp) => {
      setUser({ accesstoken: '', id: -1, email: user.username, username: user.username });
      return <Navigate to="/login" />
    });
  }

  useEffect(() => {
    const checkRefreshToken = async () => {
      const url = `${process.env.REACT_APP_API_BASE_URL}/refresh_token`;
      const res = await axios.post(url, null, {
        withCredentials: true,
      }).then((resp) => {
        const data = resp.data;
        const token = data.accesstoken;
        const newUser = { accesstoken: data.accesstoken, id: data.id, email: data.email, username: data.username };
        setUser(newUser);
      });
    };
    checkRefreshToken();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main logoutCallback={logoutCallback} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
