import * as React from 'react';
import { useState } from 'react';
import { RegisterMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { Link, useNavigate } from 'react-router-dom';
import { login } from './UsersThunk.ts';
import { Alert, Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Grid from '@mui/material/Grid2';
import { selectLoginError, selectLoginLoading } from './UsersSlice.ts';
import ButtonSpinner from '../../components/UI/ButtonSpinner/ButtonSpinner.tsx';

const initialState = {
  username: '',
  password: '',
};

const LoginPage = () => {
  const [form, setForm] = useState<RegisterMutation>({...initialState});
  const loginError = useAppSelector(selectLoginError);
  const loading = useAppSelector(selectLoginLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit =  async  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(login(form)).unwrap();
      navigate('/');
      setForm(initialState);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          width: '40%',
          margin: '20px auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(245,245,245,0.75)',
          borderRadius: '10px',
          padding: '30px 0',
        }}>
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box sx={{
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
              type="password"
              value={form.password}
              onChange={inputChange}
            />
          </Grid>
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3,mb: 2}}
          >
            Sign In
            {loading ? <ButtonSpinner/> : null}
          </Button>
          <Grid container justifyContent="center">
            <Grid>
              <Link to="/register">Don't have an account?? Sign up</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;