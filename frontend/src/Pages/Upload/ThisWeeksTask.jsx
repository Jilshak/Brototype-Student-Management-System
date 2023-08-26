import React from 'react'
import upload from '../../icons/upload.png'
import jwtDecode from 'jwt-decode';

function ThisWeeksTask() {

    let access = localStorage.getItem("authToken")
    let decode = jwtDecode(access)

    return (
        <div className='h-screen'>
            <div className='flex items-center h-[100vh] justify-center'>
                {
                    decode.is_superuser || decode.is_advisor ?
                        <>
                            <button type="button" className="flex text-sm bg-gray-800 rounded-full">
                                <label htmlFor="this_week_task">
                                    <span className='bg-[#191C24] cursor-pointer py-5 flex items-center justify-center px-10 rounded-full text-lg opacity-80'>
                                        <img className='h-[25px] me-5' src={upload} alt="" />
                                        <p>Upload this week's task here</p>
                                    </span>
                                    <input type="file" name='this_week_task' accept='application/msword,application/pdf' id='this_week_task' onChange={(e) => console.log("This is working")} className='hidden' />
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
