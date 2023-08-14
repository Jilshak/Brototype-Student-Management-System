import { configureStore } from '@reduxjs/toolkit'
import UserSlice from '../features/UserSlice'
import BatchSlice from '../features/BatchSlice'
import AuthorizeSlice from '../features/AuthorizeSlice'


export const store = configureStore({
    reducer: {
        Users: UserSlice,
        Batches: BatchSlice,
        Authorize: AuthorizeSlice
    }
})