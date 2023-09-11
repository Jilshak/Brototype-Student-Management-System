import React, { useEffect } from 'react'
import upload from '../../icons/upload.png'
import pdf from '../../icons/pdf.png'
import jwtDecode from 'jwt-decode';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { get_miscellenous_tasks, miscellenous_tasks, removeMiscellenousTasks } from '../../features/WeekDetails';

function MiscellenousWorkouts() {
    let access = localStorage.getItem("authToken")
    let decode = jwtDecode(access)

    const dispatch = useDispatch()

    const task = useSelector((state) => state.WeekDetails)

    const { id } = useParams()

    useEffect(() => {
        let credentials = {
            week_id: id,
            userid: decode?.user_id
        }
        dispatch(get_miscellenous_tasks(credentials))
    }, [])

    const uploadFiles = async (e) => {
        console.log("This is the file: ", e)
        const data = new FormData()
        data.append('miscellenous_tasks', e)

        let credentials = {
            week_id: id,
            userid: decode.user_id,
            miscellenous_tasks: data
        }
        await Promise.resolve(dispatch(miscellenous_tasks(credentials)))

        let credentials1 = {
            week_id: id,
            userid: decode.user_id
        }
        await Promise.resolve(dispatch(get_miscellenous_tasks(credentials1)))
    }


    const removeFiles = async () => {

        let credentials = {
            week_id: id,
            userid: decode.user_id,
            miscellenous_tasks: null
        }
        await Promise.resolve(dispatch(removeMiscellenousTasks(credentials)))

        let credentials1 = {
            week_id: id,
            userid: decode.user_id
        }
        await Promise.resolve(dispatch(get_miscellenous_tasks(credentials1)))
    }

    return (
        <div className='h-screen'>
            {
                task.isLoading ?
                    <>
                        <div className='relative flex items-center top-80 justify-center'>
                            <div class="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
                        </div>
                    </>
                    : task && task.data && !decode.is_superuser && !decode.is_advisor && !decode.is_reviewer && decode.is_user ?

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
                    !task.data && !decode.is_superuser && !decode.is_advisor && !decode.is_reviewer && decode.is_user ?
                        <>
                            <button type="button" className="flex text-sm bg-gray-800 rounded-full">
                                <label htmlFor="this_week_task">
                                    <span className='bg-[#191C24] cursor-pointer py-5 flex items-center justify-center px-10 rounded-full text-lg opacity-80'>
                                        <img className='h-[25px] me-5' src={upload} alt="" />
                                        <p>Upload Miscellenous Workouts here</p>
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

export default MiscellenousWorkouts
