import React, { useEffect, useState } from 'react'
import header from '../images/header.webp'
import brotosuite from '../images/brotosuite.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Login } from '../features/UserSlice'

function LoginPage() {

    let dispatch = useDispatch()
    let navigate = useNavigate()

    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        let credentials = {
            "username": username,
            "password": password
        }
        await dispatch(Login(credentials))
        navigate('/')
        // window.location.reload()
    }

    useEffect(() => {
        let access = localStorage.getItem('authToken')
        if (access){
            navigate('/')
        }else{
            navigate('/login')
        }
    },[])

    return (

        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto bg-black md:h-screen lg:py-0">

            <div class="w-full rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-[#191C24]">
                <div class="p-6 sm:p-8">
                    <div className='flex justify-center items-center'>
                        <img className='w-1/2 h-14 m-5  opacity-70' src={header} alt="https://brototype.com/icons/header.webp" />
                    </div>
                    <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6">
                        <div>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" class="bg-black outline-none py-4 text-white sm:text-sm rounded-md  block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required="" />
                        </div>

                        <div>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" class="bg-black outline-none py-4 text-white sm:text-sm rounded-md  block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required="" />
                        </div>

                        <button type="submit" class="w-full py-4 text-white bg-[#EB1616] text-[18px] font-medium rounded-lg text-sm px-5  text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Sign In
                        </button>
                        <div className='mt-3 flex justify-center items-center cursor-pointer'>
                            <span className='text-[#EB1616] text-[16px]'>Forgot Password</span>
                        </div>
                        <div className='mt-2 flex justify-center items-center cursor-pointer'>
                            <span className='text-[#6C7293] text-[16px]'>Don't have an account? </span>
                            <Link to='/signup'>
                                <span className='text-[#EB1616]'>SignUp</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default LoginPage
