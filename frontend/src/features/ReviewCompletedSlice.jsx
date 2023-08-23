import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


//updating the user week details completed field so that the user can go to the next week
//will be called when clicking on the tick button when it
export const UpdateDetailsOfUser = createAsyncThunk('update_details_of_user',
    async (week_id) => {
        try {
            const request = await axios.patch(`http://127.0.0.1:8000/weeks/${week_id}/`, { completed: true })
            const response = await request.data

            if (request.status === 200) {
                console.log("The week detail has been completed proceed to the next week!!!")
                console.log("Response: ", response)
            } else {
                console.log("Something went wrong while doing this")
            }
        } catch (error) {
            console.log(error)
        }
    }
)



const initialState = {
    isLoading: true,
    data: [],
    msg: 'Still loading'
}

export const ReviewCompleteSlice = createSlice({
    name: 'reveiw_complete_slice',
    initialState,
    reducers: {

    },
    extraReducers: {
        //no need to add any action as it is only sending a patch request to the server
    }
})

export default ReviewCompleteSlice.reducer