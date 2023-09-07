import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



export const UserMessages = createAsyncThunk('user_messages',
    async (room_id) => {
        try {
            const request = await axios.get(`http://127.0.0.1:8000/chat/messages/`)
            const response = request.data
            if (request.status === 200) {
                console.log("The message list has been loaded")
                let data = await response.filter((item) => item.thread_name == room_id)
                console.log("This is the data: ", data)
                return data

            } else {
                console.log("Something happened while getting the messages!!")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)

export const GetChattingUsers = createAsyncThunk('get_chatting_user',
    async (credential) => {
        try {
            const request = axios.get(`http://127.0.0.1:8000/users/`)
            const response = (await request).data

            if ((await request).status === 200) {
                let data = response.filter((user) => user.id == credential.user || credential.reciever)
                return data
            } else {
                console.log("Something wrong occured while fetching the users data from the endpoint")
            }
        } catch (error) {
            console.log(error)
        }
    }
)


//filter through the messages to find the users which you have send messages to using --> sender id
//after getting the messages find to whom you have send the messages using ---> receiver id
//after that according to the message timestamp you can show the users according to the time the message has been send to
export const GetHistory = createAsyncThunk('get_history',
    async (id) => {
        try {
            const requst = await axios.get(`http://127.0.0.1:8000/chat/messages/`)
            const response = requst.data
            if (requst.status == 200) {
                let data = await response.filter((item) => item.sender == id || item.receiver == id)
                let reciever_ids = data.map((item) => item.receiver)
                reciever_ids.push(id)
                let sender_ids = data.map((item) => item.sender)
                let uniqueIds = [...new Set([...reciever_ids, ...sender_ids])];
                console.log("This is the getHistory user data: ", data)
                console.log("These are the receiver ids: ", reciever_ids)
                const req = await axios.get(`http://127.0.0.1:8000/users/`)
                const res = req.data
                if (req.status === 200) {
                    const data = res.filter((item) => uniqueIds.includes(item.id))
                    let final = data.sort((a, b) => {
                        // Find the most recent message timestamp for each user
                        const timestampA = response
                            .filter((message) => message.receiver === a.id || message.sender === a.id)
                            .map((message) => new Date(message.timestamp))
                            .reduce((max, current) => (current > max ? current : max), new Date(0));

                        const timestampB = response
                            .filter((message) => message.receiver === b.id || message.sender === b.id)
                            .map((message) => new Date(message.timestamp))
                            .reduce((max, current) => (current > max ? current : max), new Date(0));

                        // Sort in descending order based on the message timestamp
                        return timestampB - timestampA;
                    });

                    console.log("This is the getHistory user data1: ", final)
                    return final

                }
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)


/////for Notifications
export const getNotifications = createAsyncThunk('get_notification',
    async (decode) => {
        try {
            const request = await axios.get(`http://127.0.0.1:8000/chat/notification/`)
            const response = request.data
            if (request.status === 200) {
                const req = await axios.get(`http://127.0.0.1:8000/users/${decode.user_id}/`)
                const res = await req.data
                if (req.status === 200) {
                    let joining_date = await res.date_joined
                    console.log("This is the res from the notification slice: ", res)

                    if (res?.authenticated && decode.is_user &&  !decode.is_advisor && !decode.is_reviewer && !decode.is_superuser) {
                        let data = response.filter((item) => (item.thread_name == 'noti_36_1' && item.timestamp > joining_date) || (item.thread_name == 'noti_36_123' && item.timestamp > joining_date) )
                        return data
                    } else if (decode.is_user && decode.is_advisor && !decode.is_reviewer && !decode.is_superuser) {
                        let data = response.filter((item) => item.thread_name == 'noti_36_2' || item.thread_name == 'noti_36_123')
                        return data
                    } else if (decode.is_user && decode.is_reviewer && !decode.is_superuser && !decode.is_advisor) {
                        let data = response.filter((item) => item.thread_name == 'noti_36_3' || item.thread_name == 'noti_36_123')
                        return data
                    } else if (decode.is_superuser){
                        return response
                    }else{
                        return null
                    }
                }
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
)



const initialState = {
    isLoading: false,
    data: [],
    notification: [],
    user_details: [],
    history: [],
    msg: 'Still in the intial state'
}

const ChatSlice = createSlice({
    name: 'chat_slice',
    initialState,
    reducers: {

    },
    extraReducers: {
        [UserMessages.pending]: (state) => {
            state.isLoading = true
            state.data = []
            state.msg = "The state is still loading!!"
        },
        [UserMessages.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.msg = "The state has been loaded"
        },
        [UserMessages.rejected]: (state) => {
            state.isLoading = false
            state.data = []
            state.msg = 'The loading of the state has been finished with some problem.'
        },
        [GetChattingUsers.pending]: (state) => {
            state.isLoading = true
            state.user_details = []
            state.msg = "The state is still loading!!"
        },
        [GetChattingUsers.fulfilled]: (state, action) => {
            state.isLoading = false
            state.user_details = action.payload
            state.msg = "The state has been loaded"
        },
        [GetChattingUsers.rejected]: (state) => {
            state.isLoading = false
            state.user_details = []
            state.msg = 'The loading of the state has been finished with some problem.'
        },


        [GetHistory.pending]: (state) => {
            state.isLoading = true
            state.history = []
            state.msg = "The state is still loading!!"
        },
        [GetHistory.fulfilled]: (state, action) => {
            state.isLoading = false
            state.history = action.payload
            state.msg = "The state has been loaded"
        },
        [GetHistory.rejected]: (state) => {
            state.isLoading = false
            state.history = []
            state.msg = 'The loading of the state has been finished with some problem.'
        },


        [getNotifications.pending]: (state) => {
            state.isLoading = true
            state.history = []
            state.msg = "The state is still loading!!"
        },
        [getNotifications.fulfilled]: (state, action) => {
            state.isLoading = false
            state.notification = action.payload
            state.msg = "The state has been loaded"
        },
        [getNotifications.rejected]: (state) => {
            state.isLoading = false
            state.notification = []
            state.msg = 'The loading of the state has been finished with some problem.'
        },
    }
})



export default ChatSlice.reducer

