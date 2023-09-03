import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fullUserList } from '../features/UserSlice'
import jwtDecode from 'jwt-decode';
import noprofile from '../icons/noprofile.png'
import { Link } from 'react-router-dom';

function ChatPage() {

  const dispatch = useDispatch()
  const userList = useSelector((state) => (state.Users))

  let access = localStorage.getItem("authToken")
  let decode = jwtDecode(access)

  useEffect(() => {
    dispatch(fullUserList())
  }, [dispatch])

  return (
    <div className='grid  justify-center'>
      <div className='bg-[#191C24] relative w-[450px] h-[600px] top-20 rounded-xl overflow-y-auto'>
        <div className='flex items-center justify-center my-5'>
          <input className='w-[330px] py-1.5 rounded-full outline-none text-white pl-5 bg-[#0F121A]' type="text" placeholder='Search User...' />
        </div>
        <div>
          {
            !userList.isLoading && decode && userList.state.length >= 1 ?
              <>
                {
                  userList?.state?.map((item) => {
                    //for the user
                    if (decode.is_user && !decode.is_advisor && !decode.is_reviewer && !decode.is_superuser) {
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
                    } else if (decode.is_user && decode.is_advisor && !decode.is_reviewer && !decode.is_superuser) {
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
                    } else if (decode.is_user && decode.is_reviewer && !decode.is_advisor && !decode.is_superuser) {
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
                    }
                  })
                }
              </> : null
          }
        </div>
      </div>
    </div>
  )
}

export default ChatPage
