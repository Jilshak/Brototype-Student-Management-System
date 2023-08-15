import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import adminleftarrow from '../icons/adminleftarrow.png'

let token = localStorage.getItem("authToken")
let decode = jwtDecode(token)

function WeeksPage() {

  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <>
      {
        decode.is_superuser ?
          <span className='h-[150px bg-[#22242F] absolute flex max-w-[50px] mx-[20px] top-[330px] py-10 px-2'>
            <button onClick={(e) => goBack()} className=''>
              <img className='h-[40px] opacity-70' src={adminleftarrow} alt="" />
            </button>
          </span> : null
      }
      <div className='mx-[100px] bg-[#303443] opacity-70 my-[20px] rounded-2xl'>
        <div className='grid lg:mx-[50px] lg:grid-cols-6 md:grid-cols-3 gap-1.5 sm:grid-cols-3 xs:grid-cols-2'>
          <Link to='/week_detail'>
            <div className='flex lg:lg:w-[110px] xs:w-[70px]items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
              <h1>Week 1</h1>
            </div>
          </Link>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 2</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 3</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 4</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 5</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 6</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 7</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 8</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 9</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 10</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 11</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 12</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 13</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 14</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 15</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 16</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 17</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 18</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 19</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 20</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 21</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 22</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 23</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 24</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 25</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 26</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 27</h1>
          </div>
          <div className='flex lg:w-[110px] xs:w-[70px] items-center justify-center py-4 my-4 mx-6 rounded-xl bg-green-500 text-white'>
            <h1>Week 28</h1>
          </div>

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
  )
}

export default WeeksPage
