import { createSlice } from '@reduxjs/toolkit';

const items = localStorage.getItem("cart") !== null
    ? JSON.parse(localStorage.getItem("cart"))
    : []

const totalQuantity = localStorage.getItem("totalQuantity") !== null
    ? JSON.parse(localStorage.getItem("totalQuantity"))
    : 0

const totalAmount = localStorage.getItem("totalAmount") !== null
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0

localStorage.setItem("delivery", JSON.stringify(10));

const subTotal = localStorage.getItem("subTotal") !== null
    ? JSON.parse(localStorage.getItem("subTotal"))
    : ""

const size = localStorage.getItem("size") !== null
    ? JSON.parse(localStorage.getItem("size"))
    : ""

export const cartReducer = createSlice({
    name:'cartReducer',
    initialState: {
        cartItems: items,
        totalQuantity: totalQuantity,
        totalAmount: totalAmount,
        delivery: JSON.parse(localStorage.getItem("delivery")),
        subTotal: subTotal,
        size: size,
    },
    reducers: {
        addToCart: (state, action) => {
            const newItems = action.payload;
            const existingItems = state.cartItems.find((item) => item.id === newItems.id);
            state.totalQuantity++;
            if(!existingItems) {
                state.cartItems.push({
                    id: newItems.id,
                    description: newItems.description,
                    price: newItems.total,
                    shareImage:newItems.shareImage,
                    quantity:1,
                    totalPrice: newItems.total,
                })
            } else {
                existingItems.quantity++
                existingItems.totalPrice = Number(existingItems.totalPrice) + Number(newItems.price)
            };
            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity) , 0
            );
            state.subTotal = state.totalAmount + state.delivery;

            localStorage.setItem("cart", JSON.stringify(state.cartItems.map((item => item))))
            localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount))
            localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity))
            localStorage.setItem("subTotal", JSON.stringify(state.subTotal))
        },
        removeItem: (state, action) => {
            const id = action.payload;
            const existingItems = state.cartItems.find((item) => item.id === id)
            state.totalQuantity--;
            if (existingItems.quantity === 1) {
                state.cartItems = state.cartItems.filter(item => item.id !== id)
            } else {
                existingItems.quantity--
                existingItems.totalPrice = Number(existingItems.totalPrice) - Number(existingItems.price)
            }
            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity), 0
            );
            state.subTotal = state.totalAmount + state.delivery;

            localStorage.setItem("cart", JSON.stringify(state.cartItems.map((item => item))))
            localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount))
            localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity))
            localStorage.setItem("subTotal", JSON.stringify(state.subTotal))
        },
        deleteItem: (state, action) => {
            const id = action.payload;
            const existingItems = state.cartItems.find((item) => item.id === id)
            state.totalQuantity -= existingItems.quantity;
            if (existingItems.quantity) {
                state.cartItems = state.cartItems.filter(item => item.id !== id)
            } else {
                existingItems.quantity -= quantity;
                existingItems.totalPrice = Number(existingItems.totalPrice) - Number(existingItems.price)
            }
            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity), 0
            );
            state.subTotal = state.totalAmount + state.delivery;

            localStorage.setItem("cart", JSON.stringify(state.cartItems.map((item => item))))
            localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount))
            localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity))
            localStorage.setItem("subTotal", JSON.stringify(state.subTotal))
        },
        deleteItemsCart: state => {
            state.cartItems = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
            localStorage.removeItem('cart');
            localStorage.removeItem('totalAmount');
            localStorage.removeItem('totalQuantity');
        },
        getSize: (state, action) => {
            state.size = action.payload
            localStorage.setItem("size", JSON.stringify(state.size))
        }
    }
})

export const {addToCart, removeItem,deleteItem, deleteItemsCart, getSize} = cartReducer.actions
export default cartReducer.reducer;