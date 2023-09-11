import React, { useEffect, useState } from 'react'
import authenticated from '../icons/authenticated.png'
import remove from '../icons/remove.png'
import { useDispatch, useSelector } from 'react-redux'
import { UnauthorizedIntern, authorize, unauthorized } from '../features/AuthorizeSlice'

function AuthorizePage() {

  let dispatch = useDispatch()


  const unauthorizedIntern = useSelector((state) => state.Authorize)

  const [authIntern, setAuthIntern] = useState()

  useEffect(() => {
    dispatch(UnauthorizedIntern())
  }, [dispatch])

  useEffect(() => {
    if (unauthorizedIntern.data.length > 0) {
      return setAuthIntern(unauthorizedIntern.data)
    }
  }, [unauthorizedIntern.data])

  const authorizeUser = async (id) => {
    await dispatch(authorize(id))
    setAuthIntern(prevList => prevList.filter(intern => intern.id !== id))
  }
  
  const removeUser = async (id) => {
    await dispatch(unauthorized(id))
    setAuthIntern(prevList => prevList.filter(intern => intern.id !== id ))
  }

  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1  m-[50px]'>

      <div className='bg-[#131620] mx-4 mb-8 lg:min-h-[650px] md:min-h-[450px] sm:min-h-[300px] xs:min-h-[150px] min-w-[280px] rounded-2xl'>
        <div className='flex items-center justify-center text-xl my-5'>
          <p>Unauthorized Interns</p>
        </div>
        {
          authIntern ?
            <div className='grid grid-flow-row mx-[30px]'>
              {authIntern.map((item) => {
                if (item.is_user &&
                  !item.is_superuser &&
                  !item.is_advisor &&
                  !item.is_reviewer &&
                  !item.authenticated
                ) {
                  return (
                    <div key={item.id} className='flex bg-[#1C202F] items-center justify-around my-3 p-2 rounded-lg'>
                      <span className='bg-[#252731] flex justify-center items-center min-w-[30px] min-h-[30px] rounded-full'>
                        {item.id}
                      </span>
                      <span className='mx-[15px]'>
                        {item.username}
                      </span>
                      <small className='ms-4'>
                        Batch_id: {item.batch}
                      </small>
                      <span className='ms-8 flex items-center'>
                        <img onClick={(e) => removeUser(item.id)} className='min-h-[24px] me-4 min-w-[20px] max-h-[20px] max-w-[20px] cursor-pointer' src={remove} alt="" />
                        <img onClick={(e) => authorizeUser(item.id)} className='min-h-[20] min-w-[20px] max-h-[20px] max-w-[20px] cursor-pointer' src={authenticated} alt="" />
                      </span>
                    </div>
                  )
                } else {
                  return null
                }

              })}
            </div> : null
        }
      </div>
      <div className='bg-[#131620] mx-4 mb-8 lg:min-h-[650px] md:min-h-[450px] sm:min-h-[300px] xs:min-h-[150px] min-w-[280px] rounded-2xl'>
        <div className='flex items-center justify-center text-xl my-5'>
          <p>Unauthorized Advisors</p>
        </div>
        {
          authIntern ?
            <div className='grid grid-flow-row mx-[30px]'>
              {
                authIntern.map((item) => {
                  if (item.is_user &&
                    item.is_advisor && !item.authenticated
                  ) {
                    return (
                      <div className='flex bg-[#1C202F] items-center justify-around my-3 p-2 rounded-lg'>
                        <span className='bg-[#252731] flex justify-center items-center min-w-[30px] min-h-[30px] rounded-full'>
                          {item.id}
                        </span>
                        <span className='mx-[15px]'>
                          {item.username}
                        </span>
                        <span className='ms-8'>
                          <img onClick={(e) => authorizeUser(item.id)} className='min-h-[20] min-w-[20px] max-h-[20px] max-w-[20px] cursor-pointer' src={authenticated} alt="" />
                        </span>
                      </div>
                    )
                  }
                })
              }
            </div> : null
        }
      </div>
      <div className='bg-[#131620] mb-8 mx-4 lg:min-h-[650px] md:min-h-[450px] sm:min-h-[300px] xs:min-h-[150px] min-w-[280px] rounded-2xl'>
        <div className='flex items-center justify-center text-xl my-5'>
          <p>Unauthorized Reviewers</p>
        </div>
        {
          authIntern ?
            <div className='grid grid-flow-row mx-[30px]'>
              {
                authIntern.map((item) => {
                  if (item.is_user && item.is_reviewer && !item.authenticated) {
                    return (
                      <div className='flex bg-[#1C202F] items-center justify-around my-3 p-2 rounded-lg'>
                        <span className='bg-[#252731] flex justify-center items-center min-w-[30px] min-h-[30px] rounded-full'>
                          {item.id}
                        </span>
                        <span className='mx-[15px]'>
                          {item.username}
                        </span>
                        
                        <span className='ms-8'>
                          <img onClick={(e) => authorizeUser(item.id)} className='min-h-[20] min-w-[20px] max-h-[20px] max-w-[20px] cursor-pointer' src={authenticated} alt="" />
                        </span>
                      </div>
                    )
                  }
                })
              }
            </div> : null
        }
      </div>




    </div>
  )
}

export default AuthorizePage
