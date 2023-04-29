import { createSlice } from '@reduxjs/toolkit';

const items = localStorage.getItem("stores") !== null
    ? JSON.parse(localStorage.getItem("stores"))
    : []

export const storesReducer = createSlice({
    name:'storesReducer',
    initialState: {
        storesItems: items,
    },
    reducers: {
        addToStores: (state, action) => {
            const newItems = action.payload;
            const existingItems = state.storesItems.find((item) => item.id === newItems.id);
            if(!existingItems) {
                state.storesItems.push({
                    id: newItems.id,
                    description: newItems.description,
                    total: newItems.total,
                    shareImage:newItems.shareImage,
                    quantity:1,
                    delivery: newItems.delivery,
                    totalPrice: newItems.total,
                })
            } else {
                return state;
            };
            localStorage.setItem("stores", JSON.stringify(state.storesItems.map((item => item))))
        },
        removeItem: (state, action) => {
            const id = action.payload;
            const existingItems = state.storesItems.find((item) => item.id === id)
            if (existingItems.quantity === 1) {
                state.storesItems = state.storesItems.filter(item => item.id !== id)
            } else {
                return state;
            }
            localStorage.setItem("stores", JSON.stringify(state.storesItems.map((item => item))))
        },
        deleteItemsStores: state => {
            state.storesItems = [];
            localStorage.removeItem("stores")
        }
    }
})

export const {addToStores, removeItem, deleteItemsStores} = storesReducer.actions
export default storesReducer.reducer;
