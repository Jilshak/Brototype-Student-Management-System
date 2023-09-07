import React, { useEffect, useRef, useState } from 'react'
import leftarrow from '../icons/leftarrow.png'
import noprofile from '../icons/noprofile.png'
import send from '../icons/send.png'
import jwtDecode from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetChattingUsers, UserMessages } from '../features/ChatSlice';


function ChattingPage() {

    //jwt decoding
    let access = localStorage.getItem("authToken")
    let decode = jwtDecode(access)

    //scroll to the last message send
    const lastMessageRef = useRef(null);

    //states for the handling of the functions
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState()

    //redux tools
    const dispatch = useDispatch()
    const userMessages = useSelector((state) => (state.Chats))

    //these are the user id required to create the chat_room id
    //the chat room id will look somethin like this : chat_5_3
    const { user_id, selected_id } = useParams()

    //setting up the room id and credentials
    const credential = user_id < selected_id ? `${user_id}_${selected_id}` : `${selected_id}_${user_id}`
    const room_id = `chat_${credential}`

    //back button functionality
    const navigate = useNavigate()
    const backButton = async () => {
        await navigate(-1)
        socket.close()
    }


    useEffect(() => {
        if (socket) {

            socket.onmessage = async (event) => {
                const message = await JSON.parse(event.data);
                console.log("This is the message: ", message)

                // Update messages in state and save to local storage
                setMessages(prevMessages => [...prevMessages, message])

            };

        }
    }, [room_id, socket]);

    // Creating the socket connection with retry logic
    //creating the socket connection
    useEffect(() => {
        let credential = user_id < selected_id ? `${user_id}_${selected_id}` : `${selected_id}_${user_id}`
        let room_id = `chat_${credential}`
        const createSocket = async () => {
            console.log(decode)
            try {
                const request = await new WebSocket(`ws://127.0.0.1:8000/ws/chat/${credential}/`)
                await setSocket(request)

            } catch (error) {
                console.log("Error: ", error)
            }
        }
        createSocket()
        dispatch(UserMessages(room_id))
    }, [])

    //for the message loading
    useEffect(() => {
        if (userMessages.data.length >= 1) {
            setMessages(userMessages.data)
        }
    }, [userMessages.data, dispatch])

    //for getting the user and the recepient details
    useEffect(() => {
        let credentials = {
            user: user_id,
            reciever: selected_id
        }
        dispatch(GetChattingUsers(credentials))
    }, [])


    //logic for sending the messages
    const handleSendMessage = async () => {
        if (socket && socket.readyState === socket.OPEN && input !== '') {
            await socket.send(JSON.stringify({ message: input, sender_username: decode?.username, receiver_id: String(user_id) }));
        } else {
            console.log("Websocket is not open for you to send message")
        }
        await setInput('')


        //using use ref to scroll back into view of the messages
        if (lastMessageRef.current) {
            await lastMessageRef.current.scrollIntoView({ behavior: 'smooth', target: lastMessageRef.current });
        }
        //if this dispatch is not there then the messages are multiplying each time i send them for no reason
        // dispatch(UserMessages(room_id))
    };



    return (
        <div className='h-screen w-screen'>
            <div className='h-16 bg-[#191C24] flex items-center'>
                <div onClick={backButton} className='bg-[#22242F] z-50 cursor-pointer ms-5 h-9 w-9 flex items-center justify-center rounded-full'>
                    <img className='h-5' src={leftarrow} alt="" />
                </div>
                <div className='absolute w-full right-0'>
                    {
                        userMessages.user_details && userMessages.user_details.length >= 1 ?
                            <>
                                {
                                    userMessages.user_details.map((item) => {
                                        if (item.id == user_id) {
                                            return (
                                                <div className='flex items-center justify-end'>
                                                    <p className='text-white font-semibold text-xl me-4'>{item.username}</p>
                                                    <span className='me-5 rounded-full h-12 w-12'>
                                                        <img className='h-12 rounded-full' src={item.image ? item.image : noprofile} />
                                                    </span>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </> : null
                    }
                </div>
            </div>
            <div>
                <div className="w-full h-[88vh] px-5 flex flex-col justify-between">
                    <div className="flex flex-col mt-5 overflow-x-auto">
                        {
                            !userMessages.isLoading && userMessages.data.length >= 1 ?
                                <>
                                    {
                                        messages?.map((item, index) => {
                                            const messageRef = index === messages.length - 1 ? lastMessageRef : null;
                                            return (
                                                <div
                                                    key={index}
                                                    className={`flex ${item.senderUsername === decode?.username || item?.sender === decode?.user_id ? 'justify-end' : 'justify-start'} mb-4`}
                                                    ref={messageRef}
                                                >
                                                    <div
                                                        className={`py-3 px-4 ${item.senderUsername === decode?.username || item?.sender === decode?.user_id ? 'bg-gray-300 rounded-br-3xl rounded-tr-3xl rounded-tl-xl' : 'bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white'}`}
                                                    >
                                                        {item.message}
                                                    </div>
                                                    <img
                                                        src={`https://source.unsplash.com/vpOeXr5wmR4/600x600`}
                                                        className="object-cover h-8 w-8 rounded-full"
                                                        alt=""
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </> : null
                        }
                    </div>
                    <div className="py-5 flex relative lg:mx-[300px] md:mx-[200px]">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full min-w-[350px] bg-[#0F121A] text-white pl-6 outline-none py-3  px-3 rounded-s-xl"
                            type="text"
                            placeholder="type your message here..."
                            value={input}
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                handleSendMessage()
                            }}
                            className="bg-[#0F121A] hover:bg-[#141824]  text-white px-5 me-0 relative right-0 py-3 rounded-e-lg"
                        >
                            <img className='h-5 min-w-[15px]' src={send} alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChattingPage
