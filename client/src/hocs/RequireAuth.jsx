import { useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export const RequireAuth = ({ children, inversionAuth = false }) => {
  const location = useLocation()
  const isAuth = useSelector((state) => state.auth.isAuth)

  if (!isAuth && !inversionAuth) {
    return <Navigate to="/" state={{ from: location }} />
  } else if (isAuth && inversionAuth) {
    return <Navigate to="/people" />
  }
  return children
}

