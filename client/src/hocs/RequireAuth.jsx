import { useSelector, useDispatch } from "react-redux"
import { useLocation, Navigate } from "react-router-dom"

export const RequireAuth = ({ children, inversionAuth = false }) => {
  const location = useLocation()
  const isAuth = useSelector((state) => state.auth.isAuth)
  console.log("[HOC isAuth] ", isAuth)

  if (!isAuth && !inversionAuth) {
    return <Navigate to="/" state={{ from: location }} />
  } else if (isAuth && inversionAuth) {
    return <Navigate to="/people" />
  }
  return children
}
