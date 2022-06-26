import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem
} from '@mui/material'
import InterestsIcon from '@mui/icons-material/Interests'
import { useDispatch, useSelector } from 'react-redux'
import { authApi } from '../api/actions'
import { signOut } from '../redux/actions/auth'

const AppBarMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const { isAuth, accountData } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      dispatch(authApi.profile())
    }
  }, [isAuth])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <InterestsIcon fontSize="large" />
            <Typography
              variant="h6"
              noWrap
              // component="Link"
              // href="/"
              sx={{
                ml: 2,
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              DEMO-SOCIAL
            </Typography>
          </Box>

          {isAuth && (
            <>
              <Box mr={3}>
                <Typography
                  sx={{ color: 'white' }}
                  component={Link}
                  to="/people"
                >
                  <Typography>People</Typography>
                </Typography>
              </Box>

              <Box mr={1}>
                <Typography>{accountData?.username || ''}</Typography>
              </Box>

              <Box>
                {/* <Typography>{accountData.username}</Typography> */}
                <Tooltip title="Profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Avatar"
                      src={accountData?.avatar ? accountData?.avatar : ''}>

                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    key="account"
                    onClick={() => {
                      handleCloseUserMenu()
                      navigate('/account', { replace: true })
                    }}
                  >
                    <Typography textAlign="center">account</Typography>
                  </MenuItem>
                  <MenuItem
                    key={'logout'}
                    onClick={() => {
                      handleCloseUserMenu()
                      dispatch(signOut())
                    }}
                  >
                    <Typography textAlign="center">logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default AppBarMenu
