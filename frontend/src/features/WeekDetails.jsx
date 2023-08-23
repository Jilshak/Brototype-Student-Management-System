import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


//for editing the week details of the user - only for the admin and the advisors
export const WeekDetailsUser = createAsyncThunk('weekdetails',
    async (credentials) => {
        console.log(credentials)
        const filteredCredentials = Object.fromEntries(
            Object.entries(credentials).filter(([_, value]) => value !== null)
        );
        try {
            const request = axios.patch(`http://127.0.0.1:8000/week_details/${credentials.id}/`, filteredCredentials)
            const response = (await request).data
            if ((await request).status === 200) {
                // console.log(response)
                return response
            } else {
                console.log("Something went wrong while doing this!!!!")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)



const initialState = {
    data: [],
    isLoading: true,
    msg: 'still loading'
}

export const WeekDetailsSlice = createSlice({
    name: 'weekDetails',
    initialState,
    reducers: {

    },
    extraReducers: {
        [WeekDetailsUser.pending]: (state) => {
            state.data = []
            state.isLoading = true
            state.msg = 'It is still on loading'
        },
        [WeekDetailsUser.fulfilled]: (state, action) => {
            state.data = action.payload
            state.isLoading = false
            state.msg = 'The week details have been loaded'
        },
        [WeekDetailsUser.rejected]: (state) => {
            state.data = []
            state.isLoading = false
            state.msg = 'The load has been completed but something went wrong while loading it'
        },
    }
})

export default WeekDetailsSlice.reducer