import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../services/Axios'


//for editing the week details of the user - only for the admin and the advisors and reviewers
export const WeekDetailsUser = createAsyncThunk('weekdetails',
    async (credentials) => {
        console.log(credentials)
        const filteredCredentials = Object.fromEntries(
            Object.entries(credentials).filter(([_, value]) => value !== null)
        );
        try {
            const request = api.patch(`/week_details/${credentials.id}/`, filteredCredentials)
            const response = (await request).data
            if ((await request).status === 200) {
                // console.log(response)
                return response
            } else {
                console.log("Something went wrong while doing this!!!!")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

//////////////////////////////////////////////////////////THIS WEEK TASKS//////////////////////////////////////////////////////////////////

//getting the weeks task
export const get_week_task = createAsyncThunk('get_week_task',
    async (credentials) => {
        try {
            console.log("Its is entering here!!")
            const request = await api.get(`/weeks/`)
            const response = request.data
            if (request.status == 200) {
                let data = await response.filter((item) => item.user == credentials.userid && item.week_number == credentials.week_id)
                console.log(data)
                return data[0].weekdetails_set[0].this_weeks_tasks
                // return data
            } else {
                console.log("Something went wrong while uploading the file")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)


//uploading this weeks task
export const This_weeks_task = createAsyncThunk('this_weeks_task',
    async (credentials) => {
        try {
            console.log("Its is entering here!!")
            // console.log(id)
            const request = await api.get(`/weeks/`)
            const response = request.data
            if (request.status == 200) {
                let data = response.filter((item) => item.user == credentials.userid && item.week_number == credentials.week_id)
                console.log(data[0].weekdetails_set[0].id)
                const req = await api.patch(`/week_details/${data[0].weekdetails_set[0].id}/`, credentials?.this_weeks_tasks)
                const res = req.data
                if (req.status == 200) {
                    console.log("The file has been uploaded")
                    console.log(res)
                } else {
                    console.log("Something went wrong while uploading the data ")
                }
            } else {
                console.log("Something went wrong while uploading the file")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

//removing this week tasks
export const removeThisWeekTask = createAsyncThunk('remove_this_week_task',
    async (credentials) => {
        try {
            console.log("Its is entering here!!")
            const request = await api.get(`/weeks/`)
            const response = request.data
            if (request.status == 200) {
                let data = response.filter((item) => item.user == credentials.userid && item.week_number == credentials.week_id)
                console.log(data[0].weekdetails_set[0].id)
                const req = await api.patch(`/week_details/${data[0].weekdetails_set[0].id}/`, { this_weeks_tasks: credentials.this_weeks_tasks })
                const res = req.data
                if (req.status == 200) {
                    console.log("The file has been uploaded")
                    console.log(res)
                } else {
                    console.log("Something went wrong while uploading the data ")
                }
            } else {
                console.log("Something went wrong while uploading the file")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

//////////////////////////////////////////////////////////THIS WEEK TASKS//////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////TECHNICAL WORKOUT TASKS//////////////////////////////////////////////////////////////////


//getting the technical task
export const get_technical_tasks = createAsyncThunk('get_technical_tasks',
    async (credentials) => {
        try {
            console.log("Its is entering here!!")
            const request = await api.get(`/weeks/`)
            const response = request.data
            if (request.status == 200) {
                let data = await response.filter((item) => item.user == credentials.userid && item.week_number == credentials.week_id)
                console.log(data)
                return data[0]?.weekdetails_set[0]?.technical_tasks
                // return data
            } else {
                console.log("Something went wrong while uploading the file")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

//uploading technical task
export const technical_tasks = createAsyncThunk('technical_tasks',
    async (credentials) => {
        try {
            const request = await api.get(`/weeks/`)
            const response = request.data
            console.log("This is the initial response: ", response)
            if (request.status == 200) {
                let data = response.filter((item) => item.user == credentials.userid && item.week_number == credentials.week_id)
                console.log("This is the data: ", data)
                console.log(data[0].weekdetails_set[0].id)
                const req = await api.patch(`/week_details/${data[0].weekdetails_set[0].id}/`, credentials?.technical_tasks)
                const res = req.data
                if (req.status == 200) {
                    console.log(res)
                } else {
                    console.log("Something went wrong while uploading the data ")
                }
            } else {
                console.log("Something went wrong while uploading the file")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)


//removing technical tasks
export const removeTechnicalTask = createAsyncThunk('remove_technical_task',
    async (credentials) => {
        try {
            console.log("Its is entering here!!")
            const request = await api.get(`/weeks/`)
            const response = request.data
            if (request.status == 200) {
                let data = response.filter((item) => item.user == credentials.userid && item.week_number == credentials.week_id)
                console.log(data[0].weekdetails_set[0].id)
                const req = await api.patch(`/week_details/${data[0].weekdetails_set[0].id}/`, { technical_tasks: credentials.technical_tasks })
                const res = req.data
                if (req.status == 200) {
                    console.log("The file has been uploaded")
                    console.log(res)
                } else {
                    console.log("Something went wrong while uploading the data ")
                }
            } else {
                console.log("Something went wrong while uploading the file")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)




//////////////////////////////////////////////////////////TECHNICAL WORKOUT TASKS//////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////PERSONAL WORKOUT TASKS//////////////////////////////////////////////////////////////////


//getting the technical task
export const get_personal_tasks = createAsyncThunk('get_technical_tasks',
    async (credentials) => {
        try {
            console.log("Its is entering here!!")
            const request = await api.get(`/weeks/`)
            const response = request.data
            if (request.status == 200) {
                let data = await response.filter((item) => item.user == credentials.userid && item.week_number == credentials.week_id)
                console.log(data)
                return data[0]?.weekdetails_set[0]?.personal_tasks
                // return data
            } else {
                console.log("Something went wrong while uploading the file")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

//uploading technical task
export const personal_tasks = createAsyncThunk('technical_tasks',
    async (credentials) => {
        try {
            const request = await api.get(`/weeks/`)
            const response = request.data
            console.log("This is the initial response: ", response)
            if (request.status == 200) {
                let data = response.filter((item) => item.user == credentials.userid && item.week_number == credentials.week_id)
                console.log("This is the data: ", data)
                console.log(data[0].weekdetails_set[0].id)
                const req = await api.patch(`/week_details/${data[0].weekdetails_set[0].id}/`, credentials?.personal_tasks)
                const res = req.data
                if (req.status == 200) {
                    console.log(res)
                } else {
                    console.log("Something went wrong while uploading the data ")
                }
            } else {
                console.log("Something went wrong while uploading the file")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)


//removing personal tasks
export const removePersonalTasks = createAsyncThunk('remove_technical_task',
    async (credentials) => {
        try {
            console.log("Its is entering here!!")
            const request = await api.get(`/weeks/`)
            const response = request.data
            if (request.status == 200) {
                let data = response.filter((item) => item.user == credentials.userid && item.week_number == credentials.week_id)
                console.log(data[0].weekdetails_set[0].id)
                const req = await api.patch(`/week_details/${data[0].weekdetails_set[0].id}/`, { personal_tasks: credentials.personal_tasks })
                const res = req.data
                if (req.status == 200) {
                    console.log("The file has been uploaded")
                    console.log(res)
                } else {
                    console.log("Something went wrong while uploading the data ")
                }
            } else {
                console.log("Something went wrong while uploading the file")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)






//////////////////////////////////////////////////////////PERSONAL WORKOUT TASKS//////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////MISCELLENOUS WORKOUT TASKS//////////////////////////////////////////////////////////////////


//getting the miscellenous task
export const get_miscellenous_tasks = createAsyncThunk('get_technical_tasks',
    async (credentials) => {
        try {
            console.log("Its is entering here!!")
            const request = await api.get(`/weeks/`)
            const response = request.data
            if (request.status == 200) {
                let data = await response.filter((item) => item.user == credentials.userid && item.week_number == credentials.week_id)
                console.log(data)
                return data[0]?.weekdetails_set[0]?.miscellenous_tasks
                // return data
            } else {
                console.log("Something went wrong while uploading the file")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

//uploading miscellenous task
export const miscellenous_tasks = createAsyncThunk('technical_tasks',
    async (credentials) => {
        try {
            const request = await api.get(`/weeks/`)
            const response = request.data
            console.log("This is the initial response: ", response)
            if (request.status == 200) {
                let data = response.filter((item) => item.user == credentials.userid && item.week_number == credentials.week_id)
                console.log("This is the data: ", data)
                console.log(data[0].weekdetails_set[0].id)
                const req = await api.patch(`/week_details/${data[0].weekdetails_set[0].id}/`, credentials?.miscellenous_tasks)
                const res = req.data
                if (req.status == 200) {
                    console.log(res)
                } else {
                    console.log("Something went wrong while uploading the data ")
                }
            } else {
                console.log("Something went wrong while uploading the file")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)


//removing miscellenous tasks
export const removeMiscellenousTasks = createAsyncThunk('remove_technical_task',
    async (credentials) => {
        try {
            console.log("Its is entering here!!")
            const request = await api.get(`/weeks/`)
            const response = request.data
            if (request.status == 200) {
                let data = response.filter((item) => item.user == credentials.userid && item.week_number == credentials.week_id)
                console.log(data[0].weekdetails_set[0].id)
                const req = await api.patch(`/week_details/${data[0].weekdetails_set[0].id}/`, { miscellenous_tasks: credentials.miscellenous_tasks })
                const res = req.data
                if (req.status == 200) {
                    console.log("The file has been uploaded")
                    console.log(res)
                } else {
                    console.log("Something went wrong while uploading the data ")
                }
            } else {
                console.log("Something went wrong while uploading the file")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)






//////////////////////////////////////////////////////////MISCELLENOUS WORKOUT TASKS//////////////////////////////////////////////////////////////////



const initialState = {
    data: [],
    isLoading: true,
    msg: 'still loading'
}

export const WeekDetailsSlice = createSlice({
    name: 'weekDetails',
    initialState,
    reducers: {

    },
    extraReducers: {
        [WeekDetailsUser.pending]: (state) => {
            state.data = []
            state.isLoading = true
            state.msg = 'It is still on loading'
        },
        [WeekDetailsUser.fulfilled]: (state, action) => {
            state.data = action.payload
            state.isLoading = false
            state.msg = 'The week details have been loaded'
        },
        [WeekDetailsUser.rejected]: (state) => {
            state.data = []
            state.isLoading = false
            state.msg = 'The load has been completed but something went wrong while loading it'
        },
        [get_week_task.pending]: (state) => {
            state.data = []
            state.isLoading = true
            state.msg = 'It is still on loading'
        },
        [get_week_task.fulfilled]: (state, action) => {
            state.data = action.payload
            state.isLoading = false
            state.msg = 'The week details have been loaded'
        },
        [get_week_task.rejected]: (state) => {
            state.data = []
            state.isLoading = false
            state.msg = 'The load has been completed but something went wrong while loading it'
        },
        [get_technical_tasks.pending]: (state) => {
            state.data = []
            state.isLoading = true
            state.msg = 'It is technical tasks is on loading'
        },
        [get_technical_tasks.fulfilled]: (state, action) => {
            state.data = action.payload
            state.isLoading = false
            state.msg = 'The technical task have been loaded'
        },
        [get_technical_tasks.rejected]: (state) => {
            state.data = []
            state.isLoading = false
            state.msg = 'The load has been completed but something went wrong while loading the technical task'
        },
        [get_personal_tasks.pending]: (state) => {
            state.data = []
            state.isLoading = true
            state.msg = 'It is personal tasks is on loading'
        },
        [get_personal_tasks.fulfilled]: (state, action) => {
            state.data = action.payload
            state.isLoading = false
            state.msg = 'The personal task have been loaded'
        },
        [get_personal_tasks.rejected]: (state) => {
            state.data = []
            state.isLoading = false
            state.msg = 'The load has been completed but something went wrong while loading the personal task'
        },
    }
})

export default WeekDetailsSlice.reducer