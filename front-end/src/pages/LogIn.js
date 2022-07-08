import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Lottie from 'react-lottie';
import animationData from '../lotties/98525-password-lock.json';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { MyTheme } from '../components/';
import { Alert, Spinner } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate, authFailure, authSuccess } from '../redux/authActions';

import { userLogin } from '../api/authenticationService';

function LogIn({ loading, error, ...props }) {
  const history = useHistory();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const [values, setValues] = useState({
    userName: '',
    password: '',
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.authenticate();

    userLogin(values)
      .then((response) => {
        console.log('response', response.status);

        if (response.status === 200) {
          props.setUser(response.data);
          history.push('/dashboard');
        } else {
          console.log('not 200 sssssssssssssssssssssssssssssssssssssss');
          props.loginFailure('Something Wrong!Please Try Again');
        }
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 401:
              console.log('401 status');
              props.loginFailure('Authentication Failed.Bad Credentials');
              break;
            default:
              console.log('not 200 Ffffffffffffffffffffffffffffffff');
              props.loginFailure('Something Wrong!Please Try Again');
          }
        } else {
          console.log('not 200 nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn', err);
          props.loginFailure('Something Wrong!Please Try Again');
        }
      });
    console.log('Loading again', loading);
  };

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
    console.log('Name', e.target.name);
    console.log('Name', e.target.value);
  };

  return (
    <Grid
      container
      spacing={3}
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <Grid item xs={3}></Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={12} container>
        <Grid item container alignItems='flex-end' xs={6}>
          <Lottie options={defaultOptions} height={400} width={400} />
        </Grid>
        <Grid item xs={6} container justifyContent='center' alignItems='center'>
          {' '}
          <ThemeProvider theme={MyTheme}>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                value={values.userName}
                label='Email Address'
                name='userName'
                onChange={handleChange}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                value={values.password}
                id='password'
                onChange={handleChange}
                autoComplete='current-password'
              />

              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2, pt: 2 }}
                color='secondary'
              >
                <Typography variant='h6' align='center'>
                  LOGIN
                </Typography>
                {loading && (
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                )}
              </Button>
              <Grid container sx={{ mt: 5 }}>
                <Grid item>
                  <Link
                    href='#'
                    variant='body2'
                    underline='hover'
                    sx={{ ml: 16 }}
                  >
                    Haven't registered yet? Register here &rarr;
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </ThemeProvider>
        </Grid>
      </Grid>
    </Grid>
  );
}
const mapStateToProps = ({ auth }) => {
  console.log('state ', auth);
  return {
    loading: auth.loading,
    error: auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: () => dispatch(authenticate()),
    setUser: (data) => dispatch(authSuccess(data)),
    loginFailure: (message) => dispatch(authFailure(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
