import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

//for getting all the batches from the server
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

//logic for creating a batch
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

//for deleting the batch NOTE: while deleting the batch all
// the users assositated to that batch will also be deleted
export const deleteBatch = createAsyncThunk('delete_batch',
    async (id) => {
        try {
            const request = axios.delete(`http://127.0.0.1:8000/batches/${id}/`)
            const response = await request.data
            if ((await request).status === 204) {
                const req = await axios.get("http://127.0.0.1:8000/users/")
                const res = await req.data
                if (req.status === 200){
                    let batch_users = await res.filter(item => item.batch == id)
                    let data = await batch_users.map(item => item.id)
                    for (const i of data){
                        await axios.delete(`http://127.0.0.1:8000/users/${i}/`)
                    }
                }
                console.log('the batch has been deleted')
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