import { createSlice } from '@reduxjs/toolkit';

export const productReducer = createSlice({
    name:'productReducer',
    initialState: {
        loading: false,
        productItems: [],
        checkout:[],
        clickedButtons: {},
    },
    reducers: {
        loading: (state, action) => {
            state.loading = action.payload;
        },
        getProducts: (state, action) => {
          state.productItems = [...action.payload];
        },
        getCheckout: (state, action) => {
            state.checkout = action.payload;
        },
        setButtonClicked: (state, action) => {
            state.clickedButtons[action.payload] = true;
            localStorage.setItem('clickedButtons', JSON.stringify(state.clickedButtons));
        },
        removeButtonClicked: (state, action) => {
            state.clickedButtons[action.payload] = false;
            localStorage.setItem('clickedButtons', JSON.stringify(state.clickedButtons));
        },
        loadClickedButtons: (state) => {
            const clickedButtons = JSON.parse(localStorage.getItem('clickedButtons'));
            if (clickedButtons) {
              state.clickedButtons = clickedButtons;
            }
        },
        deleteAllClicked: (state) => {
            state.clickedButtons = {};
            localStorage.removeItem("clickedButtons")
        },
    }
})

export const {getProducts, loading, getCheckout, setButtonClicked, loadClickedButtons, removeButtonClicked, deleteAllClicked} = productReducer.actions
export default productReducer.reducer;