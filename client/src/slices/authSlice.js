import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async (googleData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/auth/google/callback', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: googleData.tokenId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not authenticate user');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
