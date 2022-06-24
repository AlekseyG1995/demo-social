import * as React from "react"

import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from "@mui/material"
import InterestsIcon from "@mui/icons-material/Interests"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { authApi } from "../api/actions"

const settings = ["Account", "Logout"]

const AppBarMenu = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const { isAuth, accountData } = useSelector((state) => state.auth)
  console.log("[useSelector TEST] ", isAuth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (isAuth) {
      dispatch(authApi.profile())
    }
  }, [isAuth])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <InterestsIcon fontSize="large" />
            <Typography
              variant="h6"
              noWrap
              // component="Link"
              // href="/"
              sx={{
                ml: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              DEMO-SOCIAL
            </Typography>
          </Box>
          {isAuth && (
            <>
              <Box mr={1}>
                <Typography>{accountData?.username || ""}</Typography>
              </Box>

              <Box>
                {/* <Typography>{accountData.username}</Typography> */}
                <Tooltip title="Profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Avatar"></Avatar>
                    {/* if Auth */}
                    {/* <Avatar alt="Avatar" src="/static/images/avatar/2.jpg" /> */}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
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
