import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import leftarrow from '../icons/leftarrow.png'
import search from '../icons/search.png'
import remove from '../icons/remove.png'
import edit1 from '../icons/edit1.png'
import { useDispatch, useSelector } from 'react-redux'
import { InternList, deleteUser, editUser } from '../features/UserSlice'

function BatchStudentsPage() {

    const { id } = useParams()

    const Interns = useSelector((state) => state.Users)
    const [list, setList] = useState()
    const [loading, setLoading] = useState(true)
    let navigate = useNavigate()

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(InternList(id))
    }, [dispatch])

    useEffect(() => {
        if (loading) {
            if (Interns.state) {
                setList(Interns.state)
                console.log(list)
                if (list?.length > 0) {
                    console.log('the list is loaded')
                    setLoading(false)
                }
            } else {
                setLoading(true)
            }
        }
    }, [Interns.state])


    //Search option
    const [find, setFind] = useState();
    const searchItem = async (e) => {
        if (!find) {
            setFind(list);
        }
        if (e.target.value === '') {
            setList(find);
        } else {
            setList(await list.filter((item) => {
                return item.username.startsWith(e.target.value);
            }));
        }
    }


    //delete user
    const delete_user = async (user_id) => {
        await dispatch(deleteUser(user_id))
        await dispatch(InternList(id))
        setList(prevList => prevList.filter(item => item.id !== user_id))
    }

    //edit user
    const [edit, setEdit] = useState(false)
    //user id
    const [userid, setUserId] = useState()

    //edit User States
    const [username, setUsername] = useState(null)
    const [firstname, setFirstName] = useState(null)
    const [lastname, setLastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [dateofbirth, setDateOfBirth] = useState(null)
    const [guardiansname, setGuardiansName] = useState(null)
    const [guardiansnumber, setGuardiansNumber] = useState(null)
    const [aadharnumber, setAadharNumber] = useState(null)
    const [educationalqualification, setEducationalQualification] = useState(null)
    const [batch, setBatch] = useState(null)


    const edit_user = () => {
        console.log("This is being clicked")
        let credentials = {
            id: userid,
            username: username,
            first_name: firstname,
            last_name: lastname,
            date_of_birth: dateofbirth,
            email: email,
            phone: phone,
            guardians_number: guardiansnumber,
            guardians_name: guardiansname,
            aadharnumber: aadharnumber,
            educational_qualification: educationalqualification,
            batch: parseInt(batch),
        }
        dispatch(editUser(credentials))
    }


    return (
        <>
            {
                Interns?.isLoading ?

                    (
                        <h1>Loading....</h1>
                    )

                    :

                    <>
                        <div className=' grid grid-rows-16'>
                            <div className='sticky top-0 z-50'>
                                <div className='grid grid-cols-3'>
                                    <Link onClick={(e) => setList([])} to='/batch'>
                                        <button className='lg:w-12 md:w-10 sm:w-10 xs:w-10 lg:h-12 md:h-10 sm:h-10 xs:h-10 lg:ms-[100px] md:ms-[60px] sm:ms-[30px] opacity-70 bg-[#303443] my-7 rounded-full'>
                                            <span className='flex justify-center'>
                                                <img className='lg:h-[35px] md:h-[25px] sm:h-[20px] xs:h-[20px] ' src={leftarrow} alt="" />
                                            </span>
                                        </button>
                                    </Link>
                                    <div className='flex justify-center items-center'>
                                        <span className='bg-[#303443] w-[130px] rounded-3xl h-12 me-10 flex  justify-center items-center '>
                                            <h1 className='text-lg font-semibold'>BCK112</h1>
                                        </span>
                                    </div>
                                    <div className='flex justify-center items-center '>
                                        <span className='bg-[#303443] w-[40px] lg:ms-[70px] me-3 h-10 justify-center items-center flex rounded-full'>
                                            {Interns.state ? Interns.state.length : (Interns.loading ? 0 : Interns.state.length)}
                                        </span>
                                    </div>
                                </div>
                                <div className='flex items-center relative  justify-center my-5'>
                                    <input onChange={searchItem} className='bg-[#131620]  me-10 outline-none lg:min-w-[700px] md:min-w-[500px] sm:min-w-[350px] xs:min-w-[350px]  py-2 rounded-xl pl-5' type="text" placeholder='Search....' />
                                    <img className='h-[23px]  opacity-60 relative right-20 cursor-pointer' src={search} alt="" />
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
                                            <input onChange={(e) => setGuardiansName(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="text" placeholder='Guardians Name' />
                                            <input onChange={(e) => setGuardiansNumber(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="number" placeholder='Guardians Number' />
                                            <input onChange={(e) => setBatch(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="text" placeholder='batch' />
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
                                !Interns.isLoading && list?.length > 0 ?
                                    <div className='overflow-y-auto max-h-[550px]'>
                                        <div className='grid items-start mx-5 justify-center mt-10'>
                                            {
                                                list?.map((intern) => {
                                                    return (
                                                        <Link key={intern.id} to={`/weeks/${intern.id}`}>
                                                            <div className='flex bg-[#23283B]  my-5 p-2 rounded-3xl opacity-80 lg:min-w-[900px] md:min-w-[500px] sm:min-w-[350px] xs:min-w-[350px]'>
                                                                <span className='rounded-full flex items-center justify-center min-w-[33px] h-8 bg-[#2E313D] '>
                                                                    {intern.id}
                                                                </span>
                                                                <span className='rounded-lg flex items-center justify-start mx-5 min-w-[150px] h-8 bg-[#2E313D] '>
                                                                    <p className='ms-5'>{intern.username}</p>
                                                                </span>
                                                                <span className='rounded-lg xs:hidden sm:block flex items-center justify-start mx-5 w-[150px] h-8 bg-[#2E313D] '>
                                                                    <p className='ms-5 mt-1 flex items-center'>{intern.phone ? intern.phone : <p className='text-xs mt-1'>Mobile number</p> }</p>
                                                                </span>
                                                                <span className='flex items-center justify-end w-[500px]'>
                                                                    <img onClick={(e) => {
                                                                        e.preventDefault()
                                                                        setEdit(true)
                                                                        setUserId(intern.id)
                                                                    }} className='h-[14px] cursor-pointer mx-3' src={edit1} alt="" />
                                                                    <img onClick={(e) => {
                                                                        e.preventDefault()
                                                                        delete_user(intern.id)
                                                                    }} className='h-[30px] cursor-pointer' src={remove} alt="" />
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>

                                    :
                                    null
                            }
                        </div>
                    </>
            }
        </>
    )
}

export default BatchStudentsPage
