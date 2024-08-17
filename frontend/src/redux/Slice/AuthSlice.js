import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    user: "",
    success: null,
    loading: false,
    error: null,
};


// Login
export const register = createAsyncThunk(
    "auth/register",
    async (formData, { rejectWithValue }) => { 
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL}/api/process-data`, formData); 
            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// Login
export const getNotification = createAsyncThunk(
    "auth/register",
    async (formData, { rejectWithValue }) => { 
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL}/api/process-data`, formData); 
            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder

            // register
            .addCase(register.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.error = null;
                state.user = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ? action.payload : "Registration failed";
            })

    }
});

export default authSlice.reducer;
