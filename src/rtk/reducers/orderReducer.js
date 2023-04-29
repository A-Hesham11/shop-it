import { createSlice } from '@reduxjs/toolkit';

const items = localStorage.getItem("orders") !== null
    ? JSON.parse(localStorage.getItem("orders"))
    : []

export const orederReducer = createSlice({
    name:'orederReducer',
    initialState: {
        orderItems: items,
    },
    reducers: {
        addToOrder: (state, action) => {
            state.orderItems.push(action.payload)
            localStorage.setItem("orders", JSON.stringify(state.orderItems))
        },
        removeItemOrder: (state, action) => {
            state.orderItems = state.orderItems.filter(item => item.id !== action.payload)
            localStorage.setItem("orders", JSON.stringify(state.orderItems))
        },
        deleteItemsOrder: state => {
            state.orderItems = [];
            localStorage.removeItem("orders");
        }
    }
})

export const {addToOrder,removeItemOrder, deleteItemsOrder } = orederReducer.actions
export default orederReducer.reducer;