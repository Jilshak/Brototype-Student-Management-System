import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fullUserList } from '../features/UserSlice'
import jwtDecode from 'jwt-decode';
import search from '../icons/search.png'
import contacts from '../icons/contacts.png'
import chat from '../icons/chat.png'
import noprofile from '../icons/noprofile.png'
import { Link } from 'react-router-dom';
import { GetHistory } from '../features/ChatSlice';

function ChatPage() {

  const dispatch = useDispatch()
  const userList = useSelector((state) => (state.Users))
  const recent = useSelector((state) => (state.Chats))

  const [users, setUsers] = useState([])
  const [recentChats, setRecentChats] = useState([])

  //for selecting the grid item
  const [selectedItem, setSelectedItem] = useState(0);
  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  let access = localStorage.getItem("authToken")
  let decode = jwtDecode(access)

  useEffect(() => {
    dispatch(fullUserList())
  }, [dispatch])

  //useEffect for setting the userdata into the state
  useEffect(() => {
    if (userList.state.length >= 1) {
      setUsers(userList.state)
    }
  }, [userList.state])


  //Search option
  const [find, setFind] = useState();
  const searchItem = async (e) => {
    if (!find) {
      setFind(users);
    }
    if (e.target.value === '') {
      setUsers(find);
    } else {
      setUsers(await users.filter((item) => {
        return item.username.startsWith(e.target.value);
      }));
    }
  }

  const history = () => {
    dispatch(GetHistory(decode.user_id))
  }

  useEffect(() => {
    if (recent?.history?.length >= 1) {
      console.log("This is the recentChats: ", recentChats)
      setRecentChats(recent.history)
    }
  }, [recent?.history, dispatch])

  return (
    <div className='grid  justify-center'>
      <div className='bg-[#191C24]  relative min-w-[400px] max-w-[450px] h-[600px] left-[-30px] top-20 rounded-xl overflow-y-auto'>
        {
          selectedItem == 0 ?
            <>
              <div className='flex items-center justify-center my-5 relative'>
                <input onChange={searchItem} className='w-[330px] py-1.5 rounded-full outline-none text-white pl-5 bg-[#0F121A]' type="text" placeholder='Search User...' />
                <img className='h-4 absolute right-20' src={search} alt="" />
              </div>
              <div>
                {
                  !userList.isLoading && decode && userList.state.length >= 1 ?
                    <div className='overflow-y-auto max-h-[460px]'>
                      {
                        users.map((item) => {
                          //for the user
                          if (decode.is_user && item.authenticated && !decode.is_advisor && !decode.is_reviewer && !decode.is_superuser) {
                            if (item.id !== decode.user_id && !item.is_reviewer && !item.is_superuser) {
                              return (
                                <Link to={`/chat_page/${item.id}/${decode.user_id}`}>
                                  <div className='flex my-4 gap-3 items-center cursor-pointer mx-5 bg-[#0c0e14] rounded-xl'>
                                    <div className='flex relative mx-3 py-1 items-center'>
                                      <span>
                                        <img className='h-12 w-12 object-cover rounded-full' src={item.image ? item.image : noprofile} alt="" />
                                      </span>
                                      <p className='ms-5'>{item.username}</p>
                                    </div>
                                    <p className='ml-auto mr-4 text-sm bg-slate-800 p-1 rounded-xl text-[#a8a8a9]'>
                                      {item.is_user && !item.is_advisor && !item.is_reviewer && !item.is_superuser ? `Intern`
                                        : (item.is_user && item.is_advisor && !item.is_reviewer && !item.is_superuser ? 'Advisor' : 'Reviewer')}
                                    </p>
                                  </div>
                                </Link>
                              )
                            }
                            //for the advisor
                          } else if (decode.is_user && item.authenticated && decode.is_advisor && !decode.is_reviewer && !decode.is_superuser) {
                            if (item.id !== decode.user_id) {
                              return (
                                <Link to={`/chat_page/${item.id}/${decode.user_id}`}>
                                  <div className='flex my-4 gap-3 items-center cursor-pointer mx-5 bg-[#0c0e14] rounded-xl'>
                                    <div className='flex relative mx-3 py-1 items-center'>
                                      <span>
                                        <img className='h-12 w-12 object-cover rounded-full' src={item.image ? item.image : noprofile} alt="" />
                                      </span>
                                      <p className='ms-5'>{item.username}</p>
                                    </div>
                                    <p className='ml-auto mr-4 text-sm bg-slate-800 p-1 rounded-xl text-[#a8a8a9]'>
                                      {item.is_user && !item.is_advisor && !item.is_reviewer && !item.is_superuser ? `Intern`
                                        : (item.is_user && item.is_advisor && !item.is_reviewer && !item.is_superuser ? 'Advisor' : 'Reviewer')}
                                    </p>
                                  </div>
                                </Link>
                              )
                            }
                            //for the reviewer
                          } else if (decode.is_user && item.authenticated && decode.is_reviewer && !decode.is_advisor && !decode.is_superuser) {
                            if (item.id !== decode.user_id && !item.batch) {
                              return (
                                <Link to={`/chat_page/${item.id}/${decode.user_id}`}>
                                  <div className='flex my-4 gap-3 items-center cursor-pointer mx-5 bg-[#0c0e14] rounded-xl'>
                                    <div className='flex relative mx-3 py-1 items-center'>
                                      <span>
                                        <img className='h-12 w-12 object-cover rounded-full' src={item.image ? item.image : noprofile} alt="" />
                                      </span>
                                      <p className='ms-5'>{item.username}</p>
                                    </div>
                                    <p className='ml-auto mr-4 text-sm bg-slate-800 p-1 rounded-xl text-[#a8a8a9]'>
                                      {item.is_user && !item.is_advisor && !item.is_reviewer && !item.is_superuser ? `Intern`
                                        : (item.is_user && item.is_advisor && !item.is_reviewer && !item.is_superuser ? 'Advisor' : 'Reviewer')}
                                    </p>
                                  </div>
                                </Link>
                              )
                            }
                            //for admin
                          } else {
                            if (item.id !== decode.user_id && !item.batch && item.authenticated) {
                              return (
                                <Link to={`/chat_page/${item.id}/${decode.user_id}`}>
                                  <div className='flex my-4 gap-3 items-center cursor-pointer mx-5 bg-[#0c0e14] rounded-xl'>
                                    <div className='flex relative mx-3 py-1 items-center'>
                                      <span>
                                        <img className='h-12 w-12 object-cover rounded-full' src={item.image ? item.image : noprofile} alt="" />
                                      </span>
                                      <p className='ms-5'>{item.username}</p>
                                    </div>
                                    <p className='ml-auto mr-4 text-sm bg-slate-800 p-1 rounded-xl text-[#a8a8a9]'>
                                      {item.is_user && !item.is_advisor && !item.is_reviewer && !item.is_superuser ? `Intern`
                                        : (item.is_user && item.is_advisor && !item.is_reviewer && !item.is_superuser ? 'Advisor' : 'Reviewer')}
                                    </p>
                                  </div>
                                </Link>
                              )
                            }
                          }
                        })
                      }
                    </div>
                    : null
                }
              </div>
            </>
            :
            <>
              {
                recentChats && recent.history.length >= 1 ?
                  <>
                    {
                      recentChats.map((item) => {
                        if (item.id !== decode.user_id) {
                          return (
                            <Link to={`/chat_page/${item.id}/${decode.user_id}`}>
                              <div className='flex my-4 gap-3 items-center cursor-pointer mx-5 bg-[#0c0e14] rounded-xl'>
                                <div className='flex relative mx-3 py-1 items-center'>
                                  <span>
                                    <img className='h-12 w-12 object-cover rounded-full' src={item.image ? item.image : noprofile} alt="" />
                                  </span>
                                  <p className='ms-5'>{item.username}</p>
                                </div>
                                <p className='ml-auto mr-4 text-sm bg-slate-800 p-1 rounded-xl text-[#a8a8a9]'>
                                  {item.is_user && !item.is_advisor && !item.is_reviewer && !item.is_superuser ? `Intern`
                                    : (item.is_user && item.is_advisor && !item.is_reviewer && !item.is_superuser ? 'Advisor' : 'Reviewer')}
                                </p>
                              </div>
                            </Link>
                          )
                        }
                      })
                    }
                  </> : null
              }
            </>
        }
        <div className='grid grid-cols-2 items-center bg-[#1f2837] min-h-[50px] absolute opacity-70 justify-center bottom-0 w-full'>
          <div onClick={() => handleItemClick(0)} className={`flex cursor-pointer h-full items-center hover:bg-#243145 justify-center ${selectedItem == '0' ? 'bg-[#243145]' : ''}`}>
            <img className='h-7' src={contacts} alt="" />
          </div>
          <div onClick={() => {
            handleItemClick(1)
            history()
          }} className={`flex cursor-pointer h-full items-center  justify-center ${selectedItem == '1' ? 'bg-[#243145]' : ''}`}>
            <img className='h-7' src={chat} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
