import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"

import { Provider } from "react-redux"
import AccountPage from "./pages/Account"
import App from "./pages/App"
import ErrorPage from "./pages/Error"
import IndexPage from "./pages/Index"
import PeoplePage from "./pages/People"
import { store } from "./redux/store"
import { RequireAuth } from "./hocs/RequireAuth"
// import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route
              index
              path="/"
              element={
                <RequireAuth inversionAuth>
                  <IndexPage />
                </RequireAuth>
              }
            />
            <Route
              path="/account"
              element={
                <RequireAuth>
                  <AccountPage />
                </RequireAuth>
              }
            />
            <Route
              path="/people"
              element={
                <RequireAuth>
                  <PeoplePage />
                </RequireAuth>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
