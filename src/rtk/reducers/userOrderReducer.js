import { createSlice } from '@reduxjs/toolkit';

export const userOrderReducer = createSlice({
    name:'userOrderReducer',
    initialState: {
        userOrderItems: [],
        loading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        getUserOrder: (state, action) => {
          state.userOrderItems = [...action.payload]
        },
    }
})

export const { getUserOrder, setLoading } = userOrderReducer.actions
export default userOrderReducer.reducer;

