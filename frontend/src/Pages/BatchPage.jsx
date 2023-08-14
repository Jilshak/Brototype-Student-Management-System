import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import leftarrow from '../icons/leftarrow.png'
import { useDispatch, useSelector } from 'react-redux'
import { Batches, createBatch } from '../features/BatchSlice'

function BatchPage() {


    let dispatch = useDispatch()


    const [appear, setAppear] = useState(false)
    const [num, setNum] = useState()

    const show = () => {
        if (appear) {
            setAppear(false)
        } else {
            setAppear(true)
            this.forceUpdate()
        }
    }

    const addBatch = async () => {
        if (num === undefined) {
            return alert("The batch field is empty")
        } else {
            let credentials = {
                batch_number: num
            }
            await dispatch(createBatch(credentials))
            await setAppear(false)
            return
        }
    }


    const batch = useSelector((state) => (state.Batches))
    const [batches, setBatches] = useState()

    useEffect(() => {
        dispatch(Batches())
    }, [dispatch, appear])

    useEffect(() => {
        if (batch.data.length > 0) {
            setBatches(batch.data)
        }
    }, [batch.data, appear])

    return (
        <div>
            {
                appear ?
                    <div className='lg:h-1/3 md:h-1/3 sm:h-1/3 xs:h-full lg:w-1/5 md:w-1/5 sm:w-1/5 xs:w-full  bg-[#303443] absolute lg:rounded-lg lg:right-[450px] md:right-[350px] sm:right-[200px] xs:right-0 min-w-[350px] outline-1 z-50 outline outline-white lg:top-[250px]'>
                        <div className='flex justify-center'>
                            <p className='my-5 font-semibold text-lg'>ADD A NEW BATCH</p>
                        </div>
                        <div className='grid mt-5'>
                            <p className='mb-3 mx-10'>Batch Number</p>
                            <input onChange={(e) => setNum(e.target.value)} className='h-[30px] bg-[#22242F] mx-10 text-white pl-3 outline-none rounded-md' type="text" />
                            <div className='flex items-center justify-center'>
                                <button onClick={() => addBatch()} className='mt-3 bg-[#22242F] hover:bg-[#262935] px-5 py-2 rounded-2xl'>ADD</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
            <div className='grid grid-cols-3'>
                <Link to='/dashboard'>
                    <button className='lg:w-12 z-[-100px] md:w-10 sm:w-10 xs:w-10 lg:h-12 md:h-10 sm:h-10 xs:h-10 lg:ms-[100px] md:ms-[60px] sm:ms-[30px] opacity-70 bg-[#303443] my-7 rounded-full'>
                        <span className='flex justify-center'>
                            <img className='lg:h-[35px] md:h-[25px] sm:h-[20px] xs:h-[20px]' src={leftarrow} alt="" />
                        </span>
                    </button>
                </Link>
                <div className='flex justify-center items-center'>
                    <span className='bg-[#303443] w-[130px] rounded-3xl h-12 me-10 flex  justify-center items-center '>
                        <h1 className='text-lg font-semibold'>Batches</h1>
                    </span>
                </div>
                <div onClick={() => show()} className='flex justify-center items-center cursor-pointer'>
                    <span className='bg-[#303443] w-[70px] lg:ms-[70px] md:ms-[40px] sm:ms-[20px] rounded-3xl h-10 flex  justify-center items-center '>
                        <h1 className='text-md font-semibold'>ADD+</h1>
                    </span>
                </div>
            </div>
            {
                batches ?
                    <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 mt-10 lg:ms-[100px] md:ms-[40px] sm:ms-[20px]'>
                        {
                            batches.map((item) => {
                                return (
                                    <Link key={item.id} to={`/batch_number/${item.id}`}>
                                        <div className='flex justify-center mb-3 items-center bg-[#303443] h-20 lg:mx-5 md:mx-4 sm:mx-3 xs:mx-10 rounded-xl'>
                                            <h1>BATCH {item.batch_number}</h1>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default BatchPage
