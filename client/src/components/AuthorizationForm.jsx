import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  Button,
  TextField,
  Box,
  Container,
  Alert,
  Snackbar,
  Grid
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { authApi } from '../api/actions'
import { useDispatch } from 'react-redux'
import { validationRules } from '../utils/validationRules'

export const AuthorizationForm = ({ toggleSignMode }) => {
  const [isOpenSnack, setIsOpenSnack] = useState(false)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setIsOpenSnack(false)
  }

  const dispatch = useDispatch()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    // reset,
  } = useForm({ mode: 'onChange' })

  const onSubmit = async (formData) => {
    dispatch(authApi.login(formData))
  }

  return (
    <>
      <Typography variant="h4" textAlign={'center'}>
        Welcome to{' '}
        <Typography variant="h4" component="span" sx={{ fontWeight: 'bold' }}>
          demo-social
        </Typography>
      </Typography>
      <Container maxWidth="xs">
        <Box
          mt={3}
          component="form"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                // value={authData.username}
                // onChange={(e) => {
                //   setAuthData({ ...authData, username: e.target.value })
                // }}
                {...register('email', {
                  required: validationRules.email.required,
                  pattern: {
                    value: validationRules.email.pattern,
                    message: validationRules.email.patternError,
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
                {...register('password', {
                  required: validationRules.password.required,
                  minLength: {
                    value: 8,
                    message: validationRules.password.minValue,
                  },
                  maxLength: {
                    value: 32,
                    message: validationRules.password.maxValue,
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
              <Button
                component="label"
                fullWidth color="warning"
                onClick={() => setIsOpenSnack(true)}
              >
                Forgot your password?
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                sx={{ mt: 5 }}
                size="small"
                color="secondary"
                onClick={toggleSignMode}
              >
                {`Don't have an account? Sign up`}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={!isValid}
                type="submit"
                fullWidth
                variant="contained">
                sign in
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>


      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isOpenSnack}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Ooops, it&apos;s not implemented yet)
        </Alert>
      </Snackbar>
    </>
  )
}

AuthorizationForm.propTypes = {
  toggleSignMode: PropTypes.func,
}
