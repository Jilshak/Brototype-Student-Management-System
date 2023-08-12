import React from 'react'
import { Link } from 'react-router-dom'
import leftarrow from '../icons/leftarrow.png'

function BatchPage() {
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
                        <h1 className='text-lg font-semibold'>Batches</h1>
                    </span>
                </div>
                <div className='flex justify-center items-center '>
                    <span className='bg-[#303443] w-[70px] lg:ms-[70px] md:ms-[40px] sm:ms-[20px] rounded-3xl h-10 flex  justify-center items-center '>
                        <h1 className='text-md font-semibold'>ADD+</h1>
                    </span>
                </div>
            </div>
            <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 mt-10 lg:ms-[100px] md:ms-[40px] sm:ms-[20px]'>
                <Link to='/batch_number'>
                    <div className='flex justify-center items-center bg-[#303443] h-20 lg:mx-5 md:mx-4 sm:mx-3 xs:mx-10 rounded-xl'>
                        <h1>BATCH 112</h1>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default BatchPage
