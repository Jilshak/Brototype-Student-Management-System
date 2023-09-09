import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../services/Axios'

//for getting the details of unauthorized intern for the admin
export const UnauthorizedIntern = createAsyncThunk('unauthorized_intern',
    async () => {
        try {
            const request = api.get(`/users/`)
            const response = (await request).data

            if ((await request).status === 200) {
                console.log(response)
                return response
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

// for authorizing the intern for the admin so that they can have their functionality
export const authorize = createAsyncThunk('authorize',
    async (id) => {
        try {
            let data = {
                authenticated: true
            }
            const request = api.patch(`/users/${id}/`,data)
            const response = (await request).data
            if ((await request).status === 200){
                console.log("The authentication of the user is done and now have the functionality")
                return response
            }else{
                console.log("Something went wrong while authenticating the user try again !!!")
            }
        }catch(error){
            console.log("Error:", error)
        }
    }
)

//remove unauthorized/unwanted users from the list
export const unauthorized = createAsyncThunk('unauthorized',
    async (id) => {
        try{
            const request = await api.delete(`/users/${id}/`)
            const response = request.data
            if (request.status == 200){
                console.log("The user has been deleted")
                return
            }else{
                console.log("Something went wrong while deleting the user")
                return
            }
        }catch(error){
            console.log("Error: ", error)
        }
    }
)




const initialState = {
    data: [],
    isLoading: true,
    msg: ""
}

const AuthorizeSlice = createSlice({
    name: "Authorize",
    initialState,
    reducers: {

    },
    extraReducers: {
        [UnauthorizedIntern.pending]: (state) => {
            state.isLoading = true
            state.data = []
            state.msg = "It is still loading"
        },
        [UnauthorizedIntern.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.msg = "The unaythorized intern list is loaded"
        },
        [UnauthorizedIntern.rejected]: (state) => {
            state.isLoading = false
            state.data = []
            state.msg = "Something went wrong while loading the unauthorized intern list"
        },
    }
})

export default AuthorizeSlice.reducer