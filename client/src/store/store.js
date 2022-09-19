import {createSlice, configureStore} from "@reduxjs/toolkit";

const token = localStorage.getItem('token') || '';
const user = localStorage.getItem('userId')  || '';
const isAuth = localStorage.getItem('isAuth') || '';
const userRole = localStorage.getItem('userRole') || '';


const AppSlice = createSlice({
    name: 'app',
    initialState: {
        isAuth: isAuth || false,
        token,
        user,
        userRole
    },
    reducers: {
        login(state, action) {
            state.isAuth = true;
            state.token = action.payload.jwt;
            state.user = action.payload.user;
            state.userRole=  action.payload.userRole
        }
    }
})

const store = configureStore({
    reducer: {app: AppSlice.reducer}
})

export const appActions = AppSlice.actions
export default store