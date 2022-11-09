import { createSlice } from '@reduxjs/toolkit'

const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    value: items,
}

export const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload
            const duplicate = state.value.filter(e => e.bookId === newItem.bookId)
            // console.log(duplicate.length + "this is duplicate");
            if (duplicate.length > 0) {
                state.value = state.value.filter(e => e.bookId !== newItem.bookId)
                state.value = [...state.value, {
                    // id: duplicate[0].id,
                    // bookId: newItem.bookId,
                    bookId: duplicate[0].bookId,
                    title: newItem.title,
                    price: newItem.price,
                    imageLink: newItem.imageLink,
                    quantity: newItem.quantity + duplicate[0].quantity
                }]
            } else {
                state.value = [...state.value, {
                    ...action.payload
                    // id: state.value.length > 0 ? state.value[state.value.length - 1].id + 1 : 1
                }]
            }
            localStorage.setItem('cart_items', JSON.stringify(state.value.sort((a, b) => a.bookId > b.bookId ? 1 : (a.bookId < b.bookId ? -1 : 0))))
        },
        updateItem: (state, action) => {
            const newItem = action.payload
            const item = state.value.filter(e => e.bookId === newItem.bookId)
            if (item.length > 0) {
                state.value = state.value.filter(e => e.bookId !== newItem.bookId)
                state.value = [...state.value, {
                    // id: item[0].id,
                    // bookId: newItem.bookId,
                    bookId: item[0].bookId,
                    title: newItem.title,
                    price: newItem.price,
                    imageLink: newItem.imageLink,
                    quantity: newItem.quantity
                }]
            }
            localStorage.setItem('cart_items', JSON.stringify(state.value.sort((a, b) => a.bookId > b.bookId ? 1 : (a.bookId < b.bookId ? -1 : 0))))
        },
        removeItem: (state, action) => {
            const item = action.payload
            state.value = state.value.filter(e => e.bookId !== item.bookId)
            localStorage.setItem('cart_items', JSON.stringify(state.value.sort((a, b) => a.bookId > b.bookId ? 1 : (a.bookId < b.bookId ? -1 : 0))))
        },
    },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, updateItem } = cartItemsSlice.actions

export default cartItemsSlice.reducer