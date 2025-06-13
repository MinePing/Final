import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/Layout';
import Layout2 from './components/Layout2';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/Login/SignUp';

import Worcation from './pages/Worcation';

import Mypage from './pages/Mypage';
import BodyInfo from './pages/BodyInfo';
import Trial from './pages/Trial';

import MemberList from './pages/Member/MemberList';
import LayoutMember from './components/LayoutMember';
import Layout3 from './components/Layout3';
import Register from './pages/worcation/Register';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          {/* 레이아웃 적용*/}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/wrocation" element={<Worcation />} />
            <Route path="/trial" element={<Trial />} />
          </Route>
          <Route element={<Layout2 />}>
            <Route path="/my/info" element={<Mypage />} />
            <Route path="/my/body" element={<BodyInfo />} />
          </Route>

          <Route element={<LayoutMember />}>
            <Route path="/member/list" element={<MemberList />} />
              </Route>

          <Route element={<Layout3 />}>
            <Route path="/worcation/register" element={<Register />} />
          </Route>
          {/* 레이아웃 미적용*/}
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
