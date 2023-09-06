import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import leftarrow from '../icons/leftarrow.png'
import search from '../icons/search.png'
import remove from '../icons/remove.png'
import edit1 from '../icons/edit1.png'
import { useDispatch, useSelector } from 'react-redux'
import { ReviewerList, deleteUser, editUser } from '../features/UserSlice'

function ReviewersPage() {

    const reviewer = useSelector((state) => state.Users)
    let dispatch = useDispatch()

    const [reviewers, setReviewers] = useState()
    //edit user


    //edit user
    const [edit, setEdit] = useState(false)
    //user id
    const [userid, setUserId] = useState()

    const [username, setUsername] = useState(null)
    const [firstname, setFirstName] = useState(null)
    const [lastname, setLastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [dateofbirth, setDateOfBirth] = useState(null)
    const [aadharnumber, setAadharNumber] = useState(null)
    const [educationalqualification, setEducationalQualification] = useState(null)

    const edit_user = async () => {
        let credentials = {
            id: userid,
            username: username,
            first_name: firstname,
            last_name: lastname,
            date_of_birth: dateofbirth,
            email: email,
            phone: phone,
            aadharnumber: aadharnumber,
            educational_qualification: educationalqualification,
        }
        dispatch(editUser(credentials))
    }


    //delete user
    const delete_user = (id) => {
        dispatch(deleteUser(id))
        setReviewers(prevList => prevList.filter(user => user.id !== id));
    }


    //Search option
    const [find, setFind] = useState()
    const searchItem = async (e) => {
        setFind(reviewers)
        if (e.target.value === '') {
            return setReviewers(find)
        } else {
            setReviewers(await reviewers.filter((item) => {
                return item.username.startsWith(e.target.value)
            }))
        }
    }


    useEffect(() => {
        dispatch(ReviewerList())
    }, [dispatch])

    useEffect(() => {
        if (reviewer.state.length > 0) {
            return setReviewers(reviewer.state)
        }
    }, [reviewer.state])


    return (
        <>
            <div className='grid sticky top-0 z-50'>
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
                            {reviewers?.length}
                        </span>

                    </div>
                </div>
                <div className='flex items-center justify-center my-5'>
                    <input onChange={searchItem} className='bg-[#131620] absolute me-10 outline-none lg:min-w-[700px] md:min-w-[500px] sm:min-w-[350px] xs:min-w-[350px]  py-2 rounded-xl pl-5' type="text" placeholder='Search....' />
                    <img className='h-[23px] opacity-60 relative lg:left-[300px] md:left-[200px] sm:left-[130px] xs:left-[130px] cursor-pointer' src={search} alt="" />
                </div>
            </div>

            {
                edit ?
                    <div className=' absolute grid lg:right-[300px] xs:right-0 rounded-3xl z-50 bg-[#303443] min-w-[350px] h-[600px] object-contain md:w-1/3 m-[100px]'>
                        <div className='grid mx-[100px] grid-flow-row gap-0 relative my-6'>
                            <div onClick={(e) => setEdit(false)} className='flex items-center justify-end'>
                                <img className='h-[30px] relative left-14 cursor-pointer' src={remove} alt="" />
                            </div>
                            <div className='flex justify-center items-center'>
                                <p className='text-xl font-semibold my-3'>Edit User Details</p>
                            </div>
                            <input onChange={(e) => setUsername(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="text" placeholder='Username' />
                            <input onChange={(e) => setFirstName(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="text" placeholder='First Name' />
                            <input onChange={(e) => setLastName(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="text" placeholder='Last Name' />
                            <input onChange={(e) => setEmail(e.target.value)} type='email' className='h-[35px] mb-1 outline-none bg-[#22242F]  pl-3 text-white rounded-md' placeholder='Email' />
                            <input onChange={(e) => setPhone(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="number" placeholder='Phone' />
                            <input onChange={(e) => setDateOfBirth(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="date" name="" id="" />
                            <input onChange={(e) => setEducationalQualification(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="text" placeholder='Highest Educational Qualification' />
                            <input onChange={(e) => setAadharNumber(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="number" placeholder='Aadhar Number' />
                            <div className='flex justify-center mb-1 items-center my-2'>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    edit_user()
                                    setEdit(false)
                                }} className='bg-[#272c3e] hover:bg-[#2d334b] opacity-70 px-5 py-2 rounded-lg'>Save Edit</button>
                            </div>
                        </div>
                    </div>
                    : null
            }

            {
                !reviewer.isLoading && reviewers ?
                    <div className='grid justify-center mt-10'>
                        <div className='xs:me-[50px] overflow-y-auto max-h-[550px]'>
                            {
                                reviewers.map((item) => {
                                    return (
                                        <Link key={item.id} to={`/assign_time`}>
                                            <div className='flex bg-[#23283B] cursor-pointer  mb-8 p-2 rounded-3xl opacity-80 lg:min-w-[900px] md:min-w-[500px] sm:min-w-[350px] xs:min-w-[350px]'>
                                                <span className='rounded-full flex items-center justify-center min-w-[33px] h-8 bg-[#2E313D] '>
                                                    {item.id}
                                                </span>
                                                <span className='rounded-lg flex items-center justify-start mx-5 min-w-[150px] h-8 bg-[#2E313D] '>
                                                    <p className='ms-5'>{item.username}</p>
                                                </span>
                                                <span className='rounded-lg xs:hidden sm:block flex items-center justify-start mx-5 w-[150px] h-8 bg-[#2E313D] '>
                                                    <p className='ms-5 mt-1'>{item.phone ? item.phone : "Not provided"}</p>
                                                </span>
                                                <span className='flex items-center justify-end w-[500px]'>
                                                    <img onClick={(e) => {
                                                        setUserId(item.id)
                                                        setEdit(true)
                                                    }} className='h-[14px] mx-3 cursor-pointer' src={edit1} alt="" />
                                                    <img onClick={(e) => delete_user(item.id)} className='h-[30px] cursor-pointer ' src={remove} alt="" />
                                                </span>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div> : null
            }
        </>
    )
}

export default ReviewersPage
