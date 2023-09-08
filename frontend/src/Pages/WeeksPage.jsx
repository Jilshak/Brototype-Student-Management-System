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

  //getting the current week number
  const count = week?.reduce((accumulator, week) => {
    if (week?.completed) {
      return accumulator + 1;
    }
    return accumulator;
  }, 1);

  const totlaWeeks = 28


  const perfomance = week?.reduce((accumulator, week) => {
    if (week?.completed) {
      let marks = week?.weekdetails_set[0].Marks
      return accumulator + marks
    }
    return accumulator
  }, 0)

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
      if (decode?.is_superuser || decode?.is_reviewer || decode?.is_advisor) {
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
            null
          ) :

          <>

            <div className='lg:mx-[100px] relative lg:left-0 lg:bottom-6 xs:left-[-30px] md:mx-[70px] min-w-[400px] bg-[#303443] opacity-70 my-[20px] rounded-2xl'>
              <div className='grid lg:mx-[50px]  xs:mt-[60px] lg:grid-cols-6 md:grid-cols-3 gap-1.5 sm:grid-cols-3 xs:grid-cols-3'>

                {
                  week ?
                    week.map((item) => {
                      return (
                        <Link key={item.id} to={decode?.is_superuser || decode?.is_advisor || decode?.is_reviewer ? `/week_detail/${item.week_number}/${id}` : `/week_detail/${item.week_number}`}>
                          <div className={` ${item.weekdetails_set[0].conducted_on && (item.weekdetails_set[0].Marks >= 7 ? 'bg-green-500' :
                            (item.weekdetails_set[0].Marks < 7 && item.weekdetails_set[0].Marks >= 6 ? 'bg-yellow-500' : (item.weekdetails_set[0].Marks < 6 && item.weekdetails_set[0].Marks >= 5 ? 'bg-orange-500' : 'bg-blue-400')))} flex lg:lg:w-[110px] xs:w-[70px]items-center justify-center py-4 my-4 mx-6 rounded-xl bg-[#3E4257] text-white`}>
                            <h1>Week {item.week_number}</h1>
                          </div>
                        </Link>
                      )
                    })

                    : null
                }

              </div>
            </div>

            <div className='grid lg:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 lg:mx-[100px] min-w-[400px] relative lg:right-0 xs:right-8 lg:me-10'>
              <div className='bg-[#303443] grid lg:mt-0 xs:mt-5 grid-flow-row max-w-[490px] py-4 opacity-70 rounded-2xl'>
                <span className=' bg-[#232530] my-2 p-1 flex items-center opacity-40 mx-5 rounded-lg'>
                  <p className='mx-5'>Total Number of Weeks : 28</p>
                </span>
                <span className=' bg-[#232530] my-2 p-1 flex items-center opacity-40 mx-5 rounded-lg'>
                  <p className='mx-5'>Current Week : {count}</p>
                </span>
                <span className=' bg-[#232530] cursor-pointer my-2 flex items-center opacity-40 mx-5 rounded-lg'>
                  <p className='mx-5'> Perfomance : {count === 1 ? <span className='text-purple-500'>Just Started</span> : (perfomance/(count-1) >= 7 ? <span className='text-green-500'>Excellent</span> : (perfomance/(count-1) >= 6 && perfomance/(count-1) < 7 ? <span className='text-yellow-500'>Good</span> : <span className='text-orange-500'>Avarage</span>))} </p>
                </span>
                <span className=' bg-[#232530] my-2 p-1 flex items-center opacity-40 mx-5 rounded-lg'>
                  <p className='mx-5 '>Weeks Remaining : {totlaWeeks - count}</p>
                </span>
              </div>

              <div className='bg-[#303443] grid lg:mt-0 min-w-[400px] relative xs:mt-8 grid-flow-row max-w-[500px] lg:ms-[20px] xs:ms-[0px] py-4 opacity-70 rounded-2xl'>
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
