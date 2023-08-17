import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import adminleftarrow from '../icons/adminleftarrow.png'
import { useDispatch, useSelector } from 'react-redux'
import { ProfileDetails } from '../features/UserSlice';
import jwtDecode from 'jwt-decode';



function WeeksPage() {

  const { id } = useParams()
  const [decode, setDecode] = useState()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const weeks = useSelector((state) => state.Users)

  const [week, setWeek] = useState()

  const goBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    let token = localStorage.getItem("authToken")
    setDecode(jwtDecode(token))
  }, [])

  useEffect(() => {
    if (decode) {
      setLoading(false)
      if (decode?.is_superuser) {
        dispatch(ProfileDetails(id))
      } else {
        dispatch(ProfileDetails(decode?.user_id))
      }
    } else {
      setLoading(true)
    }
  }, [dispatch, decode])


  useEffect(() => {
    if (weeks.state) {
      setWeek(weeks.state.weeks)
    }
  }, [weeks.state])

  return (
    <>
      {
        loading ?
          (
            <h1>Loading...</h1>
          ) :

          <>
            <span className={decode?.is_superuser ? 'h-[150px bg-[#22242F] absolute rounded-xl hover:bg-[#292b38] flex max-w-[50px] mx-[20px] top-[330px] py-10 px-2' : 'hidden'}>
              <button onClick={(e) => goBack()} className=''>
                <img className='h-[40px] opacity-70' src={adminleftarrow} alt="" />
              </button>
            </span>

            <div className='mx-[100px] bg-[#303443] opacity-70 my-[20px] rounded-2xl'>
              <div className='grid lg:mx-[50px] lg:grid-cols-6 md:grid-cols-3 gap-1.5 sm:grid-cols-3 xs:grid-cols-2'>

                {
                  week ?
                    week.map((item) => {
                      return (
                        <Link key={item.id} to={decode?.is_superuser ? `/week_detail/${item.week_number}/${id}` : `/week_detail/${item.week_number}`}>
                          <div className='flex lg:lg:w-[110px] xs:w-[70px]items-center justify-center py-4 my-4 mx-6 rounded-xl bg-[#3E4257] text-white'>
                            <h1>Week {item.week_number}</h1>
                          </div>
                        </Link>
                      )
                    })

                    : null
                }

              </div>
            </div>
            <div className='grid lg:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 mx-[100px] me-10'>
              <div className='bg-[#303443] grid grid-flow-row max-w-[450px] py-4 opacity-70 rounded-2xl'>
                <span className=' bg-[#232530] my-2 opacity-40 mx-5 rounded-lg'>
                  Total Number of Weeks: 28
                </span>
                <span className='bg-[#232530]  opacity-40 mx-5 rounded-lg'>
                  Current Week: 28
                </span>
                <span className='bg-[#232530] my-2 opacity-40 mx-5 rounded-lg'>
                  Overall Perfomance: Average
                </span>
                <span className='bg-[#232530]  opacity-40 mx-5 rounded-lg'>
                  Weeks Remaining: 0
                </span>
              </div>

              <div className='bg-[#303443] grid lg:mt-0 xs:mt-5 grid-flow-row max-w-[490px] lg:ms-[20px] xs:ms-[0px] py-4 opacity-70 rounded-2xl'>
                <span className=' bg-[#232530] my-2 p-1 flex opacity-40 mx-5 rounded-lg'>
                  <div className='bg-green-500 h-5 w-5 mx-4 my-1 rounded-full'></div>
                  <p>Task completed</p>
                </span>
                <span className=' bg-[#232530] my-2 p-1 flex opacity-40 mx-5 rounded-lg'>
                  <div className='bg-yellow-500 h-5 w-5 mx-4 my-1 rounded-full'></div>
                  <p>Task needs Improvement</p>
                </span>
                <span className=' bg-[#232530] my-2 p-1 flex opacity-40 mx-5 rounded-lg'>
                  <div className='bg-orange-500 h-5 w-5 mx-4 my-1 rounded-full'></div>
                  <p>Task Critical</p>
                </span>
                <span className=' bg-[#232530] my-2 p-1 flex opacity-40 mx-5 rounded-lg'>
                  <div className='bg-red-500 h-5 w-5 mx-4 my-1 rounded-full'></div>
                  <p>Task Not Complete</p>
                </span>
                <span className=' bg-[#232530] my-2 p-1 flex opacity-40 mx-5 rounded-lg'>
                  <div className='bg-blue-500 h-5 w-5 mx-4 my-1 rounded-full'></div>
                  <p>Week Repeat</p>
                </span>

              </div>
            </div>
          </>
      }
    </>
  )
}

export default WeeksPage
