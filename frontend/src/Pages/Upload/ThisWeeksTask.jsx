import React, { useEffect } from 'react'
import upload from '../../icons/upload.png'
import pdf from '../../icons/pdf.png'
import jwtDecode from 'jwt-decode';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { This_weeks_task, get_week_task, removeThisWeekTask } from '../../features/WeekDetails';

function ThisWeeksTask() {

    let access = localStorage.getItem("authToken")
    let decode = jwtDecode(access)

    const dispatch = useDispatch()

    const task = useSelector((state) => state.WeekDetails)

    const { id, userid } = useParams()

    useEffect(() => {
        let credentials = {
            week_id: id,
            userid: userid
        }
        dispatch(get_week_task(credentials))
    }, [])

    const uploadFiles = async (e) => {
        console.log("This is the file: ", e)
        const data = new FormData()
        data.append('this_weeks_tasks', e)

        let credentials = {
            week_id: id,
            userid: userid,
            this_weeks_tasks: data
        }
        await Promise.resolve(dispatch(This_weeks_task(credentials)))

        let credentials1 = {
            week_id: id,
            userid: userid
        }
        await Promise.resolve(dispatch(get_week_task(credentials1)))
    }


    const removeFiles = async () => {

        let credentials = {
            week_id: id,
            userid: userid,
            this_weeks_tasks: null
        }
        await Promise.resolve(dispatch(removeThisWeekTask(credentials)))

        let credentials1 = {
            week_id: id,
            userid: userid
        }
        await Promise.resolve(dispatch(get_week_task(credentials1)))
    }

    return (
        <div className='h-screen'>
            {
                task.isLoading ?
                    <>
                        {null}
                    </>
                    : task && task.data && decode.is_superuser || task && task.data && decode.is_advisor ?

                        <>
                            <div className='flex justify-end items-center absolute right-0'>
                                <span onClick={(e) => removeFiles()} className='bg-gray-600 opacity-75 cursor-pointer flex items-center rounded-full justify-center py-2 mt-5 me-5 lg:w-20 md:w-16 sm:w-12 xs:w-12'>
                                    Delete
                                </span>
                                <button type="button" className="bg-gray-600 opacity-75 cursor-pointer flex items-center rounded-full justify-center py-2 mt-5 me-5 w-16">
                                    <label htmlFor="this_week_task">
                                        <span className='cursor-pointer'>
                                            <p>Edit</p>
                                            <input type="file" name='this_week_task' accept='application/msword,application/pdf' id='this_week_task' onChange={(e) => uploadFiles(e.target.files[0])} className='hidden' />
                                        </span>
                                    </label>
                                </button>
                            </div>
                        </> : null
            }
            <div>
                <span>
                    {
                        task.isLoading ?
                            <>
                                {null}
                            </> : (
                                task && task.data ?
                                    <>
                                        <span className='grid absolute items-center justify-center mx-10 my-16'>
                                            <a href={task.data} target='_blank' rel='noopener noreferrer'>
                                                <img className='h-20' src={pdf} alt="" />
                                                <p className='ms-5'>Tasks</p>
                                            </a>
                                        </span>
                                    </> : null
                            )
                    }
                </span>
            </div>
            <div className='flex items-center h-[100vh] justify-center'>
                {
                    !task.data && decode.is_superuser || !task.data && decode.is_advisor ?
                        <>
                            <button type="button" className="flex text-sm bg-gray-800 rounded-full">
                                <label htmlFor="this_week_task">
                                    <span className='bg-[#191C24] cursor-pointer py-5 flex items-center justify-center px-10 rounded-full text-lg opacity-80'>
                                        <img className='h-[25px] me-5' src={upload} alt="" />
                                        <p>Upload this week's task here</p>
                                    </span>
                                    <input type="file" name='this_week_task' accept='application/msword,application/pdf' id='this_week_task' onChange={(e) => uploadFiles(e.target.files[0])} className='hidden' />
                                </label>
                            </button>
                        </>
                        : null
                }
            </div>
        </div>
    );
}

export default ThisWeeksTask;
