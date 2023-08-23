import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { AddTime, GetAssignedTime, deleteTime } from '../features/AssignTimeSlice';
import { TimeBooked } from '../features/BookingSlice'
import jwtDecode from 'jwt-decode';
import remove from '../icons/remove.png'
import { unSchedule } from '../features/ScheduleTimeSlice';

function AssignMyTimePage() {

  let access = localStorage.getItem("authToken")
  let decode = jwtDecode(access)

  let dispatch = useDispatch()
  const times = useSelector((state) => (state.Booking))
  const booked = useSelector((state) => (state.Booked))
  const [minDate, setMinDate] = useState(getCurrentDate());

  const [time, setTime] = useState()


  // Function to get the current date in the format YYYY-MM-DD


  useEffect(() => {
    dispatch(GetAssignedTime(decode.user_id))
    dispatch(TimeBooked(decode.user_id))
  }, [dispatch])

  useEffect(() => {
    if (times?.data.length > 0) {
      setTime(times.data)
    } else {
      setTime()
    }
  }, [times.data])

  const [day, setDay] = useState('')
  const [date, setDate] = useState()
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  //states for booked schedule
  const [item, setItem] = useState()
  const [item2, setItem2] = useState()

  const addTime = async () => {

    let credentials = {
      day: day,
      date: date,
      start_time: start,
      end_time: end,
      user: decode.user_id
    }

    let local = [
      {
        day: day,
        date: date,
        start_time: start + ':00',
        end_time: end + ':00',
      }
    ]

    if (day && date && start && end) {
      if (time) {
        await setTime(prevTime => [...prevTime, ...local])
      } else {
        setTime(local)
      }
    } else {
      console.log("Complete the whole fields")
    }
    dispatch(AddTime(credentials))
  }

  const handleDelete = async (id) => {
    if (time.length > 0) {
      await setTime(prevList => prevList.filter(item => item.id !== id))
      await dispatch(deleteTime(id))
    }   
  }

  const handleDeleteScheduled = async (id, intern) => {
    if (item2.length > 0){
      console.log(item2)
      await setItem2(prevList => prevList.filter(item => item.slot !== id))
      await dispatch(unSchedule(intern))
      await dispatch(deleteTime(id))
    } 
  }

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (booked.booked) {
      setItem(booked.booked.slots)
      setItem2(booked.booked.desired)
    }
  }, [booked.booked])




  return (
    <>
      <div className='grid lg:min-h-[150px] md:min-h-[200px] sm:min-h-[220px] xs:min-h-[260px] grid-cols-1 bg-[#16171D] opacity-70 mx-10 mt-10 rounded-lg'>
        <span className='flex justify-start items-center'>
          <p className='text-xl ms-10 lg:mt-3'>Assign My Time</p>
        </span>
        <div className='lg:flex gap-5 items-center lg:h-[100px] md:h-[130px] sm:h-[150px] xs:h-[250px] mx-[35px]'>
          <select onChange={(e) => setDay(e.target.value)} className='p-2 w-[200px] bg-[#303443] lg:my-3 mb-3 text-white rounded-md outline-none '>
            <option selected>Select a day</option>
            <option value='Monday'>Monday</option>
            <option value='Tuesday'>Tuesday</option>
            <option value='Wednesday'>Wednesday</option>
            <option value='Thursday'>Thursday</option>
            <option value='Friday'>Friday</option>
            <option value='Saturday'>Saturday</option>
            <option value='Sunday'>Sunday</option>
          </select>
          <input min={minDate} onChange={(e) => {
            setDate(e.target.value)
          }} className='p-2 w-[200px] bg-[#303443] text-white rounded-md outline-none' type='date' placeholder='DD/MM/YY' />
          <input onChange={(e) => setStart(e.target.value)} className='p-2 my-3 w-[100px] bg-[#303443] text-white rounded-md outline-none' type='time' placeholder='Time' />
          <p>to</p>
          <input onChange={(e) => setEnd(e.target.value)} className='p-2 my-3 w-[100px] bg-[#303443] text-white rounded-md outline-none' type='time' placeholder='Time' />
          <button onClick={(e) => addTime()} className='p-2 mx-3 w-[70px] bg-[#303443] text-white rounded-md outline-none'>
            ADD
          </button>
        </div>
      </div>
      <div className='grid lg:grid-cols-2 md:grid-cols-1'>
        <div className='bg-[#16171D] opacity-70  mx-10 mt-10 max-h-[500px] overflow-y-auto rounded-lg '>
          <div className='flex justify-center items-center my-5'>
            <p className='text-xl text-[#7981A0]'>Time Scheduleded</p>
          </div>
          <div className='grid'>
            {
              time ?
                <>
                  {
                    time.map((item, index) => {
                      return (
                        <div key={item.id} className='mx-[30px] relative flex items-center py-3 opacity-60 mb-5 bg-[#303443] rounded-lg'>
                          <span className='mx-3'>
                            {index + 1}.
                          </span>
                          <span className='me-3'>
                            {item.day}
                          </span>
                          <span className='me-3'>
                            {item.date}
                          </span>
                          <span className='me-3 xs:hidden lg:block'>
                            {item.start_time} -
                          </span>
                          <span className='me-3 xs:hidden lg:block'>
                            {item.end_time}
                          </span>
                          <div className='absolute'>
                            <span className='relative lg:left-[450px] md:left-[550px] sm:left-[250px] xs:left-[250px]'>
                              <img onClick={(e) => handleDelete(item.id)} className='h-6 cursor-pointer' src={remove} alt="" />
                            </span>
                          </div>

                        </div>
                      )
                    })
                  }
                </>

                : null
            }
          </div>
        </div>
        <div className='bg-[#16171D] opacity-70  mx-10 mt-10 rounded-lg'>
          <div className='flex justify-center items-center my-5'>
            <p className='text-xl text-[#7981A0]'>Fixed Schedule</p>
          </div>
          <div className='grid'>
            {item2 ? (
              <>
                {item2.map((val, index) => {
                  let data = null;

                  // Using forEach to iterate through the timeslots and find the matching one
                  item.forEach((test) => {
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
                      <span className='me-3'>
                        <div className='grid'>
                          <span>{val.advisor_username}</span>
                          <span className='text-xs'>Advisor</span>
                        </div>
                      </span>
                      <span className='me-4 xs:hidden lg:block'>
                        {data?.start_time} - {data?.end_time}
                      </span>

                      <div onClick={(e) => {
                        console.log(val.intern)
                        handleDeleteScheduled(val.slot, val.intern)
                      }} className='cursor-pointer'>
                        <img className='h-6 cursor-pointer' src={remove} alt="" />
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

export default AssignMyTimePage;
