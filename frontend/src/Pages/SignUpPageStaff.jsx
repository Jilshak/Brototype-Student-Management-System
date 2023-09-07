import React, { useState } from 'react'
import header from '../images/header.webp'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Register_Staff } from '../features/UserSlice'


function SignUpPageStaff() {

  const [username, setUserName] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [role, setRole] = useState('Advisor')
  const [password, setPassword] = useState('')
  const [password1, setPassword1] = useState('')


  let dispatch = useDispatch()
  let navigate = useNavigate()

  //errors
  const [Utoggle, setUToggle] = useState(false)
  const [Ptoggle, setPToggle] = useState(false)

  const handleSubmit = async (e) => {

    if (!password === password1) {
      alert("The passwords doesn't match one another")
    } else {

      let x = false
      let y = false
      if (role == 'Advisor') {
        x = true
      } else if (role == 'Reviewer') {
        y = true
      }

      e.preventDefault()
      let credentials = {
        username: username,
        password: password,
        first_name: firstname,
        last_name: lastname,
        is_advisor: x,
        is_reviewer: y
      }

      await dispatch(Register_Staff(credentials))
      navigate('/login')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-10 mx-auto bg-black md:h-screen lg:py-0">

      <div className="w-full rounded-lg  md:mt-0 sm:max-w-md xl:p-0 bg-[#191C24]">
        <div className="p-6 sm:p-8">
          <div className='flex justify-center items-center'>
            <img className='w-1/2 h-14 m-5  opacity-70' src={header} alt="https://brototype.com/icons/header.webp" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <input onChange={(e) => {
                setUserName(e.target.value)
                username.includes(" ") ? setUToggle(true) : setUToggle(false)
                setUserName(e.target.value)
              }} type="text" name="username" id="username" className="bg-black outline-none py-4 text-white sm:text-sm rounded-md  block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required="" />
              {
                Utoggle ? <small className='text-red-400 text-xs absolute'>Username Contains white spaces</small> : null
              }
            </div>
            <div className='flex'>
              <input onChange={(e) => setFirstName(e.target.value)} type="text" name="firstname" id="firstname" className="bg-black outline-none py-4 text-white sm:text-sm rounded-md  block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required="" />
              <input onChange={(e) => setLastName(e.target.value)} type="text" name="lastname" id="lastname" className="bg-black outline-none ms-2 py-4 text-white sm:text-sm rounded-md  block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required="" />
            </div>
            <div>
              <select onChange={(e) => setRole(e.target.value)} id="countries" className="bg-black outline-none py-4 text-white sm:text-sm rounded-md  block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                <option value='Advisor' selected>Advisor</option>
                <option value="Reviewer">Reviewer</option>
              </select>
            </div>
            <div>
              <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="bg-black outline-none py-4 text-white sm:text-sm rounded-md  block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required="" />
            </div>
            <div>
              <input onChange={ async (e) => {
                setPassword1(e.target.value)
                password == password1 ? await setPToggle(false) : await setPToggle(true)
              }} type="password" name="password1" id="password1" className="bg-black outline-none py-4 text-white sm:text-sm rounded-md  block w-full p-2.5  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm Password" required="" />
              {
                Ptoggle ? <small className='text-red-400 text-xs absolute'>The passwrods doesn't match one another!!</small> : null
              }
            </div>

            <button type="submit" className="w-full py-4 text-white bg-[#EB1616] text-[18px] font-medium rounded-lg text-sm px-5  text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>

            <div className='mt-2 flex justify-center items-center cursor-pointer'>
              <span className='text-[#6C7293] text-[16px]'>Already have an account?</span>
              <Link to='/login'>
                <span className='text-[#EB1616]'>LogIn</span>
              </Link>
            </div>
            <div className='mt-2 flex justify-center items-center cursor-pointer'>
              <span className='text-[#6C7293] text-[16px] me-3'>SignUp as a Intern</span>
              <Link to='/signup'>
                <span className='text-[#EB1616]'> SignUp</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpPageStaff
