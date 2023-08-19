import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode';
import { InternsWithReview, ReviewerTimeAssigned, ScheduledTimeforAdvisor, reviewersList } from '../features/ScheduleTimeSlice'
import remove from '../icons/remove.png'
import { book } from '../features/BookingSlice';

function SceduleTime() {

  //advisor id
  let access = localStorage.getItem("authToken")
  let decode = jwtDecode(access)

  let dispatch = useDispatch()
  const reviewers = useSelector((state) => (state.Schedule))
  const time = useSelector((state) => (state.Schedule))

  const [rev, setRev] = useState()
  const [intern, setIntern] = useState()
  const [times, setTimes] = useState()
  const [toggle, setToggle] = useState(false)
  const [user, setUser] = useState()

  useEffect(() => {
    dispatch(reviewersList())
    dispatch(InternsWithReview())
    dispatch(ScheduledTimeforAdvisor(decode.user_id))
  }, [dispatch])

  useEffect(() => {
    if (reviewers.data) {
      setRev(reviewers.data)
    }
    if (reviewers.Interns) {
      setIntern(reviewers.Interns)
    }
  }, [reviewers.data, reviewers.Interns])


  useEffect(() => {
    if (time.data1) {
      setTimes(time.data1)
    }
  }, [time.data1])

  //credentials
  const [slotId, setSlotId] = useState()

  const dispatchBook = async () => {
    let credentials = {
      intern: user.id,
      advisor: decode.user_id,
      slot: slotId
    }
    console.log(credentials)
    await dispatch(book(credentials))
    setToggle(false)
  }

  //states for booked schedule
  const [item, setItem] = useState()
  const [item2, setItem2] = useState()

  useEffect(() => {
    if (time.review) {
      setItem(time.review.data)
      setItem2(time.review.desired)
    }
  }, [time.review])

  return (
    <>
      <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1'>
        <div className='bg-[#111217] max-h-[400px] overflow-y-auto min-w-[400px] grid grid-flow-row mt-10 mx-10 rounded-lg'>
          <div className='flex items-center justify-center p-1 mx-[90px] my-[20px] rounded-lg bg-[#141621] '>
            <p className='text-xl'>INTERNS WITH REVIEW</p>
          </div>
          {
            intern ?
              <>
                {
                  intern.map((item) => {
                    return (
                      <div key={item.id} onClick={(e) => {
                        setUser({
                          id: item.id,
                          username: item.username,
                          batch: item.batch,
                          week: item.current_week
                        })
                        setToggle(true)
                      }} className='flex cursor-pointer items-center justify-around p-1.5 rounded-xl mb-3 mx-[40px] bg-[#141621]'>
                        <div className='h-8 w-8 rounded-full bg-white'></div>
                        <p>{item.username}</p>
                        <p> {item.review_in}d</p>
                      </div>
                    )
                  })
                }
              </> : null
          }
          <br />
        </div>
        {
          toggle && user ?
            <>
              <div className='bg-[#111217] min-w-[400px] max-h-[300px] grid grid-flow-row mt-10 mx-10 rounded-lg'>
                <div className='flex my-[30px] mx-[30px]'>
                  <div className='rounded-full h-20 w-20 bg-white'></div>
                  <span className=''>
                    <img onClick={(e) => setToggle(false)} className='h-6 relative cursor-pointer left-[370px]' src={remove} alt="" />
                    <p className='text-xl mt-1 ms-8'>{(user.username)}</p>
                    <div className='flex items-center mx-[30px] justify-between'>
                      <p className='text-[#5C5F6C]'>BCK112</p>
                      <p className='ms-[50px] text-[#5C5F6C]'>Week {user.week}</p>
                    </div>
                  </span>
                </div>
                <select onChange={async (e) => {
                  await dispatch(ReviewerTimeAssigned(e.target.value))
                  console.log('Reviewer id: ', e.target.value)
                }} className='h-[30px] mx-[30px] w-[300px] bg-[#303443] lg:mb-0 xs:mb-3 text-white rounded-md outline-none '>
                  <option selected>Select the Reviewer</option>
                  {
                    rev ?
                      <>
                        {
                          rev.map((item) => {
                            return (
                              <option key={item.id} value={item.id}>{item.username}</option>
                            )
                          })
                        }
                      </>
                      : null
                  }
                </select>
                <select onChange={(e) => {
                  console.log('Slot id: ', e.target.value)
                  setSlotId(e.target.value)
                }} className='h-[30px] mx-[30px] w-[300px] bg-[#303443] lg:my-3 mb-3 text-white rounded-md outline-none '>
                  <option selected>Select the Time</option>
                  {
                    times ?
                      <>
                        {
                          times.map((item) => {
                            return (
                              <option key={item.id} value={item.id}>{item.day} - {item.start_time} - {item.end_time}</option>
                            )
                          })
                        }
                      </>
                      : null
                  }
                </select>
                <div className='flex  items-start ms-5 mb-4'>
                  <button onClick={(e) => dispatchBook()} className='bg-blue-600 hover:bg-blue-500 rounded-lg mx-3 px-8 py-2 w-[120px]'>
                    Assign
                  </button>
                </div>
              </div>
            </>
            :
            null
        }

      </div>
      <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 '>
        <div className='bg-[#111217] max-h-[330px] overflow-y-auto min-w-[400px] grid grid-flow-row mt-10 mx-10 rounded-lg'>
          <div className='flex items-center  sticky top-0 z-50 justify-center p-1 mx-[90px] my-[20px] rounded-lg bg-[#141621] '>
            <p className='text-xl'>REVIEWS SCHEDULED</p>
          </div>
          <div className='grid'>
            {item ? (
              <>
                {item.map((val, index) => {
                  let data = null;

                  // Using forEach to iterate through the timeslots and find the matching one
                  item2.forEach((test) => {
                    if (test.id === val.slot) {
                      data = test;
                    }
                  });

                  return (
                    <div key={data?.id} className='mx-[30px] relative flex justify-around  items-center py-3 opacity-60 mb-5 bg-[#303443] rounded-lg'>
                      <span className='mx-3'>
                        {index + 1}.
                      </span>
                      <span className='me-3'>
                        <div className='grid'>
                          <span>{data?.day}</span>
                          <span className='text-xs'><p>{data?.date}</p></span>
                        </div>
                      </span>
                      <span className='me-3'>
                        <div className='grid'>
                          <span>{val.intern_username}</span>
                          <span className='text-xs'>Intern BCK{val.intern_batch.batch_number}</span>
                        </div>
                      </span>
                     
                      <span className='me-4 xs:hidden lg:block'>
                        {data?.start_time} - {data?.end_time}
                      </span>
                    </div>
                  );
                })}
              </>
            ) : null}


          </div>
        </div>
      </div>
    </>
  )
}

export default SceduleTime
