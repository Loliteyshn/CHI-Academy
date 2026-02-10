"use client";

import { getUserProfile, login, logout } from "@/actions/userActions";
import { LoginData } from "@/interfaces/LoginData";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    userName: null,
    isAuthenticated: false,
    error: null as string | null
};

export const fetchUser = createAsyncThunk(
    "auth/fetchUser",
    async (_, thunkApi) => {
        try {
            const profile = await getUserProfile();
            if (!profile || profile.error) {
                throw new Error(profile?.error || 'Failed to fetch user profile');
            }
            return profile;
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials: LoginData, thunkApi) => {
        try {
            const response = await login(credentials);
            if (!response || response.error) {
                throw new Error(response?.error || 'Login failed');
            }
            return response;
        } catch (err: any) {            
            return thunkApi.rejectWithValue(err.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, thunkApi) => {
        try {
            const response = await logout();
            return response;
        } catch (err: any) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.userName = action.payload.username;
                state.userId = action.payload.id;
                state.isAuthenticated = true;
            })

            .addCase(fetchUser.rejected, (state, action) => {  
                state.isAuthenticated = false;
            })

            .addCase(loginUser.fulfilled, (state, action) => {     
                state.userName = action.payload.userName;
                state.userId = action.payload.userId;
                state.isAuthenticated = true;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload as string | null;
                state.isAuthenticated = false;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.userName = null;
                state.userId = null;
                state.isAuthenticated = false;
            });
    },
});

export default userSlice.reducer;
