import React from 'react'
import folder from '../icons/folder.png'
import edit1 from '../icons/edit1.png'

function WeekDetailPage() {
    return (
        <>
            <div className='grid items-start justify-start ms-12'>
                <span className='px-24 text-2xl py-4 rounded-3xl bg-[#15171E]  my-6'>
                    Week 1
                </span>
            </div>
            <div className='grid  lg:grid-cols-6 ms:grid-cols-3 sm:grid-cols-1 xs:grid-cols-1 items-center justify-start bg-[#15171E] min-h-[170px] w-auto me-[100px] ms-[48px]'>
                <div className='grid items-start justify-center'>
                    <img className='h-[60px] ms-7' src={folder} alt="" />
                    <p>Personal Workout</p>
                </div>
                <div className='grid items-start justify-center'>
                    <img className='h-[60px] ms-7' src={folder} alt="" />
                    <p>Technical Workout</p>
                </div>
                <div className='grid items-start justify-center'>
                    <img className='h-[60px] ms-9' src={folder} alt="" />
                    <p>Miscellenous Workout</p>
                </div>
            </div>
            <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 my-5 ms-12'>
                <div className='bg-[#15171E] grid justify-center min-h-[300px] lg:me-[40px] xs:me-[100px] overflow-y-auto'>
                    <div className='flex'>
                        <span className='bg-[#6C7293] flex items-center h-11 my-5 text-xl rounded-2xl px-6 opacity-70'>
                            Pending topics
                        </span>
                        <img className='h-5 my-8 relative  lg:left-36 md:left-30 sm:left-20 xs:left-10' src={edit1} alt="" />
                    </div>
                </div>
                <div className='bg-[#15171E] min-h-[300px] me-[100px] lg:mt-0 xs:mt-5 '>
                    <div className='flex justify-center'>
                        <span className='bg-[#6C7293] flex items-center h-11 my-5 text-xl rounded-2xl px-6 opacity-70'>
                            Review Details
                        </span>
                        <img className='h-5 my-8 relative  lg:left-32 md:left-24 sm:left-24 xs:left-10' src={edit1} alt="" />
                    </div>
                    <div className='mx-[30px] py-2 bg-[#1C1E26] mb-3 opacity-70 rounded-lg'>
                        <span className='mx-5'>Marks Obtained : </span>
                    </div>
                    <div className='mx-[30px] py-2 mb-3 bg-[#1C1E26] opacity-70 rounded-lg'>
                        <span className='mx-5'>Advisor : </span>
                    </div>
                    <div className='mx-[30px] py-2 mb-3 bg-[#1C1E26] opacity-70 rounded-lg'>
                        <span className='mx-5'>Reviewer : </span>
                    </div>
                    <div className='mx-[30px] py-2 mb-3 bg-[#1C1E26] opacity-70 rounded-lg'>
                        <span className='mx-5'>Conducted On : </span>
                    </div>
                </div>
            </div>
            <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 my-5 ms-12'>
                <div className='bg-[#15171E] min-h-[300px] lg:me-[40px] xs:me-[100px] overflow-y-auto'>
                    <div className='flex justify-center'>
                        <span className='bg-[#6C7293] flex items-center h-11 my-5 text-xl rounded-2xl px-6 opacity-70'>
                            Personal Tasks
                        </span>
                        <img className='h-5 my-8 relative  lg:left-36 md:left-30 sm:left-20 xs:left-10' src={edit1} alt="" />
                    </div>
                    <div className='mx-[30px] py-2 bg-[#1C1E26] mb-3 opacity-70 rounded-lg'>
                        <span className='mx-5'>Audio Task : </span>
                    </div>
                    <div className='mx-[30px] py-2 bg-[#1C1E26] mb-3 opacity-70 rounded-lg'>
                        <span className='mx-5'>Descriptions : </span>
                    </div>
                    <div className='mx-[30px] py-2 bg-[#1C1E26] mb-3 opacity-70 rounded-lg'>
                        <span className='mx-5'>Typing : </span>
                    </div>
                    <div className='mx-[30px] py-2 bg-[#1C1E26] mb-3 opacity-70 rounded-lg'>
                        <span className='mx-5'>Additional Task : </span>
                    </div>
                </div>
                <div className='bg-[#15171E] min-h-[300px] me-[100px] lg:mt-0 xs:mt-5 '>
                    <div className='flex justify-center'>
                        <span className='bg-[#6C7293] flex items-center h-11 my-5 text-xl rounded-2xl px-6 opacity-70'>
                            Miscellenous Tasks
                        </span>
                        <img className='h-5 my-8 relative  lg:left-24 md:left-24 sm:left-24 xs:left-4' src={edit1} alt="" />
                    </div>
                    <div className='mx-[30px] py-2 bg-[#1C1E26] mb-3 opacity-70 rounded-lg'>
                        <span className='mx-5 flex'>Seminar Presentation : <p className='text-green-500 mx-4'>Added</p> </span>
                    </div>
                    <div className='mx-[30px] py-2 bg-[#1C1E26] mb-3 opacity-70 rounded-lg'>
                    <span className='mx-5 flex'>FeedBack Session : <p className='text-green-500 mx-4'>Added</p> </span>
                    </div>
                    <div className='mx-[30px] py-2 bg-[#1C1E26] mb-3 opacity-70 rounded-lg'>
                    <span className='mx-5 flex'>Progress Video : <p className='text-green-500 mx-4'>Added</p> </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WeekDetailPage
