import PropTypes from 'prop-types'
import {
  Typography,
  Button,
  TextField,
  Box, FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Container,
  Grid
} from '@mui/material'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import { useForm } from 'react-hook-form'
import { authApi } from '../api/actions'
import { useDispatch } from 'react-redux'
import { validationRules } from '../utils/validationRules'

export const RegistrationForm = ({ toggleSignMode }) => {
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    // reset,
  } = useForm({ mode: 'onChange' })

  const onSubmit = async (formData) => {
    formData.file = formData.file[0] || null
    dispatch(authApi.registraton(formData))
  }

  return (
    <>
      <Typography variant="h4" textAlign={'center'}>
        Sign up{' '}
        <Typography variant="h4" component={'span'} sx={{ fontWeight: 'bold' }}>
          demo-social
        </Typography>
      </Typography>
      <Container maxWidth="xs">
        <Box
          component="form"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          mt={3}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register('username', {
                  required: validationRules.username.required,
                })}
                error={!!errors?.username}
                helperText={errors?.username?.message}
                sx={{ mb: 1 }}
                autoFocus
                type="text"
                label="Username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
                type="email"
                label="Email"
                fullWidth
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
                type="password"
                label="Password"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('birthday', {
                  required: validationRules.DOB.required,
                })}
                error={!!errors?.birthday}
                helperText={errors?.birthday?.message}
                sx={{ mb: 1 }}
                type="date"
                fullWidth
                label=""
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="gender-radio-buttons">Gender</FormLabel>
                <RadioGroup
                  row
                  defaultValue="male"
                  aria-labelledby="gender-radio-buttons"
                  name="gender-radio-buttons"
                >
                  <FormControlLabel
                    value="male"
                    {...register('gender')}
                    control={<Radio />} label="Male" />

                  <FormControlLabel
                    value="female"
                    {...register('gender')}
                    control={<Radio />}
                    label="Female" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button fullWidth component="label">
                Upload your avatar
                <input
                  {...register('file')}
                  type="file"
                  accept="image/*"
                  multiple={false}
                  color="primary"
                  hidden
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                size="small"
                fullWidth
                sx={{ fontSize: '.75rem', mt: 5 }}
                onClick={() => toggleSignMode()}>
                Do you already have an account? Sign in
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={!isValid}
                type="submit"
                fullWidth
                endIcon={<ContactMailIcon />}
                variant="contained">
                register
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

RegistrationForm.propTypes = {
  toggleSignMode: PropTypes.func,
}
