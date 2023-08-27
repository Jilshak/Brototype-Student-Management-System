import React, { useEffect, useState } from 'react'
import profile from '../images/profile.jpeg'
import axios from 'axios'
import authenticated from '../icons/authenticated.png'
import unauthenticated from '../icons/unauthenticated.png'
import edit1 from '../icons/edit1.png'
import remove from '../icons/remove.png'
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux'
import { ProfileDetails, editUser, profileImage } from '../features/UserSlice'

function Profile() {

  const [test, setTest] = useState()


  let access = localStorage.getItem("authToken")
  let decode = jwtDecode(access)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ProfileDetails(decode.user_id))
  }, [dispatch])


  //edit//
  const [edit, setEdit] = useState(false)
  const [userid, setUserId] = useState(decode.user_id)

  //edit User States
  const [username, setUsername] = useState(null)
  const [firstname, setFirstName] = useState(null)
  const [lastname, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const [dateofbirth, setDateOfBirth] = useState(null)
  const [experience, setExperience] = useState(null)
  const [guardiansname, setGuardiansName] = useState(null)
  const [guardiansnumber, setGuardiansNumber] = useState(null)
  const [aadharnumber, setAadharNumber] = useState(null)
  const [educationalqualification, setEducationalQualification] = useState(null)
  const [batch, setBatch] = useState(null)
  const [domain, setDomain] = useState(null)
  const [address, setAddress] = useState(null)
  const [village, setVillage] = useState(null)
  const [taluk, setTaluk] = useState(null)
  const [mothers_name, setMOthers_name] = useState(null)
  const [fathers_name, setFathers_name] = useState(null)



  const edit_user = async () => {
    console.log("This is being clicked")
    let credentials = {
      id: userid,
      username: username,
      first_name: firstname,
      last_name: lastname,
      date_of_birth: dateofbirth,
      email: email,
      experience: experience,
      phone: phone,
      guardians_number: guardiansnumber,
      guardians_name: guardiansname,
      aadhar_number: aadharnumber,
      educational_qualification: educationalqualification,
      batch: parseInt(batch),
      domain: domain,
      address: address,
      village: village,
      taluk: taluk,
      mother_name: mothers_name,
      fathers_name: fathers_name
    }
    await dispatch(editUser(credentials))
    await dispatch(ProfileDetails(decode.user_id))
  }


  const profileDetail = useSelector((state) => state.Users)

  const updateImage = async (e) => {
    const formData = new FormData();
    formData.append('image', e);

    const credentials = {
      id: decode.user_id,
      image: formData
    }

    await Promise.resolve(dispatch(profileImage(credentials)))
    await dispatch(ProfileDetails(decode.user_id))
  };

  useEffect(() => {
    setTest(profileDetail.state)
  }, [profileDetail.state])

  return (
    <div className={decode.is_superuser || decode.is_advisor || decode.is_reviewer ? 'grid grid-cols-1 items-center justify-center lg:mx-[250px] md:mx-[150px] sm:mx-[50px] xs:mx-[0px]' : 'grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1'}>
      <div className='grid grid-rows-1'>
        <div className='mx-[100px] grid items-center justify-center mt-10'>
          <button type="button" className="rounded-full w-[250px] h-[250px] object-cover z-50" aria-expanded="false" data-dropdown-toggle="dropdown-user">
            <label htmlFor="profile_image">
              <input
                type="file"
                name='profile_image'
                accept='image/*'
                id='profile_image'
                onChange={(e) => updateImage(e.target.files[0])}
                className="hidden"
              />
              <img
                className="rounded-full w-[250px] h-[250px] object-cover cursor-pointer"
                src={test?.image ? test?.image : "https://img.icons8.com/?size=512&id=zXd7HOdmWPxf&format=png"}
              />
            </label>
          </button>
          <div className='flex mt-4'>
            <img className='h-6 mt-1 me-3' src={decode.authenticated ? authenticated : unauthenticated} alt="" />
            <span onClick={(e) => setEdit(true)} className='w-[200px] cursor-pointer flex justify-center items-center p-1 rounded-lg bg-[#1A1E29]'>
              Edit profile Details
              <img className='h-4 opacity-75 ms-5 cursor-pointer' src={edit1} alt="" />
            </span>
          </div>
        </div>
        <>
          {
            !decode.is_superuser && !decode.is_reviewer && !decode.is_advisor ?
              <>
                <>
                  {
                    edit ?
                      <div className=' absolute grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 lg:right-[300px] xs:right-0 rounded-3xl z-50 bg-[#303443] min-w-[350px] min-h-[600px] object-contain w-1/2 m-[50px]'>
                        <div className='grid mx-[30px] grid-flow-row gap-0 relative my-6'>
                          <div className='flex justify-center items-center'>
                            <p className='text-xl font-semibold my-3'>Edit User Details</p>
                          </div>
                          <div onClick={(e) => setEdit(false)} className='flex h-[30px] items-center justify-end'>
                            <img className='h-[30px] lg:hidden md:hidden sm:block xs:block relative top-[-40px] cursor-pointer' src={remove} alt="" />
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

                          </div>
                        </div>
                        <div className=''>
                          <div onClick={(e) => setEdit(false)} className='flex h-[30px] items-center justify-end'>
                            <img className='h-[30px] lg:block md:block sm:hidden xs:hidden relative right-10 top-10 cursor-pointer' src={remove} alt="" />
                          </div>
                          <div className='grid mx-[30px] grid-flow-row gap-0 relative my-6 top-6'>
                            <div className='h-6'></div>
                            <input onChange={(e) => setDomain(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="text" placeholder='Domain' />
                            <input onChange={(e) => setAddress(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="text" placeholder='Address' />
                            <input onChange={(e) => setVillage(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="text" placeholder='Village' />
                            <input onChange={(e) => setTaluk(e.target.value)} type='email' className='h-[35px] mb-1 outline-none bg-[#22242F]  pl-3 text-white rounded-md' placeholder='Taluk' />
                            <input onChange={(e) => setMOthers_name(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="text" placeholder='Mothers Name' />
                            <input onChange={(e) => setFathers_name(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="text" placeholder='Fathers Name' />
                            <input className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="number" placeholder='Coming Soon' />
                            <input className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="date" name="" id="" />
                            <input className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="text" placeholder='Coming soon' />
                            <input className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="number" placeholder='Coming Soon' />
                            <input className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="text" placeholder='Coming Soon' />
                            <div className='flex justify-center mb-1 items-center my-2'>
                            </div>
                          </div>

                        </div>
                        <div className='flex justify-center relative lg:left-44 items-center'>
                          <button onClick={(e) => {
                            e.preventDefault()
                            edit_user()
                            setEdit(false)
                          }} className='bg-[#272c3e] hover:bg-[#2d334b] opacity-70 px-12 py-2 mb-4 rounded-lg'>Save Edit</button>
                        </div>
                      </div>
                      : null
                  }
                </>
              </> :
              <>
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
                        <input onChange={(e) => setEmail(e.target.value)} type='email' className='h-[35px] mb-1 outline-none bg-[#22242F]  pl-3 text-white rounded-md' placeholder='Email' />
                        <input onChange={(e) => setPhone(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="number" placeholder='Phone' />
                        <input onChange={(e) => setExperience(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="number" placeholder='Years of Experience' />
                        <input onChange={(e) => setDateOfBirth(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="date" name="" id="" />
                        <input onChange={(e) => setEducationalQualification(e.target.value)} className='h-[35px] outline-none mb-1 bg-[#22242F]  pl-3 text-white rounded-md' type="text" placeholder='Highest Educational Qualification' />
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
              </>
          }
        </>
        <div className='bg-[#0F121A] lg:mx-[100px] md:mx-[80px] sm:mx-[30px] xs:mx-[20px]  mt-5 min-w-[400px] rounded-md'>
          <label className='text-xs opacity-30 mx-[35px] mb-1'>username</label><br />
          <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
            <p className='mx-3'>{test ? test.username : "Username"}</p>
          </div>
          {
            !decode.is_superuser && !decode.is_advisor && !decode.is_reviewer ?
              <>
                <label className='text-xs opacity-30 mx-[35px] mb-1'>Domain</label><br />
                <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
                  <p className='mx-3'>{test && test.domain ? test.domain : "Domain"}</p>
                </div>
              </> : null
          }
          <>
            <div className='grid grid-cols-2 mt-3'>
              <div>
                <label className='text-xs opacity-30 mx-[35px] mb-1'>Date of Birth</label><br />
                <div className='bg-[#6C7293] min-h-[33px] opacity-50 py-1 mx-[30px] rounded-lg'>
                  <p className='mx-3'>{test && test.date_of_birth !== null ? test.date_of_birth : "dd/mm/yy"}</p>
                </div>
              </div>
              <div>
                <label className='text-xs opacity-30 mx-[35px]  mb-1'>Gender</label><br />
                <div className='bg-[#6C7293] opacity-50 py-1 mx-[35px] rounded-lg'>
                  <p className='mx-3'>{test && test.gender ? test.gender : "Gender"}</p>
                </div>
              </div>
            </div>
          </>
          <label className='text-xs opacity-30 mx-[35px] mb-1'>Email</label><br />
          <div className='bg-[#6C7293] opacity-50 py-1 min-h-[33px] mx-[30px] rounded-lg'>
            <p className='mx-3'>{test && test.email ? test.email : "dummyemail@gmail.com"}</p>
          </div>
          {
            !decode.is_superuser && !decode.is_advisor && !decode.is_reviewer ?
              <>
                <label className='text-xs opacity-30 mx-[35px] mb-1'>Mothers Name</label><br />
                <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
                  <p className='mx-3'>{test && test.mother ? test.mother : "Mothers Name"}</p>
                </div>
              </> :

              <>
                <label className='text-xs opacity-30 mx-[35px] mb-1'>Years of Experience</label><br />
                <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
                  <p className='mx-3'>{test && test.experience ? test.experience : "Experience"}</p>
                </div>
              </>
          }
          {
            !decode.is_superuser && !decode.is_advisor && !decode.is_reviewer ?
              <>
                <label className='text-xs opacity-30 mx-[35px] mb-1'>Fathers Name</label><br />
                <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
                  <p className='mx-3'>{test && test.father ? test.father : "Name of Father here"}</p>
                </div>
              </> :
              <>
                <label className='text-xs opacity-30 mx-[35px] mb-1'>Highest Educational Qualification</label><br />
                <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
                  <p className='mx-3'>{test && test.educational_qualification ? test.educational_qualification : "Educational Qualification"}</p>
                </div>
              </>
          }
          <br />
        </div>
      </div>

      <div className={decode.is_superuser || decode.is_reviewer || decode.is_advisor ? 'hidden' : 'bg-[#0F121A] my-10 lg:mx-[100px] md:mx-[80px] sm:mx-[30px] xs:mx-[20px]  mt-10 min-w-[400px] rounded-md'}>
        <label className='text-xs opacity-30 mx-[35px] mb-1'>Mobile Number</label><br />
        <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
          <p className='mx-3'>{test && test.phone ? test.phone : "Mobile Number"}</p>
        </div>
        <label className='text-xs opacity-30 mx-[35px] mb-1'>Guardian Mobile Number</label><br />
        <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
          <p className='mx-3'>{test && test.guardianphone ? test.guardianphone : "guardian Phone number here"}</p>
        </div>
        <label className='text-xs opacity-30 mx-[35px] mb-1'>Educational Qualification</label><br />
        <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
          <p className='mx-3'>{test && test.educational_qualification ? test.educational_qualification : "Educational qualification"}</p>
        </div>
        <label className='text-xs opacity-30 mx-[35px] mb-1'>Aadhaar Number</label><br />
        <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
          <p className='mx-3'>{test && test.aadhar_number ? test.aadhar_number : "aadhar number here"}</p>
        </div>
        <label className='text-xs opacity-30 mx-[35px] mb-1'>Village</label><br />
        <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
          <p className='mx-3'>{test && test.village ? test.village : "Village name here"}</p>
        </div>
        <label className='text-xs opacity-30 mx-[35px] mb-1'>Taluk</label><br />
        <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
          <p className='mx-3'>{test && test.taluk ? test.taluk : "Taluk here"}</p>
        </div>
        <label className='text-xs opacity-30 mx-[35px] mb-1'>Address of Communication</label><br />
        <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
          <p className='mx-3'>{test && test.address ? test.address : "ABC House/ xyz p.o/ Thenjippalam/Malappuram/kerala/India"}</p>
        </div>
        <label className='text-xs opacity-30 mx-[35px] mb-1'>Permenant Address as per ID Card</label><br />
        <div className='bg-[#6C7293] opacity-50 py-1 mx-[30px] rounded-lg'>
          <p className='mx-3'>{test && test.address ? test.address : "ABC House/ xyz p.o/ Thenjippalam/Malappuram/kerala/India"}</p>
        </div>
      </div>

    </div>
  )
}

export default Profile
