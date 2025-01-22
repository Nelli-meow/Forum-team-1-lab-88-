import { useState } from 'react';
import * as React from 'react';
import { RegisterMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { Link, useNavigate } from 'react-router-dom';
import { login } from './UsersThunk.ts';
import { Avatar, Box, Button, Container, TextField, Typography, Alert } from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Grid from '@mui/material/Grid2';
import Header from '../../components/Header/Header.tsx';
import { selectLoginError } from './UsersSlice.ts';


const initialState = {
  username: '',
  password: '',
};

const LoginPage = () => {
  const [form, setForm] = useState<RegisterMutation>({...initialState});
  const loginError = useAppSelector(selectLoginError);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit =  async  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

    try {
      await dispatch(login(form)).unwrap();
      navigate('/');
      setForm(initialState);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header />
      <>
        <Container>
          <Box
            sx={{
              marginTop:8,
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
            }}>
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
              <VpnKeyIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box sx={{
              marginTop:8,
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
            }}>
              {(loginError &&
                <Alert severity="error" sx={{mt:3, width: '100%'}}>
                  {loginError.error}
                </Alert>
              )}
            </Box>

            <Box component="form" noValidate onSubmit={onSubmit} sx={{mt: 3}}>
              <Grid container direction={'column'} size={12} spacing={2}>
                <TextField
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={form.username}
                  onChange={inputChange}
                />
              </Grid>

              <Grid container direction={'column'} size={12} spacing={2} sx={{mt: 3,mb: 2}}>
                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  value={form.password}
                  onChange={inputChange}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3,mb: 2}}
              >
                Sign In
              </Button>

              <Grid container justifyContent="center">
                <Grid>
                  <Link to="/register">Don't have an account?? Sign up</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </>
    </>
  );
};

export default LoginPage;