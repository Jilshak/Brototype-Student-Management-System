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
                let data = await response.filter((item) => item.user == id && !item.booked)
                console.log(data)
                return data
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

//fetch the interns with review scheduled
export const InternsWithReview = createAsyncThunk('interns_with_review',
    async () => {
        try{
            const request = await axios.get(`http://127.0.0.1:8000/users/`)
            const response = await request.data
            if (request.status === 200){
                console.log(response)
                let desired = response.filter((item) => !item.is_superuser && !item.is_advisor && !item.is_reviewer && item.review_in <= 7 && !item.review_scheduled)
                console.log(desired)
                return desired
            }
        }catch(error){
            console.log(error)
        }
    }
)

export const Scheduled = createAsyncThunk('scheduled',
    async (credentials) => {
        try{
            const request = await axios.get(`http://127.0.0.1:8000/users/`)
            const response = await request.data
            if (request.status === 200){
                console.log(response)
                return response
            }else{
                console.log("Something weng wrong while fethinc the scheduled data")
            }
        }catch(error){
            console.log("Error: ", error)
        }
    }
)

export const ScheduledTimeforAdvisor = createAsyncThunk('scheduled_time_for_advisor',
    async (id) => {
        try {
            console.log("This is being called!!!")
            console.log(id)
            const request = await axios.get(`http://127.0.0.1:8000/booking/`)
            const response = await request.data
            if (request.status === 200){
                let data = response.filter((item) => item.advisor == id)
                let value = await data.map(item => item.slot)

                const req = await axios.get(`http://127.0.0.1:8000/timeslot/`)
                const res = await req.data
                if (req.status === 200){
                    let desired = res.filter((item) => value.includes(item.id))
                    console.log("This is the data that you are looking for: ",data, desired)
                    return {data, desired}
                }
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)




const initialState = {
    data: [],
    data1: [],
    Interns: [],
    booked: [],
    review: [],
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
        [InternsWithReview.pending]: (state) => {
            state.isLoading = true,
            state.data1 = [],
            state.msg = "It is still loading please wait"
        },
        [InternsWithReview.fulfilled]: (state, action) => {
            state.Interns = action.payload,
            state.isLoading = false,
            state.msg = "The Interns has been loaded"
        },
        [InternsWithReview.rejected]: (state) => {
            state.data1 = [],
            state.isLoading = false,
            state.msg = 'something went wrong while loading the state'
        },
        [Scheduled.pending]: (state) => {
            state.isLoading = true,
            state.booked = [],
            state.msg = "It is still loading please wait"
        },
        [Scheduled.fulfilled]: (state, action) => {
            state.booked = action.payload,
            state.isLoading = false,
            state.msg = "The Interns has been loaded"
        },
        [Scheduled.rejected]: (state) => {
            state.booked = [],
            state.isLoading = false,
            state.msg = 'something went wrong while loading the state'
        },
        [ScheduledTimeforAdvisor.pending]: (state) => {
            state.isLoading = true,
            state.review = [],
            state.msg = "It is still loading the scheduled data please wait"
        },
        [ScheduledTimeforAdvisor.fulfilled]: (state, action) => {
            state.review = action.payload,
            state.isLoading = false,
            state.msg = "The scheduled has been loaded"
        },
        [ScheduledTimeforAdvisor.rejected]: (state) => {
            state.review = [],
            state.isLoading = false,
            state.msg = 'something went wrong while loading the scheduled data'
        },
    }
})

export default ScheduleTime.reducer