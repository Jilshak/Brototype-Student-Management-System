import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const reviewersList = createAsyncThunk('reviewers_list',
    async () => {
        try {
            const request = axios.get(`http://127.0.0.1:8000/users/`)
            const response = (await request).data
            if ((await request).status === 200) {
                let reviewers = await response.filter((item) => item.is_reviewer)
                return reviewers
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

export const ReviewerTimeAssigned = createAsyncThunk('reviewer_time_assigned',
    async (id) => {
        try {
            const request = await axios.get(`http://127.0.0.1:8000/timeslot/`)
            const response = (await request).data
            if ((await request).status == 200) {
                let data = await response.filter((item) => item.user == id)
                console.log(data)
                return data
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)




const initialState = {
    data: [],
    data1: [],
    isLoading: true,
    msg: 'is still loading'
}

export const ScheduleTime = createSlice({
    name: 'schedule_time',
    initialState,
    reducers: {

    },
    extraReducers: {
        [reviewersList.pending]: (state) => {
            state.isLoading = true,
            state.data = [],
            state.msg = "It is still loading please wait"
        },
        [reviewersList.fulfilled]: (state, action) => {
            state.data = action.payload,
            state.isLoading = false,
            state.msg = "The time has been loaded"
        },
        [reviewersList.rejected]: (state) => {
            state.data = [],
            state.isLoading = false,
            state.msg = 'something went wrong while loading the state'
        },
        [ReviewerTimeAssigned.pending]: (state) => {
            state.isLoading = true,
            state.data1 = [],
            state.msg = "It is still loading please wait"
        },
        [ReviewerTimeAssigned.fulfilled]: (state, action) => {
            state.data1 = action.payload,
            state.isLoading = false,
            state.msg = "The time has been loaded"
        },
        [ReviewerTimeAssigned.rejected]: (state) => {
            state.data1 = [],
            state.isLoading = false,
            state.msg = 'something went wrong while loading the state'
        },
    }
})

export default ScheduleTime.reducer