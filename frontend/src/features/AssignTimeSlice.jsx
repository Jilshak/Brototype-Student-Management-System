import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



export const GetAssignedTime = createAsyncThunk('get_assigned_time',
    async (id) => {
        try {
            const request = axios.get(`http://127.0.0.1:8000/timeslot/`)
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


export const AddTime = createAsyncThunk('add_time',
    async (credentials) => {
        try{
            const request = axios.post(`http://127.0.0.1:8000/timeslot/`, credentials)
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


export const deleteTime = createAsyncThunk('delete_time',
    async (id) => {
        try{
            const request = axios.delete(`http://127.0.0.1:8000/timeslot/${id}/`)
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