import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { GlobalError, IUser, LoginMutation, RegisterMutation, RegisterResponse, ValidationError } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';


export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  {rejectValue: ValidationError}
>(
  'users/register',
  async (registerMutation: RegisterMutation, {rejectWithValue})=> {
    try{
      const response =  await axiosApi.post<RegisterResponse>('users/register', registerMutation);

      return response.data;
    } catch (e) {
      if(isAxiosError(e) && e.response && e.response.status === 400 ) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const login = createAsyncThunk<IUser, LoginMutation, {rejectValue: GlobalError}>(
  'users/login',
  async (loginMutation: LoginMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('users/sessions', loginMutation);

      return response.data.user;
    } catch (e) {
      if(isAxiosError(e) && e.response && e.response.status === 400 ) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);

export const logout = createAsyncThunk<void, void, {state: RootState}>(
  'users/logout',
  async (_,{getState}) => {
    const token = getState().users.user?.token;

    await axiosApi.delete('/users/sessions', {headers: {'Authorization': token}});
  }
);
