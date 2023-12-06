import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  productList: [],
  userProductList: [],
};

export const productReducer = createSlice({
  name: 'product',
  initialState,

  reducers: {
    setProduct: (state, action) => {
      state.productList = action.payload;
    },

    setUserProduct: (state, action) => {
      state.userProductList = action.payload;
    },

    deleteUserProduct: (state, action) => {
      const index = state.userProductList.findIndex(
        (f: any) => f._id === action.payload,
      );
      if (index > -1) {
        state.userProductList.splice(index, 1);
      }
    },

    resetProduct: state => {
      state = initialState;
    },
  },
});

export const {setProduct, resetProduct, deleteUserProduct, setUserProduct} =
  productReducer.actions;

export default productReducer.reducer;
