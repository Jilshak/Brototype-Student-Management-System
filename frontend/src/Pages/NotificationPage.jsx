import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import send from '../icons/send.png'
import { useDispatch, useSelector } from 'react-redux'
import { getNotifications } from '../features/ChatSlice';
import { SideBarNotification } from '../features/UserSlice';
import { base } from '../services/Axios';


function NotificationPage() {

  let access = localStorage.getItem("authToken")
  const decode = jwtDecode(access)

  const [input, setInput] = useState('')
  const [selected, setSelected] = useState('1')
  const [socket, setSocket] = useState()
  const [notification, setNotification] = useState([])

  const dispatch = useDispatch()
  const noti = useSelector((state) => (state.Chats))

  useEffect(() => {
    console.log("This is the base url: ", base)
    let credential = decode.is_superuser ? `36_${selected}`
      : (decode.is_user && !decode.is_advisor && !decode.is_reviewer && !decode.is_superuser ? `36_1`
        : decode.is_user && decode.is_advisor && !decode.is_reviewer ? `36_2` : `36_3`)
    let room_id = `noti_${credential}`
    const createSocket = async () => {
      console.log(decode)
      try {
        const request = await new WebSocket(`${base}/ws/notification/${credential}/`)
        await setSocket(request)

      } catch (error) {
        console.log("Error: ", error)
      }
    }
    createSocket()
  }, [selected])

  useEffect(() => {
    if (socket) {

      socket.onmessage = async (event) => {
        const message = await JSON.parse(event.data);
        console.log("This is the message: ", message)

        // Update messages in state and save to local storage
        setNotification(prevMessages => [...prevMessages, message])

      };

    }
  }, [socket]);

  useEffect(() => {
    dispatch(getNotifications(decode))
    dispatch(SideBarNotification(decode.user_id))
  }, [])

  //logic for sending the messages
  const handleSendNotification = async () => {
    if (socket && socket.readyState === socket.OPEN && input !== '') {
      await socket.send(JSON.stringify({ message: input, sender_username: decode?.username }));
    } else {
      console.log("Websocket is not open for you to send message")
    }
    await setInput('')
  };

  useEffect(() => {
    if (noti?.notification?.length >= 1) {
      setNotification(noti?.notification)
    }
  }, [noti?.notification])

  return (
    <div>
      {
        decode.is_superuser ?
          <>
            <div>
              <select onChange={(e) => {
                console.log("This is the current selected value: ", selected)
                console.log("This is the current event value: ", e.target.value)
                setSelected(e.target.value)
              }} className='flex h-12 pl-7 border-0 text-[#dcdada] outline-none absolute right-0 m-3 rounded-xl lg:w-[250px] md:w-[175px] sm:w-[150px] xs:w-[90px] items-center justify-end bg-[#23283A]'>
                <option className='truncate' value="0">SEND NOTIFICATIONS TO</option>
                <option value="1">INTERNS</option>
                <option value="2">ADVISORS</option>
                <option value="3">REVIEWERS</option>
                <option value="123">ALL</option>
              </select>
              <div className="w-full px-5 flex flex-col justify-between">
                <div className="flex flex-col h-[75vh] top-20 relative mt-5 overflow-x-auto">
                  {
                    !noti?.isLoading && noti?.notification?.length >= 1 ?
                      <>
                        {
                          notification?.map((item, index) => {
                            let timestamp = new Date(item.timestamp)
                            const day = timestamp.getDate()
                            const month = timestamp.getMonth() + 1
                            const year = timestamp.getFullYear()
                            return (
                              <div
                                key={index}
                                className={`flex justify-start mb-4`}
                              >
                                <div>
                                  <div
                                    className={`py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white `}
                                  >
                                    {item.message}
                                    <div className='flex items-end'>
                                      <p className='text-[8px]'>{`${year}/${month}/${day}`}</p>
                                    </div>
                                  </div>

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
              </div>
              <div className="py-5 bottom-0 flex absolute lg:mx-[300px] md:mx-[200px]">
                <input
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full max-w-[500px] lg:min-w-[500px] md:min-w-[400px] sm:min-w-[300px] xs:min-w-[300px] bg-[#0F121A] text-white pl-6 outline-none py-3  px-3 rounded-s-xl"
                  type="text"
                  placeholder="type your Notification message here..."
                  value={input}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    handleSendNotification()
                  }}
                  className="bg-[#0F121A] hover:bg-[#141824]  text-white px-5 me-0 relative right-0 py-3 rounded-e-lg"
                >
                  <img className='h-5 min-w-[15px]' src={send} alt="" />
                </button>
              </div>
            </div>
          </> :

          <>
            <div className="w-full h-[95vh] px-5 flex flex-col justify-between">
              <div className="flex flex-col relative top-5 mt-5 overflow-x-auto">
                {
                  !noti?.isLoading && noti?.notification?.length >= 1 ?
                    <>
                      {
                        notification?.map((item, index) => {
                          let timestamp = new Date(item.timestamp)
                          const day = timestamp.getDate()
                          const month = timestamp.getMonth() + 1
                          const year = timestamp.getFullYear()
                          return (
                            <div
                              key={index}
                              className={`flex justify-start mb-4`}
                            >
                              <div>
                                <div
                                  className={`py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white `}
                                >
                                  {item.message}
                                  <div className='flex items-end'>
                                    <p className='text-[8px]'>{`${year}/${month}/${day}`}</p>
                                  </div>
                                </div>

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

            </div>
          </>
      }
    </div>
  )
}

export default NotificationPage
