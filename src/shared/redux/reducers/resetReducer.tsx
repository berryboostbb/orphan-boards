import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    email: "",
    code: ""
};

export const userReducer = createSlice({
    name: 'resetPassword',
    initialState,

    reducers: {

        setUserEmailorCode: (state, action) => {
              let obj =  {
                ...state, 
                ...action.payload
            }
            
            return obj
            
        },

        resetUser: (state) => {
            state = initialState;
        },

    },
});

export const {
    setUserEmailorCode,
    resetUser
} = userReducer.actions;

export default userReducer.reducer;
