import {createSlice} from '@reduxjs/toolkit';

interface State {
  fcmToken: any;
  user: any;
}
const initialState: State = {
  user: null,
  fcmToken: null,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setUser: (state, action) => {
      // console.log('payload', action.payload);
      state.user = action.payload;
    },
    setFCMToken: (state, action) => {
      state.fcmToken = action.payload;
    },
    resetUser: state => {
      state.user = initialState.user;
    },
  },
});

export const {setUser, resetUser, setFCMToken} = userReducer.actions;

export default userReducer.reducer;
