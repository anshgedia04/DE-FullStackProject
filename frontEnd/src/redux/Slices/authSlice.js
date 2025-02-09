import { createSlice } from "@reduxjs/toolkit";

const initialState={
    token: localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null,
    user: localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken:(state,action) => {
            state.token = action.payload;
        },
        setUser:(state,action) => {
            state.user = action.payload;
        },
    }
})
export const {setToken, setUser} = authSlice.actions;
export default authSlice.reducer;