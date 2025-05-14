import React, { useContext, useEffect } from 'react'
import NavbarForRegister from '../components/NavBarForRegister'
import { toast } from "react-toastify"
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EmailVerify = () => {

  axios.defaults.withCredentials = true;

  const navigate = useNavigate()

  const { backendUrl, getUserData, isLoggedIn, userData } = useContext(AppContext)

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


  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault()
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp })

      if (data.success) {
        toast.success(data.message)
        getUserData()
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate('/')
  }, [isLoggedIn, navigate, userData])

  return (
    <>
      <NavbarForRegister />
      <div className='flex justify-center items-center h-screen'>
        <div className='bg-[#9ddf85] w-full max-w-[450px] flex flex-col gap-5 items-center py-5 rounded-xl'>

          <form
            onSubmit={handleFormSubmit}
            className='flex flex-col gap-1 items-center'>
            <h1 className='text-3xl font-bold text-lime-700 m-5'>Email Verify OTP</h1>
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
              className='w-3/4 bg-gradient-to-r from-lime-700 to bg-lime-900 py-2 text-white/80 font-bold rounded-md hover:rounded-2xl transition-all duration-150 ease-linear cursor-pointer'>Verify Email</button>
          </form>

        </div>
      </div>
    </>
  )
}

export default EmailVerify