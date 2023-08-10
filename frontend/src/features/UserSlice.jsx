import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { useNavigate } from "react-router-dom"

let navigate = useNavigate

export const Register = createAsyncThunk('register',
    async (credentials) => {
        
        //finding the batch id for the user entered batch_number
        const batchAssign = await axios.get("http://127.0.0.1:8000/batches/").then(res => {
            const matchingBatch = res.data.find(x => x.batch_number === credentials.batch);
            if (matchingBatch) {
                return matchingBatch.id;
            } else {
                return null; 
            }
        });

        //assigning the batch
        credentials.batch = batchAssign
        
        const request = await axios.post("http://127.0.0.1:8000/users/", credentials)
        const response = request.data
        console.log(credentials)
        if (request.status === 201) {
            return console.log("The user has been created")
        } else {
            return console.log("Something went wrong!!! And the user has not been created")
        }
    }
)

export const Register_Staff = createAsyncThunk('register',
    async (credentials) => {
        console.log(credentials)
        const request = await axios.post("http://127.0.0.1:8000/users/", credentials)
        const response = request.data
        if (request.status === 201){
            
            return console.log("The Staff has been created")
        }else{
            return console.log("Something went wrong while creating the staff")
        }
    }
)


export const Login = createAsyncThunk('login',
    async (credentials) => {
        const request = await axios.post('http://127.0.0.1:8000/token/', credentials)
        const response = await request.data
        if (request.status === 200) {
            console.log(response)
            localStorage.setItem('authToken', JSON.stringify(response.access))
            console.log("The user has been authenticated and can login")
        } else {
            console.log("The user is not authenticated and can't login")
        }
    }
)





const initialState = {
    state: [],
    isLoading: true,
    auth: false
}

const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {

    },
    extraReducers: {
        [Register.pending]: (state) => {
            state.isLoading = true
            state.msg = "The state is still loading!!"
        },
        [Register.fulfilled]: (state) => {
            state.isLoading = false
            state.msg = "The state has been loaded"
        },
        [Register.rejected]: (state) => {
            state.isLoading = false
            state.msg = 'The loading of the state has been finished with some problem.'
        },
        [Login.pending]: (state) => {
            state.isLoading = true
            state.auth = false
            state.msg = "The user is not yet authorized working on it!!"
        },
        [Login.fulfilled]: (state) => {
            state.isLoading = false
            state.auth = true
            state.msg = "The user is authorized"
        },
        [Login.rejected]: (state) => {
            state.isLoading = false
            state.auth = false
            state.msg = "The user is not authorized"
        },
    }
})

export default UserSlice.reducer