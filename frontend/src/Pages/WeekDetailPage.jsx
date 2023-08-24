import React, { useEffect, useState } from 'react'
import folder from '../icons/folder.png'
import edit1 from '../icons/edit1.png'
import remove from '../icons/remove.png'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ProfileDetails } from '../features/UserSlice'
import jwtDecode from 'jwt-decode';
import { WeekDetailsUser } from '../features/WeekDetails'
import { UpdateDetailsOfUser } from '../features/ReviewCompletedSlice'




function WeekDetailPage() {

    const [decode, setDecode] = useState()
    const [loading, setLoading] = useState(true)

    const { id, userid } = useParams()

    const weekDetails = useSelector((state) => state.Users)
    const dispatch = useDispatch()

    const [weekDetail, setWeekDetail] = useState([])

    useEffect(() => {
        let token = localStorage.getItem("authToken")
        setDecode(jwtDecode(token))
    }, [])

    useEffect(() => {
        if (decode) {
            setLoading(false)
            if (decode?.is_superuser || decode?.is_reviewer || decode?.is_advisor) {
                console.log("Its entering here all right")
                console.log(userid)
                dispatch(ProfileDetails(userid))
            } else {
                dispatch(ProfileDetails(decode?.user_id))
            }
        } else {
            setLoading(true)
        }
    }, [dispatch, decode])

    useEffect(() => {
        if (weekDetails.state) {
            setWeekDetail(weekDetails.state.weeks)
            console.log(weekDetail)
        }
    }, [weekDetails.state])


    const [Marks, setMarks] = useState()
    const [advisor, setAdvisor] = useState('')
    const [reviewer, setReviewer] = useState('')
    const [conducted, setConducted] = useState('')
    const [audio, setAudio] = useState(false)
    const [description, setDescription] = useState(false)
    const [typing, setTyping] = useState(false)
    const [additional, setAdditional] = useState(false)
    const [seminar, setSeminar] = useState(false)
    const [progress, setProgress] = useState(false)
    const [feedback, setFeedback] = useState(false)
    const [pending, setPending] = useState('')
    const [toggle, setToggle] = useState(false)
    const [toggle1, setToggle1] = useState(false)
    const [toggle2, setToggle2] = useState(false)
    const [toggle3, setToggle3] = useState(false)
    const [temp, setTemp] = useState('')


    const edit = async () => {

        const week_id = await weekDetail?.find((item) => {
            return item.week_number == id
        })

        console.log("This is the week details: ", week_id.weekdetails_set[0])
        console.log("This is the week details: ", week_id.weekdetails_set[0].week)




        let credentials = {
            id: week_id.weekdetails_set[0].id,
            week_id: id,
            Marks: Marks,
            advisor: advisor,
            reviewer: reviewer,
            conducted_on: conducted
        }


        await dispatch(WeekDetailsUser(credentials))
        if (Number(Marks) >= 5 && conducted) {
            await Promise.resolve(dispatch(UpdateDetailsOfUser(week_id?.weekdetails_set[0].week)))
        }

        setToggle(false)
    }

    const edit2 = async () => {

        const week_id = await weekDetail?.find((item) => {
            return item.week_number == id
        })

        let credentials = {
            id: week_id.weekdetails_set[0].id,
            seminar_presentation: seminar,
            progress: progress,
            feedback: feedback
        }
        console.log(seminar, progress, feedback)
        await dispatch(WeekDetailsUser(credentials))

        setToggle1(false)
    }



    const edit3 = async () => {

        const week_id = weekDetail?.find((item) => {
            return item.week_number == id
        })

        let credentials = {
            id: week_id.weekdetails_set[0].id,
            audio_task: audio,
            description: description,
            typing: typing,
        }

        console.log(credentials)

        await dispatch(WeekDetailsUser({ ...credentials }))

        setToggle2(false)


    }

    return (
        <>
            {
                loading ?

                    (
                        <h1>Loading....</h1>
                    )

                    :

                    (
                        <>
                            {
                                toggle ?

                                    <div className='flex justify-center '>
                                        <div className=' absolute min-h-1/3  min-w-[450px] z-50 grid rounded-2xl gap-3 my-10 bg-[#1f212c]'>
                                            <div className='flex items-center my-3 justify-center'>
                                                <p className='text-lg '>Edit Review Details</p>
                                                <div className='flex justify-end relative left-28'>
                                                    <img onClick={(e) => setToggle(false)} className='h-6 cursor-pointer' src={remove} alt="" />
                                                </div>
                                            </div>
                                            <input className='rounded-2xl mx-[20px] h-[35px] bg-[#262937] px-10 py-2 outline-none' onChange={(e) => setMarks(e.target.value)} type="number" placeholder='Marks' />
                                            <input className='rounded-2xl mx-[20px] h-[35px] bg-[#262937] px-10  outline-none py-2' onChange={(e) => setAdvisor(e.target.value)} type="text" placeholder='Advisor' />
                                            <input className='rounded-2xl mx-[20px] h-[35px] bg-[#262937] px-10 outline-none py-2' onChange={(e) => setReviewer(e.target.value)} type="text" placeholder='Reviewer' />
                                            <input className='rounded-2xl mx-[20px] h-[35px] bg-[#262937] px-10 outline-none py-2' onChange={(e) => setConducted(e.target.value)} type="date" placeholder='Conducted On' />
                                            <div className='flex justify-center items-center mt-2 mb-5'>
                                                <button onClick={(e) => edit()} className='bg-red-500 hover:bg-red-600 px-8 py-2 rounded-xl'>
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                            {
                                toggle1 ?

                                    <div className='flex justify-center '>
                                        <div className=' absolute min-h-1/3  min-w-[450px] z-50 grid rounded-2xl gap-3 my-10 bg-[#1f212c]'>
                                            <div className='flex items-center my-3 justify-center'>
                                                <p className='text-lg '>Edit Miscellenous Details</p>
                                                <div className='flex justify-end relative left-28'>
                                                    <img onClick={(e) => setToggle1(false)} className='h-6 cursor-pointer' src={remove} alt="" />
                                                </div>
                                            </div>
                                            <select onChange={(e) => setSeminar(e.target.value)} className='rounded-2xl mx-[20px] h-[35px] bg-[#262937] px-10 outline-none py-1 '>
                                                <option selected> Seminar Presentation </option>
                                                <option value={true}>True</option>
                                                <option >False</option>
                                            </select>
                                            <select onChange={(e) => setFeedback(e.target.value)} className='rounded-2xl mx-[20px] h-[35px] bg-[#262937] px-10 outline-none py-1 '>
                                                <option selected>  FeedBack Session </option>
                                                <option value={true}>True</option>
                                                <option >False</option>
                                            </select>
                                            <select onChange={(e) => setProgress(e.target.value)} className='rounded-2xl mx-[20px] h-[35px] bg-[#262937] px-10 outline-none py-1 '>
                                                <option selected> Progress Video </option>
                                                <option value={true}>True</option>
                                                <option >False</option>
                                            </select>

                                            <div className='flex justify-center items-center mt-2 mb-5'>
                                                <button onClick={(e) => edit2()} className='bg-red-500 hover:bg-red-600 px-8 py-2 rounded-xl'>
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                            {
                                toggle2 ?

                                    <div className='flex justify-center '>
                                        <div className=' absolute min-h-1/3  min-w-[450px] z-50 grid rounded-2xl gap-3 my-10 bg-[#1f212c]'>
                                            <div className='flex items-center my-3 justify-center'>
                                                <p className='text-lg '>Edit Personal Task</p>
                                                <div className='flex justify-end relative left-28'>
                                                    <img onClick={(e) => setToggle2(false)} className='h-6 cursor-pointer' src={remove} alt="" />
                                                </div>
                                            </div>
                                            <select onChange={(e) => setAudio(e.target.value)} className='rounded-2xl mx-[20px] h-[35px] bg-[#262937] px-10 outline-none py-1 '>
                                                <option selected> Audio Task </option>
                                                <option value={true}>True</option>
                                                <option value={false}>False</option>
                                            </select>
                                            <select onChange={(e) => setDescription(e.target.value)} className='rounded-2xl mx-[20px] h-[35px] bg-[#262937] px-10 outline-none py-1 '>
                                                <option selected>  Descriptions </option>
                                                <option value={true}>True</option>
                                                <option value={false}>False</option>
                                            </select>
                                            <select onChange={(e) => setTyping(e.target.value)} className='rounded-2xl mx-[20px] h-[35px] bg-[#262937] px-10 outline-none py-1 '>
                                                <option selected>  Typing </option>
                                                <option value={true}>True</option>
                                                <option value={false}>False</option>
                                            </select>

                                            <div className='flex justify-center items-center mt-2 mb-5'>
                                                <button onClick={(e) => edit3()} className='bg-red-500 hover:bg-red-600 px-8 py-2 rounded-xl'>
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                            {
                                toggle3 ?
                                    <div className='flex justify-center'>
                                        <div className='absolute min-h-1/3  min-w-[450px] z-50 grid rounded-2xl gap-3 my-10 bg-[#1f212c]'>
                                            <div className='flex item-center justify-center my-3'>
                                                <span className=' text-md'>
                                                    Enter the Pending Topics here:
                                                </span>
                                            </div>
                                            <textarea
                                            value={temp}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        setPending([...pending, [temp]]);
                                                        console.log(pending)
                                                        setTemp('')
                                                    }
                                                }}
                                                className='bg-[#282b3b] outline-none pl-2 py-2' onChange={(e) => setTemp(e.target.value)} name="" id="" cols="30" rows="10"></textarea>
                                        </div>
                                    </div> : null
                            }
                            <div className='grid items-start justify-start ms-12'>
                                <span className='px-24 text-2xl py-4 rounded-3xl bg-[#15171E]  my-6'>
                                    Week {id}
                                </span>
                            </div>
                            <div className='grid  lg:grid-cols-6 ms:grid-cols-3 sm:grid-cols-1 xs:grid-cols-1 items-center justify-start bg-[#15171E] min-h-[170px] w-auto me-[100px] ms-[48px]'>
                                <div className='grid items-start justify-center'>
                                    <img className='h-[60px] ms-7' src={folder} alt="" />
                                    <p>Personal Workout </p>
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
                                        {
                                            decode?.is_superuser || decode?.is_advisor || decode?.is_reviewer ?
                                                <img onClick={(e) => setToggle3(true)} className='h-5 my-8 relative cursor-pointer opacity-50 lg:left-36 md:left-30 sm:left-20 xs:left-10' src={edit1} alt="" />
                                                : null
                                        }
                                    </div>
                                    {
                                        weekDetail ?

                                            <>
                                                {
                                                    weekDetail?.map((item) => {
                                                        if (item.week_number == id) {
                                                            return (
                                                                <p>
                                                                    {pending ? pending : item.weekdetails_set[0].pending || pending ? (item.weekdetails_set[0].pending ? item.weekdetails_set[0].pending : pending) : <p className='text-gray-500 mx-2'> ______ </p>}
                                                                </p>
                                                            )
                                                        }
                                                    })
                                                }
                                            </>
                                            : null
                                    }
                                </div>
                                <div className='bg-[#15171E] min-h-[300px] me-[100px] lg:mt-0 xs:mt-5 '>
                                    <div className='flex justify-center'>
                                        <span className='bg-[#6C7293] flex items-center h-11 my-5 text-xl rounded-2xl px-6 opacity-70'>
                                            Review Details
                                        </span>
                                        {
                                            decode?.is_superuser || decode?.is_reviewer ?
                                                <img onClick={(e) => setToggle(true)} className='h-5 my-8 cursor-pointer relative opacity-50  lg:left-32 md:left-24 sm:left-24 xs:left-10' src={edit1} alt="" />
                                                : null
                                        }
                                    </div>
                                    {
                                        weekDetail ?
                                            <>
                                                {
                                                    weekDetail?.map((item) => {
                                                        if (item.week_number == id) {
                                                            return (
                                                                <>
                                                                    <div className='mx-[30px] py-2 bg-[#1C1E26] mb-3 opacity-70 rounded-lg'>
                                                                        <span className='mx-5 flex text-white'>Marks Obtained : {Marks ? Marks : (item.weekdetails_set[0].Marks || Marks ? (item.weekdetails_set[0].Marks ? item.weekdetails_set[0].Marks : Marks) : <p className='text-gray-500 mx-2'> ______</p>)}</span>
                                                                    </div>
                                                                    <div className='mx-[30px] py-2 mb-3 bg-[#1C1E26] opacity-70 rounded-lg'>
                                                                        <span className='mx-5 flex text-white'>Advisor : {advisor ? advisor : (item.weekdetails_set[0].advisor || advisor ? (item.weekdetails_set[0].advisor ? item.weekdetails_set[0].advisor : advisor) : <p className='text-gray-500 mx-2'> ______</p>)}</span>
                                                                    </div>
                                                                    <div className='mx-[30px] py-2 mb-3 bg-[#1C1E26] opacity-70 rounded-lg'>
                                                                        <span className='mx-5 flex'>Reviewer : {reviewer ? reviewer : (item.weekdetails_set[0].reviewer || reviewer ? (item.weekdetails_set[0].reviewer ? item.weekdetails_set[0].reviewer : reviewer) : <p className='text-gray-500 mx-2'> ______</p>)}</span>
                                                                    </div>
                                                                    <div className='mx-[30px] py-2 mb-3 bg-[#1C1E26] opacity-70 rounded-lg'>
                                                                        <span className='mx-5 flex'>Conducted : {conducted ? conducted : (item.weekdetails_set[0].conducted_on || conducted ? (item.weekdetails_set[0].conducted_on ? item.weekdetails_set[0].conducted_on : conducted) : <p className='text-gray-500 mx-2'> _______</p>)}</span>
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    })
                                                }
                                            </> :
                                            null
                                    }
                                </div>
                            </div>
                            <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 my-5 ms-12'>
                                <div className='bg-[#15171E] min-h-[300px] lg:me-[40px] xs:me-[100px] overflow-y-auto'>
                                    <div className='flex justify-center'>
                                        <span className='bg-[#6C7293] flex items-center h-11 my-5 text-xl rounded-2xl px-6 opacity-70'>
                                            Personal Tasks
                                        </span>
                                        {
                                            decode?.is_superuser || decode?.is_advisor ?
                                                <img onClick={(e) => setToggle2(true)} className='h-5 cursor-pointer my-8 relative opacity-50 lg:left-36 md:left-30 sm:left-20 xs:left-10' src={edit1} alt="" />
                                                : null
                                        }
                                    </div>
                                    {
                                        weekDetail ?
                                            <>
                                                {
                                                    weekDetail?.map((item) => {
                                                        if (item.week_number == id) {
                                                            return (
                                                                <>
                                                                    <div className='mx-[30px] py-2 bg-[#1C1E26] mb-3 opacity-70 rounded-lg'>
                                                                        <span className='mx-5 flex'>Audio Task : {audio ? (audio === "true" ? <p className='text-green-500 ms-2'>Added</p> : <p className='text-red-500 ms-2'>Not Added</p>) : (item.weekdetails_set[0].audio_task ? <p className='text-green-500 ms-2'>Added</p> : <p className='text-red-500 mx-2'> Not Added</p>)}</span>

                                                                    </div>
                                                                    <div className='mx-[30px] py-2 bg-[#1C1E26] mb-3 opacity-70 rounded-lg'>
                                                                        <span className='mx-5 flex'>Descriptions : {description ? (description === "true" ? <p className='text-green-500 ms-2'>Added</p> : <p className='text-red-500 ms-2'>Not Added</p>) : (item.weekdetails_set[0].description ? <p className='text-green-500 ms-2'>Added</p> : <p className='text-red-500 mx-2'> Not Added</p>)}</span>
                                                                    </div>
                                                                    <div className='mx-[30px] py-2 bg-[#1C1E26] mb-3 opacity-70 rounded-lg'>
                                                                        <span className='mx-5 flex'>Typing : {typing ? (typing === "true" ? <p className='text-green-500 ms-2'>Added</p> : <p className='text-red-500 ms-2'>Not Added</p>) : (item.weekdetails_set[0].typing ? <p className='text-green-500 ms-2'>Added</p> : <p className='text-red-500 mx-2'> Not Added</p>)}</span>

                                                                    </div>
                                                                    <div className='mx-[30px] py-2 bg-[#1C1E26] mb-3 opacity-70 rounded-lg'>
                                                                        <span className='mx-5 flex'>Additional Task : <p className='text-yellow-400 ms-2'>Have None</p></span>
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    })
                                                }
                                            </> :
                                            null
                                    }
                                </div>
                                <div className='bg-[#15171E] min-h-[300px] me-[100px] lg:mt-0 xs:mt-5 '>
                                    <div className='flex justify-center'>
                                        <span className='bg-[#6C7293] flex items-center h-11 my-5 text-xl rounded-2xl px-6 opacity-70'>
                                            Miscellenous Tasks
                                        </span>
                                        {
                                            decode?.is_superuser || decode.is_advisor ?
                                                <img onClick={(e) => setToggle1(true)} className='h-5 my-8 cursor-pointer relative opacity-50 lg:left-24 md:left-24 sm:left-24 xs:left-4' src={edit1} alt="" />
                                                : null
                                        }
                                    </div>
                                    {
                                        weekDetail ?
                                            <>
                                                {
                                                    weekDetail?.map((item) => {
                                                        if (item.week_number == id) {
                                                            return (
                                                                <>
                                                                    <div className='mx-[30px] py-2 bg-[#1C1E26] mb-3 opacity-70 rounded-lg'>
                                                                        <span className='mx-5 flex'>Seminar Presentation : {seminar ? (seminar === "true" ? <p className='text-green-500 ms-2'>Added</p> : <p className='text-red-500 ms-2'>Not Added</p>) : (item.weekdetails_set[0].seminar_presentation ? <p className='text-green-500 ms-2'>Added</p> : <p className='text-red-500 mx-2'> Not Added</p>)}</span>

                                                                    </div>
                                                                    <div className='mx-[30px] py-2 bg-[#1C1E26] mb-3 opacity-70 rounded-lg'>
                                                                        <span className='mx-5 flex'>Feedback Session : {feedback ? (feedback === "true" ? <p className='text-green-500 ms-2'>Added</p> : <p className='text-red-500 ms-2'>Not Added</p>) : (item.weekdetails_set[0].feedback ? <p className='text-green-500 ms-2'>Added</p> : <p className='text-red-500 mx-2'> Not Added</p>)}</span>

                                                                    </div>
                                                                    <div className='mx-[30px] py-2 bg-[#1C1E26] mb-3 opacity-70 rounded-lg'>
                                                                        <span className='mx-5 flex'>Progress Video : {progress ? (progress === "true" ? <p className='text-green-500 ms-2'>Added</p> : <p className='text-red-500 ms-2'>Not Added</p>) : (item.weekdetails_set[0].progress ? <p className='text-green-500 ms-2'>Added</p> : <p className='text-red-500 mx-2'> Not Added</p>)}</span>
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    })
                                                }
                                            </> :
                                            null
                                    }

                                </div>
                            </div>
                        </>
                    )
            }
        </>
    )
}

export default WeekDetailPage
