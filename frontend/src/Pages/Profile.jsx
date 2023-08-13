import React from 'react'
import profile from '../images/profile.jpeg'
import authenticated from '../icons/authenticated.png'
import edit1 from '../icons/edit1.png'
import jwtDecode from 'jwt-decode';


function Profile() {

  let access = localStorage.getItem("authToken")
  let decode = jwtDecode(access)

  return (
    <div className={decode.is_superuser || decode.is_advisor || decode.is_reviewer ? 'grid grid-cols-1 items-center justify-center lg:mx-[250px] md:mx-[150px] sm:mx-[50px] xs:mx-[0px]' : 'grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1'}>
      <div className='grid grid-rows-1'>
        <div className='mx-[100px] grid items-center justify-center mt-10'>
          <img className=' rounded-full w-[250px] h-[250px] bg-cover ' src={profile} alt="" />
          <div className='flex mt-4'>
            <img className='h-6 mt-1 me-3' src={authenticated} alt="" />
            <span className='w-[200px] flex justify-center items-center p-1 rounded-lg bg-[#1A1E29]'>
              Edit profile Details
              <img className='h-4 opacity-75 ms-5 cursor-pointer' src={edit1} alt="" />
            </span>
          </div>
        </div>
        <div className='bg-[#0F121A] lg:mx-[100px] md:mx-[80px] sm:mx-[30px] xs:mx-[20px]  mt-5 min-w-[400px] rounded-md'>
          <label className='text-xs opacity-30 mx-[35px] mb-1'>username</label><br />
          <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
            <p className='mx-3'>Jilshak</p>
          </div>
          <label className='text-xs opacity-30 mx-[35px] mb-1'>Domain</label><br />
          <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
            <p className='mx-3'>Python Django</p>
          </div>
          <>
            <div className='grid grid-cols-2 mt-3'>
              <div>
                <label className='text-xs opacity-30 mx-[35px] mb-1'>Date of Birth</label><br />
                <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
                  <p className='mx-3'>15/08/2000</p>
                </div>
              </div>
              <div>
                <label className='text-xs opacity-30 mx-[35px]  mb-1'>Gender</label><br />
                <div className='bg-[#6C7293] opacity-50 py-1 mx-[35px] rounded-lg'>
                  <p className='mx-3'>Male</p>
                </div>
              </div>
            </div>
          </>
          <label className='text-xs opacity-30 mx-[35px] mb-1'>Email</label><br />
          <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
            <p className='mx-3'>mohd.jilshak@gmail.com</p>
          </div>
          <label className='text-xs opacity-30 mx-[35px] mb-1'>Mothers Name</label><br />
          <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
            <p className='mx-3'>Name of mother here</p>
          </div>
          <label className='text-xs opacity-30 mx-[35px] mb-1'>Fathers Name</label><br />
          <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
            <p className='mx-3'>Name of Father here</p>
          </div>
          <br />
        </div>
      </div>

      <div className={decode.is_superuser ? 'hidden' : 'bg-[#0F121A] my-10 lg:mx-[100px] md:mx-[80px] sm:mx-[30px] xs:mx-[20px]  mt-10 min-w-[400px] rounded-md'}>
        <label className='text-xs opacity-30 mx-[35px] mb-1'>Mobile Number</label><br />
        <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
          <p className='mx-3'>9497382176</p>
        </div>
        <label className='text-xs opacity-30 mx-[35px] mb-1'>Guardian Mobile Number</label><br />
        <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
          <p className='mx-3'>9495280070</p>
        </div>
        <label className='text-xs opacity-30 mx-[35px] mb-1'>Educational Qualification</label><br />
        <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
          <p className='mx-3'>Bsc Biotechnology</p>
        </div>
        <label className='text-xs opacity-30 mx-[35px] mb-1'>Aadhaar Number</label><br />
        <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
          <p className='mx-3'>83457834530984753</p>
        </div>
        <label className='text-xs opacity-30 mx-[35px] mb-1'>Village</label><br />
        <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
          <p className='mx-3'>Malappuram</p>
        </div>
        <label className='text-xs opacity-30 mx-[35px] mb-1'>Taluk</label><br />
        <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
          <p className='mx-3'>Thenjippalam</p>
        </div>
        <label className='text-xs opacity-30 mx-[35px] mb-1'>Address of Communication</label><br />
        <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
          <p className='mx-3'>ABC House/ xyz p.o/ Thenjippalam/Malappuram/kerala/India</p>
        </div>
        <label className='text-xs opacity-30 mx-[35px] mb-1'>Permenant Address as per ID Card</label><br />
        <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
          <p className='mx-3'>ABC House/ xyz p.o/ Thenjippalam/Malappuram/kerala/India</p>
        </div>
      </div>

    </div>
  )
}

export default Profile
