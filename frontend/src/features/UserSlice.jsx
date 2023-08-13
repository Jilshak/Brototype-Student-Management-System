import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { useParams } from 'react-router-dom'

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
        if (request.status === 201) {

            return console.log("The Staff has been created")
        } else {
            return console.log("Something went wrong while creating the staff")
        }
    }
)


export const Login = createAsyncThunk('login',
    async (credentials) => {
        const request = await axios.post('http://127.0.0.1:8000/token/', credentials)
        const response = await request.data
        if (request.status === 200) {
            localStorage.setItem('authToken', JSON.stringify(response.access))
            console.log("The user has been authenticated and can login")
        } else {
            console.log("The user is not authenticated and can't login")
        }
    }
)



export const InternList = createAsyncThunk('intern_list',
    async (id) => {
        try {
            const request = await axios.get('http://127.0.0.1:8000/users/')
            let data = await request.data

            const filterData = data.filter(user => {
                return (
                    user.is_user &&
                    !user.is_superuser &&
                    !user.is_advisor &&
                    !user.is_reviewer &&
                    user.batch == id
                )
            })
            return filterData
        } catch (error) {
            console.log('Error: ', error)
        }
    }
)


export const deleteUser = createAsyncThunk('delete_user',
    async (id) => {
        try {
            const request = axios.delete(`http://127.0.0.1:8000/users/${id}/`)
            if ((await request).status === 200) {
                console.log("The user has been deleted")
            } else {
                console.log("Something went wrong while deleting the user")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)


export const editUser = createAsyncThunk('edit_user',
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

        //to filter out null fields from the credentials
        const filteredCredentials = Object.fromEntries(
            Object.entries(credentials).filter(([_, value]) => value !== null)
        );

        const request = axios.patch(`http://127.0.0.1:8000/users/${credentials.id}/`, filteredCredentials)
        const response = await request.data
        if ((await request).status === 200) {
            console.log("The user has been edited")
        } else {
            console.log("The use has not been edited something went wrong while the process")
        }
    }
)




const initialState = {
    state: [],
    isLoading: true,
    mgs: '',
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


        [InternList.pending]: (state) => {
            state.isLoading = true
            state.msg = "The list is still loading"
        },
        [InternList.fulfilled]: (state, action) => {
            state.isLoading = false
            state.state = action.payload
            state.msg = 'The list of interns is available now'
        },
        [InternList.rejected]: (state) => {
            state.isLoading = false
            state.msg = "Something happended and its not working"
        }
    }
})

export default UserSlice.reducer