import { Outlet, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import requests from './api/requests';
import Nav from './components/Nav';
import styled from 'styled-components';
import Banner from './components/Banner';
import Category from './components/Category';
import Row from './components/Row';
import LoginPage from './pages/login';
import MainPage from './pages/main';
import SearchPage from './pages/search';
import DetailPage from './pages/detail';
import Login from './components/Login';

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="login" element={<Login />} /> */}
          <Route index element={<LoginPage />}></Route>
          <Route path="main" element={<MainPage />}></Route>
          <Route path=":movieId" element={<DetailPage />}></Route>
          <Route path="search" element={<SearchPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
