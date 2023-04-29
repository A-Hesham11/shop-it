import { createSlice } from '@reduxjs/toolkit';

const items = localStorage.getItem("checkout") !== null
    ? JSON.parse(localStorage.getItem("checkout"))
    : []


export const checkoutReducer = createSlice({
    name:'checkoutReducer',
    initialState: {
        checkoutItems: items,
    },
    reducers: {
        addToCheckout: (state, action) => {
            state.checkoutItems.push(action.payload)
            localStorage.setItem("checkout", JSON.stringify(state.checkoutItems))
        },
        removeItemCheck: (state, action) => {
            state.checkoutItems = state.checkoutItems.filter(item => item.id !== action.payload)
            localStorage.setItem("checkout", JSON.stringify(state.checkoutItems))
        },
        deleteItemsCheck: state => {
            state.checkoutItems = [];
            localStorage.removeItem("checkout")
        }
    }
})

export const {addToCheckout, removeItemCheck, deleteItemsCheck } = checkoutReducer.actions
export default checkoutReducer.reducer;