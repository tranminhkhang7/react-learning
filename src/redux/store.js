import { configureStore } from '@reduxjs/toolkit'

import cartItemsReducer from './shopping-cart/cartItemsSlide'

export const store = configureStore({
    reducer: {
        cartItems: cartItemsReducer
    },
})