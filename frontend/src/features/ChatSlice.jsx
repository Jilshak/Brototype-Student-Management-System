import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


// export const SocketConnection = createAsyncThunk('socket_connection',
//     async (room_id) => {
//         try {
//             console.log("This is the room id: ", room_id)
//             const request = await new WebSocket(`ws://127.0.0.1:8000/ws/chat/${room_id}/`)
//             request.onclose((event) => {
//                 console.log("Socket has been closed!!")
//             })
//         } catch (error) {
//             console.log("Error: ", error)
//         }
//     }
// )

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
                    console.log("This is the getHistory user data1: ", data)
                    return data
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
    }
})



export default ChatSlice.reducer

