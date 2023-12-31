import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../services/Axios'


//for the advisosr to get the assigned time 
export const GetAssignedTime = createAsyncThunk('get_assigned_time',
    async (id) => {
        try {
            const request = api.get(`/timeslot/`)
            const response = (await request).data
            if ((await request).status === 200) {
                let time = await response.filter((item) => item.user == id && !item.booked)
                console.log(time)
                return time
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

//for the reviewer to assign their free time
export const AddTime = createAsyncThunk('add_time',
    async (credentials) => {
        try{
            const request = api.post(`/timeslot/`, credentials)
            const response = (await request).status
            if ((await request).status === 201){
                console.log("The new time is added")
            }else{
                console.log("The new time not added")
            }
        }catch(error){
            console.log("Error: ", error)
        }
    }
)

//for the reviewer to delete their time
export const deleteTime = createAsyncThunk('delete_time',
    async (id) => {
        try{
            const request = api.delete(`/timeslot/${id}/`)
            const response = (await request).status
            if ((await request).status === 204){
                console.log("The new time is deleted")
            }else{
                console.log("The new time not deleted")
            }
        }catch(error){
            console.log("Error: ", error)
        }
    }
)





const initialState = {
    data: [],
    isLoading: true,
    msg: 'In the initial State'
}

export const AssignTimeSlice = createSlice({
    name: 'assign_time',
    initialState,
    reducers: {

    },
    extraReducers: {
        [GetAssignedTime.pending]: (state) => {
            state.isLoading = true,
                state.data = [],
                state.msg = "It is still loading please wait"
        },
        [GetAssignedTime.fulfilled]: (state, action) => {
            state.data = action.payload,
                state.isLoading = false,
                state.msg = "The time has been loaded"
        },
        [GetAssignedTime.rejected]: (state) => {
            state.data = [],
                state.isLoading = false,
                state.msg = 'something went wrong while loading the state'
        }
    }

})

export default AssignTimeSlice.reducer