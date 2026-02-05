import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginData } from "../../types/LoginData";
import { getUserProfile, login, } from "../../api/userActions";

const saveToken = (token: string) => {
    localStorage.setItem('token', token)
}

const removeToken = () => {
    localStorage.removeItem('token');
}

const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
}

const getInitialState = async () => {
    const token = getToken();
    let error = null;

    if (token) {
        try {
            const userProfile = await getUserProfile(token);
            return {
                userName: userProfile?.username,
                userId: userProfile?.id,
                isAuthenticated: true,
                error
            }
        } catch (err: any) {
            removeToken();
            error = err.message;
        }
    }

    return {
        userId: null,
        userName: null,
        isAuthenticated: false,
        error
    }
}


const initialState = await getInitialState()

export const loginUser = createAsyncThunk(
    '/auth/loginUser',
    async (credentials: LoginData, thunkApi) => {
        try {
            const response = await login(credentials)
            return response
        } catch (error: any) {
            if (error.response && error.response.data) {
                return thunkApi.rejectWithValue(error.response.data)
            }
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            removeToken();
            state.userId = null;
            state.userName = null;
            state.isAuthenticated = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action.payload);
                if (action.payload) {
                    state.userName = action.payload.userName;
                    state.userId = action.payload.userId;
                    state.isAuthenticated = true;
                    saveToken(action.payload.access_token);
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.userName = null;
                state.userId = null;
                state.isAuthenticated = false;
            });
    },
}
)

export const { logout } = userSlice.actions;

export default userSlice.reducer;