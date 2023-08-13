import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const Batches = createAsyncThunk('batches',
    async () => {
        try {
            const request = await axios.get("http://127.0.0.1:8000/batches/")
            const response = await request.data
            if (request.status === 200) {
                return response
            } else {
                return console.log("Something went wrong!!!")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)


export const createBatch = createAsyncThunk('create_batch',
    async (credentials) => {
        try {
            const request = axios.post("http://127.0.0.1:8000/batches/", credentials)
            const response = await request.data

            if ((await request).status === 201) {
                console.log('the batch has been created')
            } else {
                console.log("something went wrong while creating the batch")
            }
        }catch(error){
            console.log("Error: ", error)
        }
    }
)


const initialState = {
    data: [],
    isLoading: true,
    msg: 'is still loading',
}

const BatchSlice = createSlice({
    name: 'Batches',
    initialState,
    reducers: {

    },
    extraReducers: {

        [Batches.pending]: (state) => {
            state.isLoading = true,
                state.data = [],
                state.msg = "It is still loading please wait"
        },
        [Batches.fulfilled]: (state, action) => {
            state.data = action.payload,
                state.isLoading = false,
                state.msg = "The batches has been loaded"
        },
        [Batches.rejected]: (state) => {
            state.data = [],
                state.isLoading = false,
                state.msg = 'something went wrong while loading the state'
        }
    }

})

export default BatchSlice.reducer