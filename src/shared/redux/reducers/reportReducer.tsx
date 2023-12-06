import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  report: [],
  allReport: [],
};

export const reportReducer = createSlice({
  name: 'report',
  initialState,

  reducers: {
    setReport: (state, action) => {
      state.report = action.payload;
    },

    setAllReport: (state, action) => {
      state.allReport = action.payload;
    },

    resetReport: state => {
      state = initialState;
    },
  },
});

export const {setReport, resetReport, setAllReport} = reportReducer.actions;

export default reportReducer.reducer;
