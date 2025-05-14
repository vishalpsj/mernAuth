import React, { useContext, useState } from 'react'
import NavbarForRegister from '../components/NavBarForRegister'
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const ResetPassword = () => {

  const { backendUrl } = useContext(AppContext)
  axios.defaults.withCredentials = true

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)


  const inputRefs = React.useRef([])

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }


  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');

    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    })
  }

  const handleSubmitEmail = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email })
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    const otpArray = inputRefs.current.map(e => e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true)
  }

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', {email, otp, newPassword})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='h-screen flex items-center justify-center' >
      <NavbarForRegister />

      {/* Enter email id  */}

      {!isEmailSent &&

        <form
          onSubmit={handleSubmitEmail}
          className='bg-[#9ddf85] w-full max-w-[450px] flex flex-col gap-1 items-center py-5 rounded-xl px-10 m-5 '>
          <h1 className='text-4xl font-bold text-lime-700'>Reset Password</h1>
          <p className='text-md '>Enter your registered email address</p>

          <div className='flex gap-2 items-center text-black/70 bg-[#659853] px-3 py-1 rounded-md mt-5 w-full'>
            <IoMdMail />
            <input
              type="email"
              placeholder='Email'
              required
              value={email}
              className='w-full outline-0 px-1'
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <button className='bg-gradient-to-r from-lime-700 to bg-lime-900 py-2 text-white/80 font-bold rounded-md hover:rounded-2xl transition-all duration-150 ease-linear cursor-pointer mt-5 w-full'>Submit</button>
        </form>
      }

      {/* OTP input form  */}

      {!isOtpSubmitted && isEmailSent &&

        <form
          onSubmit={handleOtpSubmit}
          className='bg-[#9ddf85] w-full max-w-[450px] flex flex-col gap-1 items-center py-5 rounded-xl px-10 m-5 '>
          <h1 className='text-3xl font-bold text-lime-700'>Reset password OTP</h1>
          <h3 className='text-md '> Enter the 6 digit code send to your email id </h3>

          <div className='flex justify-between my-5 gap-1.5'>
            {Array(6).fill(0).map((_, index) => (
              <input
                type="text"
                maxLength='1'
                key={index}
                required
                ref={e => inputRefs.current[index] = e}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className='w-12 h-12 bg-[#659853]  text-black text-center text-xl rounded-md' />
            ))}
          </div>
          <button
            className='w-3/4 bg-gradient-to-r from-lime-700 to bg-lime-900 py-2.5 text-white/80 font-bold rounded-md hover:rounded-2xl transition-all duration-150 ease-linear cursor-pointer'>Verify Email</button>
        </form>

      }

      {/* Enter new password  */}

      {isOtpSubmitted && isEmailSent && (

        <form 
        onSubmit={handleNewPasswordSubmit}
        className='bg-[#9ddf85] w-full max-w-[450px] flex flex-col gap-1 items-center py-5 rounded-xl px-10 m-5'>
          <h1 className='text-4xl font-bold text-lime-700'>New Password</h1>
          <p className='text-md '>Enter the new password below</p>

          <div className='flex gap-2 items-center text-black/70 bg-[#659853] px-3 py-1 rounded-md mt-5 w-full'>
            <RiLockPasswordFill />
            <input
              type="password"
              placeholder='Enter new password'
              required
              value={newPassword}
              className='w-full outline-0 px-1'
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>
          <button className='bg-gradient-to-r from-lime-700 to-lime-900 py-2 text-white/80 font-bold rounded-md hover:rounded-2xl transition-all duration-150 ease-linear cursor-pointer mt-5 w-full'>Submit</button>
        </form>

      )}
    </div >

  )
}

export default ResetPassword