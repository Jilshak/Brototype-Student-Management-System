import React from 'react'
import { Link } from 'react-router-dom'
import leftarrow from '../icons/leftarrow.png'
import search from '../icons/search.png'
import remove from '../icons/remove.png'
import edit1 from '../icons/edit1.png'

function ReviewersPage() {
    return (
        <>
            <div className='grid grid-cols-3'>
                <Link to='/dashboard'>
                    <button className='lg:w-12 md:w-10 sm:w-10 xs:w-10 lg:h-12 md:h-10 sm:h-10 xs:h-10 lg:ms-[100px] md:ms-[60px] sm:ms-[30px] opacity-70 bg-[#303443] my-7 rounded-full'>
                        <span className='flex justify-center'>
                            <img className='lg:h-[35px] md:h-[25px] sm:h-[20px] xs:h-[20px] ' src={leftarrow} alt="" />
                        </span>
                    </button>
                </Link>
                <div className='flex justify-center items-center'>
                    <span className='bg-[#303443] w-[130px] rounded-3xl h-12 me-10 flex  justify-center items-center '>
                        <h1 className='text-lg font-semibold'>Reviewers</h1>
                    </span>
                </div>
                <div className='flex justify-center items-center '>
                    <span className='bg-[#303443] w-[40px] lg:ms-[70px] me-3 h-10 justify-center items-center flex rounded-full'>
                        0
                    </span>
                    <span className='bg-[#303443] w-[70px] lg:ms-[70px] md:ms-[40px] sm:ms-[20px] rounded-3xl h-10 flex  justify-center items-center '>
                        <h1 className='text-md font-semibold'>ADD+</h1>
                    </span>

                </div>
            </div>
            <div className='flex items-center justify-center my-5'>
                <input className='bg-[#131620] absolute me-10 outline-none lg:min-w-[700px] md:min-w-[500px] sm:min-w-[350px] xs:min-w-[350px]  py-2 rounded-xl pl-5' type="text" placeholder='Search....' />
                <img className='h-[23px] opacity-60 relative lg:left-[300px] md:left-[200px] sm:left-[130px] xs:left-[130px] cursor-pointer' src={search} alt="" />
            </div>

            <div className='grid items-center justify-center mt-10'>
                <div className='flex bg-[#23283B]  my-5 p-2 rounded-3xl opacity-80 lg:min-w-[900px] md:min-w-[500px] sm:min-w-[350px] xs:min-w-[350px]'>
                    <span className='rounded-full flex items-center justify-center min-w-[33px] h-8 bg-[#2E313D] '>
                        1
                    </span>
                    <span className='rounded-lg flex items-center justify-start mx-5 min-w-[150px] h-8 bg-[#2E313D] '>
                        <p className='ms-5'>Reviewer name</p>
                    </span>
                    <span className='rounded-lg xs:hidden sm:block flex items-center justify-start mx-5 w-[150px] h-8 bg-[#2E313D] '>
                        <p className='ms-5 mt-1'>Mobile</p>
                    </span>
                    <span className='flex items-center justify-end w-[500px]'>
                        <img className='h-[14px] mx-3' src={edit1} alt="" />
                        <img className='h-[30px] ' src={remove} alt="" />
                    </span>
                </div>
            </div>
        </>
    )
}

export default ReviewersPage
