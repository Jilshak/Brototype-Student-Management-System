import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function DashboardPage() {

  useEffect(()=>{

  },[])

  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 relative xs:right-[40px] lg:right-0 xs:top-16 lg:top-0 sm:grid-cols-1 lg:gap-7 md:gap-5 sm:gap-3 mt-5  mx-5 h-[60px]'>
      <Link to='/batch'>
        <div className='items-center p-6 cursor-pointer opacity-70 flex text-lg mb-2 bg-[#6C7293] rounded-md  justify-center'>
          <h1>Interns</h1>
        </div>
      </Link>
      <Link to='/advisors'>
        <div className='items-center p-6 cursor-pointer opacity-70 flex text-lg mb-2 bg-[#6C7293] rounded-md  justify-center'>
          <h1>Advisors</h1>
        </div>
      </Link>
      <Link to='/reviewers'>
        <div className='items-center p-6 cursor-pointer opacity-70 flex text-lg mb-2 bg-[#6C7293] rounded-md  justify-center'>
          <h1>Reviewers</h1>
        </div>
      </Link>
    </div>
  )
}

export default DashboardPage
