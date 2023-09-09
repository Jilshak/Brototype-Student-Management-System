import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../services/Axios'

//function for assigning the reviewer to the intern
export const book = createAsyncThunk('booking',
    async (credentials) => {
        try {
            console.log(credentials)
            const request = await api.post(`/booking/`, credentials)
            const response = await request.data
            if (request.status === 201) {
                const request = await api.patch(`/timeslot/${credentials.slot}/`, {booked: true})
                const res = await request.data
                if (request.status === 200) {
                    console.log(res)
                } else {
                    console.log("Something happened while updating the data")
                }
                console.log(response)
            } else {
                console.log("Something went wrong while the booking is being processed")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)


//getting the details of the booked time
export const TimeBooked = createAsyncThunk('booked_time',
    async (id) => {
        try {
            console.log("it is called")
            const request = await api.get(`/timeslot/`)
            const response = await request.data
            if (request.status === 200) {
                let slots = await response.filter((item) => item.user === id && item.booked === true)
                let value = await slots.map(item => item.id)



                //checking the booking data
                const second_request = await api.get(`/booking/`)
                const second_response = await second_request.data
                if (second_request.status === 200) {
                    let desired = second_response.filter((item) => value.includes(item.slot))
                    return { slots, desired }
                } else {
                    console.log("No such data exists")
                }
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

const initialState = {
    data: [],
    booked: [],
    isLoading: true,
    msg: "Still loading the booking data"
}

const BookingSlice = createSlice({
    name: 'booking_slice',
    initialState,
    reducers: {

    },
    extraReducers: {
        [book.pending]: (state) => {
            state.isLoading = true,
                state.data = [],
                state.msg = "It is still loading please wait"
        },
        [book.fulfilled]: (state, action) => {
            state.data = action.payload,
                state.isLoading = false,
                state.msg = "The booking has been completed"
        },
        [book.rejected]: (state) => {
            state.data = [],
                state.isLoading = false,
                state.msg = 'something went wrong while doing the booking'
        },
        [TimeBooked.pending]: (state) => {
            state.isLoading = true,
                state.booked = [],
                state.msg = "It is still loading please wait"
        },
        [TimeBooked.fulfilled]: (state, action) => {
            state.booked = action.payload,
                state.isLoading = false,
                state.msg = "The booked data has been called"
        },
        [TimeBooked.rejected]: (state) => {
            state.booked = [],
                state.isLoading = false,
                state.msg = 'something went wrong while doing the fetching the booked data'
        },
    }
})

export default BookingSlice.reducer