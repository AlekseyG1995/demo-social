import { Provider } from 'react-redux'
import AccountPage from './pages/Account'
import AppPage from './pages/App'
import ErrorPage from './pages/Error'
import IndexPage from './pages/Index'
import PeoplePage from './pages/People'
import { store } from './redux/store'
import { RequireAuth } from './hocs/RequireAuth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss'


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppPage />}>
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
  );
}

export default App;
