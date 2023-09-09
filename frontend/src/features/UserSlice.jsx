import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../services/Axios";


//register functionality for the users based on the batch number they have given
export const Register = createAsyncThunk('register',
    async (credentials) => {

        //finding the batch id for the user entered batch_number
        const batchAssign = await api.get(`/batches/`).then(res => {
            const matchingBatch = res.data.find(x => x.batch_number === credentials.batch);
            if (matchingBatch) {
                console.log("This is being called here which means it should work as expected!!!")
                return matchingBatch.id;
            } else {
                console.log("its not working as expected something went wrong !!")
                return null;
            }
        });

        //assigning the batch
        credentials.batch = batchAssign

        const request = await api.post(`/users/`, credentials)
        const response = request.data
        console.log(credentials)
        if (request.status === 201) {
            console.log(response)
            return console.log("The user has been created")
        } else {
            return console.log("Something went wrong!!! And the user has not been created")
        }
    }
)

//the register functionality of the advisor/reviewers
export const Register_Staff = createAsyncThunk('register',
    async (credentials) => {
        console.log(credentials)
        const request = await api.post(`/users/`, credentials)
        const response = request.data
        if (request.status === 201) {

            return console.log("The Staff has been created")
        } else {
            return console.log("Something went wrong while creating the staff")
        }
    }
)

//the login functinality by jwt token authentication
export const Login = createAsyncThunk('login',
    async (credentials) => {
        const request = await api.post(`/token/`, credentials)
        const response = await request.data
        if (request.status === 200) {
            localStorage.setItem('authToken', JSON.stringify(response.access))
            console.log("The user has been authenticated and can login")
        } else {
            console.log("The user is not authenticated and can't login")
        }
    }
)


