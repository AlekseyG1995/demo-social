import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import AccountPage from './pages/Account';
import ErrorPage from './pages/Error';
import IndexPage from './pages/Index';
import PeoplePage from './pages/People';
// import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<IndexPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/people" element={<PeoplePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


