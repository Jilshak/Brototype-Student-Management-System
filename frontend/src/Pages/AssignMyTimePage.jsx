import React from 'react';
import remove from '../icons/remove.png'

function AssignMyTimePage() {
  return (
    <>
      <div className='grid lg:min-h-[150px] md:min-h-[200px] sm:min-h-[220px] xs:min-h-[260px] grid-cols-1 bg-[#16171D] opacity-70 mx-10 mt-10 rounded-lg'>
        <span className='flex justify-start items-center'>
          <p className='text-xl ms-10 lg:mt-3'>Assign My Time</p>
        </span>
        <div className='lg:flex gap-5 items-center h-[100px] mx-[35px]'>
          <select className='p-2 w-[200px] bg-[#303443] lg:my-3 mb-3 text-white rounded-md outline-none '>
            <option value='option1' selected>Monday</option>
            <option value='option2'>Tuesday</option>
            <option value='option3'>Wednesday</option>
            <option value='option3'>Thursday</option>
            <option value='option3'>Friday</option>
            <option value='option3'>Saturday</option>
          </select>
          <input className='p-2 w-[200px] bg-[#303443] text-white rounded-md outline-none' type='date' placeholder='DD/MM/YY' />
          <input className='p-2 my-3 w-[100px] bg-[#303443] text-white rounded-md outline-none' type='time' placeholder='Time' />
          <p>to</p>
          <input className='p-2 my-3 w-[100px] bg-[#303443] text-white rounded-md outline-none' type='time' placeholder='Time' />
          <button className='p-2 mx-3 w-[70px] bg-[#303443] text-white rounded-md outline-none'>
            ADD
          </button>
        </div>
      </div>
      <div className='grid lg:grid-cols-2 md:grid-cols-1'>
        <div className='bg-[#16171D] opacity-70  mx-10 mt-10 rounded-lg'>
          <div className='flex justify-center items-center my-5'>
            <p className='text-xl text-[#7981A0]'>Time Scheduled</p>
          </div>
          <div className='grid'>
            <div className='mx-[30px] flex items-center py-3 opacity-60 mb-5 bg-[#303443] rounded-lg'>
              <span className='mx-3'>
                1.
              </span>
              <span className='me-3'>
                Thursday
              </span>
              <span className='me-3'>
                15/08/2000
              </span>
              <span className='me-3'>
                9:00 AM
              </span>
              
            </div>
            <div className='mx-[30px] flex items-center py-3 opacity-60 mb-5 bg-[#303443] rounded-lg'>
              <span className='mx-3'>
                1.
              </span>
              <span className='me-3'>
                Thursday
              </span>
              <span className='me-3'>
                15/08/2000
              </span>
              <span className='me-3'>
                9:00 AM
              </span>
            </div>
          </div>
        </div>
        <div className='bg-[#16171D] opacity-70  mx-10 mt-10 rounded-lg'>
          <div className='flex justify-center items-center my-5'>
            <p className='text-xl text-[#7981A0]'>Notifications</p>
          </div>
          <div className='grid'>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default AssignMyTimePage;
