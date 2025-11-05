import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/login', { username, password });
      if (!data?.token) return rejectWithValue('Сервер не вернул токен');
      localStorage.setItem('token', data.token);
      return data.token;
    } catch (err) {
      if (err.response?.status === 401) {
        return rejectWithValue('Неверное имя пользователя или пароль');
        }
         return rejectWithValue('Не удалось войти. Попробуйте еще раз.');
      }
    },
);


const initialToken = localStorage.getItem('token');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem('token');
  },
  setToken(state, { payload }) {
    state.token = payload;
    if (payload) localStorage.setItem('token', payload);
  },
},
extraReducers: (builder) => {
  builder
    .addCase(login.pending, (state) => {
    state.status = 'loading';
    state.error = null;
    })
  .addCase(login.fulfilled, (state, { payload }) => {
    state.status = 'succeeded';
    state.token = payload;
    })
  .addCase(login.rejected, (state, { payload }) => {
    state.status = 'failed';
    state.error = payload || 'Ошибка авторизации';
    });
  },
});
export const { logout, setToken } = authSlice.actions;
export const selectIsAuth = (state) => Boolean(state.auth.token);
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export default authSlice.reducer;
