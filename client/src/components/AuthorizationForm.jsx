import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Typography, Button, TextField, Box, Container, Alert, Snackbar, Grid } from "@mui/material"
import { useForm } from "react-hook-form"
import axios from "axios"
import useRequest from "../hooks/useRequest"
import { authApi } from "../api/actions"
import { useDispatch } from "react-redux"

export const AuthorizationForm = ({ toggleSignMode }) => {
  const [isOpenSnack, setIsOpenSnack] = useState(false)
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setIsOpenSnack(false)
  }

  const dispatch = useDispatch()

  // const [authData, setAuthData] = useState({
  //   username: "",
  //   password: "",
  // })

  // useEffect(() => {
  //   // DEBUG
  //   console.log("authData, ", authData)
  // }, [authData])
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" })

  const onSubmit = async (formData) => {
    dispatch(authApi.login(formData))
  }

  return (
    <>
      <Typography variant="h4" textAlign={"center"}>
        Welcome to{" "}
        <Typography variant="h4" component="span" sx={{ fontWeight: "bold" }}>
          demo-social
        </Typography>
      </Typography>
      <Container maxWidth="xs">
        <Box mt={3} component="form" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                // value={authData.username}
                // onChange={(e) => {
                //   setAuthData({ ...authData, username: e.target.value })
                // }}
                {...register("email", {
                  required: "email must be not empty",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Email is not valid",
                  },
                })}
                error={!!errors?.email}
                helperText={errors?.email?.message}
                sx={{ mb: 1 }}
                autoFocus
                fullWidth
                label="Email"
                type="email"
              />
              {/* {errors?.username && <p>Error!</p>} */}
            </Grid>

            <Grid item xs={12}>
              <TextField
                // value={authData.password}
                // onChange={(e) => {
                //   setAuthData({ ...authData, password: e.target.value })
                // }}
                {...register("password", {
                  required: "password must be not empty",
                  minLength: {
                    value: 8,
                    message: "password must be at least 8 characters",
                  },
                  maxLength: {
                    value: 32,
                    message: "password must be at maximum 32 characters",
                  },
                })}
                error={!!errors?.password}
                helperText={errors?.password?.message}
                sx={{ mb: 1 }}
                fullWidth
                type="password"
                label="Password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button component="label" fullWidth color="warning" onClick={() => setIsOpenSnack(true)}>
                Forgot your password?
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button fullWidth sx={{ mt: 5 }} size="small" color="secondary" onClick={toggleSignMode}>
                Don't have an account? Sign up
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button disabled={!isValid} type="submit" fullWidth variant="contained">
                sign in
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open={isOpenSnack} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Ooops, it's not implemented yet)
        </Alert>
      </Snackbar>
    </>
  )
}

AuthorizationForm.propTypes = {
  toggleSignMode: PropTypes.func,
}
