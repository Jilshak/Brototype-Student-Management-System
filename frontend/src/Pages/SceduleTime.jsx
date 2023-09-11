import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode';
import { InternsWithReview, ReviewerTimeAssigned, Scheduled, ScheduledTimeforAdvisor, removeBooking, reviewersList, unSchedule } from '../features/ScheduleTimeSlice'
import remove from '../icons/remove.png'
import authenticated from '../icons/authenticated.png'
import { book } from '../features/BookingSlice';
import { Link } from 'react-router-dom'

function SceduleTime() {

  //advisor id
  let access = localStorage.getItem("authToken")
  let decode = jwtDecode(access)

  //state for week
  const [week_numnber, setWeek_number] = useState(1)

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
    dispatch(InternsWithReview(week_numnber))
    dispatch(ScheduledTimeforAdvisor(decode.user_id))
  }, [dispatch])

  useEffect(() => {
    if (reviewers?.data) {
      setRev(reviewers.data)
    }
    if (reviewers?.Interns) {
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


  const unsheduleReview = async (booking_id, intern_id, slot_id) => {
    if (item2?.length > 0) {
      await setItem(prevList => prevList.filter(item => item.id !== booking_id))
      await dispatch(unSchedule(intern_id))
      let data = {
        booking_id: booking_id,
        slot_id: slot_id
      }
      dispatch(removeBooking(data))
    }
  }

  useEffect(() => {
    if (time?.review) {
      setItem(time.review.data)
      setItem2(time.review.desired)
    }
  }, [time.review])

  return (
    <>
      <div className='grid lg:grid-cols-2 md:grid-cols-2 relative xs:right-[50px] xs:top-10  lg:top-0 lg:right-0 sm:grid-cols-1 xs:grid-cols-1'>
        <div className='bg-[#111217] max-h-[400px] overflow-y-auto min-w-[400px] grid grid-flow-row mt-10 mx-10 rounded-lg'>
          <div className='flex items-center justify-center p-1 mx-[90px] my-[20px] rounded-lg bg-[#141621] '>
            <p className='text-xl'>INTERNS WITH REVIEW</p>
          </div>
          <div className='flex justify-center mb-4'>
            <select onChange={(e) => {
              dispatch(InternsWithReview(e.target.value))
              setWeek_number(e.target.value)
            }} className='h-[30px] mx-[30px] w-[300px] bg-[#303443] lg:my-5 text-white rounded-md outline-none' name="" id="">
              {Array.from({ length: 28 }, (_, index) => (
                <option key={index} value={index + 1}>
                  Week {index + 1}</option>
              ))}
            </select>
          </div>
          {
            intern && intern.length >= 1 ?
              <>
                {
                  intern ?
                    <>
                      {

                        intern?.map((item) => {

                          const scheduledDate = new Date(item?.weeks[0]?.weekdetails_set[0]?.scheduled_date);
                          const currentDate = new Date();
                          const timeDifference = scheduledDate - currentDate;
                          const timeDifferenceInDays = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

                          return (
                            <div key={item.id} onClick={(e) => {
                              setUser({
                                id: item.id,
                                username: item.username,
                                batch: item.batch,
                                week: item.current_week
                              });
                              setToggle(true);
                            }} className='flex cursor-pointer items-center justify-around p-1.5 rounded-xl mb-3 mx-[40px] bg-[#141621]'>
                              <div className='h-8 w-8 rounded-full bg-white'></div>
                              <p>{item.username}</p>
                              <p>{item.domain ? item.domain : "Unfixed"}</p>
                              <p>{timeDifferenceInDays}d</p>
                            </div>
                          );
                        })

                      }
                    </> : null
                }
              </>
              :
              <div className='relative flex items-center top-[-10px] justify-center'>
                <div class="rounded-md h-6 w-6 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
              </div>
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
                          rev?.map((item) => {
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
                          times?.map((item) => {
                            return (
                              <option key={item.id} value={item.id}>{item.date} - {item.day} - {item.start_time} - {item.end_time}</option>
                            )
                          })
                        }
                      </>
                      : null
                  }
                </select>
                <div className='flex  items-start ms-5 mb-4'>
                  <button onClick={async (e) => {
                    await dispatchBook()
                    await dispatch(Scheduled(user.id))
                    console.log("This is the user id: ", user.id)
                    if (intern) {
                      console.log("Its entering this block")
                      setIntern(prevList => prevList.filter(item => item.id !== user.id))
                      console.log("After the filtering mechanism: ", intern)
                      await Promise.resolve(dispatch(ScheduledTimeforAdvisor(decode.user_id)))
                    }
                  }} className='bg-blue-600 hover:bg-blue-500 rounded-lg mx-3 px-8 py-2 w-[120px]'>
                    Assign
                  </button>
                </div>
              </div>
            </>
            :
            null
        }

      </div>
      <div className='grid lg:grid-cols-2 relative xs:right-[50px] lg:top-0 lg:right-0 xs:top-10 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 '>
        <div className='bg-[#111217] max-h-[330px] overflow-y-auto min-w-[400px] grid grid-flow-row mt-10 mx-10 rounded-lg'>
          <div className='flex items-center  sticky top-0 justify-center p-1 mx-[90px] my-[20px] rounded-lg bg-[#141621] '>
            <p className='text-xl'>REVIEWS SCHEDULED</p>
          </div>
          <div className='grid'>
            {item ? (
              <>
                {item.map((val, index) => {
                  console.log("This is the item: ", val)
                  let data = null;

                  // Using forEach to iterate through the timeslots and find the matching one
                  item2.forEach((test) => {
                    if (test.id === val.slot) {
                      data = test;
                    }
                  });

                  const currentDate = new Date();
                  const scheduledDate = new Date(data?.date);

                  // Get the difference in milliseconds between the two dates
                  const differenceInMilliseconds = scheduledDate.getTime() - currentDate.getTime();

                  // Convert the difference in milliseconds to minutes
                  const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

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
                          <span className='text-xs'>Intern BCK{val.intern_batch?.batch_number}</span>
                        </div>
                      </span>

                      <span className='me-4 xs:hidden lg:block'>
                        {data?.start_time} - {data?.end_time}
                      </span>

                      <div onClick={async (e) => {
                        console.log("This is the val: ", val)
                        console.log(val.slot)
                        await unsheduleReview(val.id, val.intern, val.slot)
                        await dispatch(InternsWithReview(week_numnber))
                        // console.log("This is the scheduled date: ", scheduledDate)
                        // console.log("This is the scheduled date and the current date difference in minutes: ", differenceInMinutes)
                      }} className='cursor-pointer'>
                        <img className='h-6 cursor-pointer' src={remove} alt="" />
                      </div>
                      <div>
                        {
                          // currentDate == scheduledDate && differenceInMinutes <= -15 ?
                          <>
                            <Link to={`/weeks/${val.intern}`}>
                              <img className='h-6 cursor-pointer' src={authenticated} alt="" />
                            </Link>
                          </>
                          // : null
                        }
                      </div>
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
