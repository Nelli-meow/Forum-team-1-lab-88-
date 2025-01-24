import { useState } from 'react';
import  React from 'react';
import { RegisterMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectRegisterError, selectRegisterLoading } from './UsersSlice.ts';
import { Link, useNavigate } from 'react-router-dom';
import { register } from './UsersThunk.ts';
import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import VpnKeyOffIcon from '@mui/icons-material/VpnKeyOff';
import Grid from '@mui/material/Grid2';
import ButtonSpinner from '../../components/UI/ButtonSpinner/ButtonSpinner.tsx';

const initialState = {
  username: '',
  password: '',
};

const RegisterPage = () => {
  const [form, setForm] = useState<RegisterMutation>({...initialState});
  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);
  const navigate = useNavigate();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit =  async  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(register(form)).unwrap();
      navigate('/');
      setForm(initialState);
    } catch (e) {
      console.log(e);
    }
  };

  const getFiledError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch {
      return undefined;
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
          <VpnKeyOffIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{mt: 3}}>
          <Grid container direction={'column'} size={12} spacing={2}>
            <TextField
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={form.username}
              onChange={inputChange}
              error={Boolean(getFiledError('username'))}
              helperText={getFiledError('username')}
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
              error={Boolean(getFiledError('password'))}
              helperText={getFiledError('password')}
            />
          </Grid>
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3,mb: 2}}
          >
            Sign Up
            {loading ? <ButtonSpinner/> : null}
          </Button>
          <Grid container justifyContent="center">
            <Grid>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;