//retrieving the list of the interns based on the various field and conditions
export const InternList = createAsyncThunk('intern_list',
    async (id) => {
        try {
            const request = await api.get(`/users/`)
            let data = await request.data
            const filterData = await data.filter(user => {
                return (
                    user.batch == id &&
                    user.is_user &&
                    !user.is_superuser &&
                    !user.is_advisor &&
                    !user.is_reviewer
                )
            })
            console.log(filterData)
            return filterData
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

)
export const fullUserList = createAsyncThunk('Full_User_List',
    async (id) => {
        try {
            const request = await api.get(`/users/`)
            let data = await request.data
            if (request.status === 200) {
                console.log("All the users have been fetched!!!")
                return data
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
)

//getting the list of the advisor based on the various conditions and fields
export const AdvisorList = createAsyncThunk('advisor_list',
    async (id) => {
        try {
            const request = await api.get(`/users/`)
            let data = await request.data

            const filterData = data.filter(user => {
                return (
                    user.is_user &&
                    user.is_advisor &&
                    !user.is_superuser &&
                    !user.is_reviewer
                )
            })
            return filterData
        } catch (error) {
            console.log('Error: ', error)
        }
    }
)

//getting the reveiwers list based on the conditions and fields
export const ReviewerList = createAsyncThunk('reviewer_list',
    async (id) => {
        try {
            const request = await api.get(`/users/`)
            let data = await request.data

            const filterData = data.filter(user => {
                return (
                    user.is_user &&
                    user.is_reviewer &&
                    !user.is_advisor &&
                    !user.is_superuser
                )
            })
            return filterData
        } catch (error) {
            console.log('Error: ', error)
        }
    }
)

//logic for deleting the user based of on their user id
export const deleteUser = createAsyncThunk('delete_user',
    async (id) => {
        console.log(id)
        try {
            const request = await api.delete(`/users/${id}/`)
            const response = await request.data
            if (request.status === 204) {
                return response
            } else {
                console.log("Something went wrong while deleting the user")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

//editing the user details of the users/staff/reviewers
export const editUser = createAsyncThunk('edit_user',
    async (credentials) => {
        if (credentials.batch) {
            //finding the batch id for the user entered batch_number
            const batchAssign = await api.get(`/batches/`).then(res => {
                const matchingBatch = res.data.find(x => x.batch_number === credentials.batch);
                if (matchingBatch) {
                    return matchingBatch.id;
                } else {
                    return null;
                }
            });
            //assigning the batch
            credentials.batch = batchAssign
        } else {
            console.log("Entering here alright !!!")
            console.log("Credentials: ", credentials)
            //to filter out null fields from the credentials
            const filteredCredentials = Object.fromEntries(
                Object.entries(credentials).filter(([_, value]) => value !== null)
            );

            const request = api.patch(`/users/${credentials.id}/`, filteredCredentials)
            const response = await request.data
            if ((await request).status === 200) {
                console.log("The user has been edited")
            } else {
                console.log("The use has not been edited something went wrong while the process")
            }
        }

    }
)

//to get the profile details of a user based of on their id we get that user and then use the details
export const ProfileDetails = createAsyncThunk('profile_details',
    async (id) => {
        try {
            const request = api.get(`/users/${id}/`)
            const response = (await request).data

            if ((await request).status === 200) {
                return response
            } else {
                console.log("Something wrong occured while fetching the users data from the endpoint")
            }
        } catch (error) {
            console.log(error)
        }

    }
)

export const profileImage = createAsyncThunk('profile_image',
    async (credentials) => {
        try {
            console.log("This is from the userSlice: ", credentials)
            console.log("This is from the userSlice: ", credentials.image)
            const request = await api.patch(`/users/${credentials.id}/`, credentials?.image, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            const response = request.data
            if (request.status === 200) {
                console.log("The profile image has been updated")
            } else {
                console.log("Something went wrong while patching the profile image")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }

)

export const SideBarSlice = createAsyncThunk('side_bar_slice',
    async (id) => {
        try {
            const request = api.get(`/users/${id}/`)
            const response = (await request).data

            if ((await request).status === 200) {
                return response
            } else {
                console.log("Something wrong occured while fetching the users data from the endpoint")
            }
        } catch (error) {
            console.log(error)
        }

    }
)




export const SideBarNotification = createAsyncThunk('sidebar_notificatoin',
    async (id) => {
        try {
            const request = await api.patch(`/users/${id}/`, { notification_count: 0 })
            const response = request.data
            if (request.status == 200) {
                console.log("The notification count has been increased")
                return response
            } else {
                console.log("Something went wrong while increasing the notification count")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)




const initialState = {
    state: [],
    sidebar: [],
    dummy: [],
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
        },

        [AdvisorList.pending]: (state) => {
            state.isLoading = true
            state.state = []
            state.msg = "It is still loading"
        },
        [AdvisorList.fulfilled]: (state, action) => {
            state.isLoading = false
            state.state = action.payload
            state.msg = "The advisors list is loaded"
        },
        [AdvisorList.rejected]: (state) => {
            state.isLoading = false
            state.state = []
            state.msg = "Something went wrong while loading the advisors list"
        },

        [ReviewerList.pending]: (state) => {
            state.isLoading = true
            state.state = []
            state.msg = "It is still loading"
        },
        [ReviewerList.fulfilled]: (state, action) => {
            state.isLoading = false
            state.state = action.payload
            state.msg = "The reviewers list is loaded"
        },
        [ReviewerList.rejected]: (state) => {
            state.isLoading = false
            state.state = []
            state.msg = "Something went wrong while loading the reviewers list"
        },

        [ProfileDetails.pending]: (state) => {
            state.isLoading = true
            state.state = []
            state.msg = "It is still loading"
        },
        [ProfileDetails.fulfilled]: (state, action) => {
            state.isLoading = false
            state.state = action.payload
            state.msg = "The profile list is loaded"
        },
        [ProfileDetails.rejected]: (state) => {
            state.isLoading = false
            state.state = []
            state.msg = "Something went wrong while loading the profile list"
        },


        [fullUserList.pending]: (state) => {
            state.isLoading = true
            state.state = []
            state.msg = "It is still loading"
        },
        [fullUserList.fulfilled]: (state, action) => {
            state.isLoading = false
            state.state = action.payload
            state.msg = "The user list is loaded"
        },
        [fullUserList.rejected]: (state) => {
            state.isLoading = false
            state.state = []
            state.msg = "Something went wrong while loading the user list"
        },


        [SideBarSlice.pending]: (state) => {
            state.isLoading = true
            state.sidebar = []
            state.msg = "It is still loading"
        },
        [SideBarSlice.fulfilled]: (state, action) => {
            state.isLoading = false
            state.sidebar = action.payload
            state.msg = "The user sidebar is loaded"
        },
        [SideBarSlice.rejected]: (state) => {
            state.isLoading = false
            state.sidebar = []
            state.msg = "Something went wrong while loading the user sidebar"
        },

        [SideBarNotification.pending]: (state) => {
            state.isLoading = true
            state.sidebar = []
            state.msg = "It is still loading"
        },
        [SideBarNotification.fulfilled]: (state, action) => {
            state.isLoading = false
            state.sidebar = action.payload
            state.msg = "The user sidebar is loaded"
        },
        [SideBarNotification.rejected]: (state) => {
            state.isLoading = false
            state.sidebar = []
            state.msg = "Something went wrong while loading the user sidebar"
        },
    }
})

export default UserSlice.reducer