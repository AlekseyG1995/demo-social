import {
  Typography,
  Button,
  TextField,
  Box,
  Grid,
  Container
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { authApi } from '../api/actions'
import { validationRules } from '../utils/validationRules'

const Account = () => {
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onChange' })

  const onSubmit = async (formData) => {
    formData.file = formData.file[0] || null
    dispatch(authApi.update(formData))
    reset()
    dispatch(authApi.profile())
  }

  return (
    <div>
      <Typography variant="h4" textAlign={'center'}>
        Edit your account
      </Typography>
      <Container maxWidth="xs">
        <Box mt={3}
          component='form'
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                {...register('username', {
                  required: validationRules.username.required,
                })}
                error={!!errors?.username}
                helperText={errors?.username?.message}
                sx={{ mb: 1 }}
                autoFocus
                fullWidth
                label="Username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
              <Button fullWidth component="label">
                Upload your avatar
                <input
                  type="file"
                  {...register('file')}
                  accept="image/*"
                  color="primary"
                  hidden
                />
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ mt: 5 }}>
              <Button
                disabled={!isValid} type="submit" fullWidth variant="contained"
              >
                save changes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default Account
