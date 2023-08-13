import { configureStore } from '@reduxjs/toolkit'
import UserSlice from '../features/UserSlice'
import BatchSlice from '../features/BatchSlice'
export const store = configureStore({
    reducer: {
        Users: UserSlice,
        Batches: BatchSlice
    }
})