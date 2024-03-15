import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged : false,
    userRole: '',
    userUuid: '',
}

const user = createSlice({
    name: 'user',
    initialState,
    reducers:{
        isConnected(state, action){
            
            state.isLogged = true;
            state.userRole = action.payload.userRole;
            state.userUuid = action.payload.userUuid; 
            console.log(state.isLogged)
        }
    },
    extraReducers: (builder) => {
        builder.addCase('ACTION_SPECIALE_REINITIALISER', (state, action) => {
            return initialState;
        });
    }
})

export const {isConnected} = user.actions;

export default user.reducer;